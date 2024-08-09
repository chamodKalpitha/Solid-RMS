import prisma from "../prisma/prismaClient.mjs";
import jwt from "jsonwebtoken";
import { createOwnerSchema } from "../validation/owner.validation.mjs";
import { loginSchema } from "../validation/auth.validation.mjs";
import { tokens } from "../middleware/csrf.middleware.mjs";
import "dotenv/config";
import { checkPassword, hashPassword } from "../utilts/bcrypt.utilts.mjs";

export async function registerOwner(req, res) {
  const { error, value } = createOwnerSchema.validate(req.body);
  const { brNo, companyName, address, contactNo, url, user } = value;
  let errors = [];

  if (error) {
    const errorRespond = error.details.map((err) => err.message);
    return res.status(400).json({ status: "error", message: errorRespond });
  }

  try {
    const existingOwner = await prisma.owner.findFirst({
      where: {
        OR: [{ brNo }, { contactNo }],
      },
    });

    if (existingOwner) {
      if (existingOwner.brNo === brNo)
        errors.push("Business registration number already exists");
      if (existingOwner.contactNo === contactNo)
        errors.push("Contact Number already exists");
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: user.email },
    });

    if (existingUser) errors.push("Email already exists");

    if (errors.length > 0) {
      return res.status(400).json({ status: "error", message: errors });
    }

    const hashedPassword = hashPassword(user.password);

    const newOwner = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: hashedPassword,
        role: user.role,
        owner: {
          create: {
            brNo,
            companyName,
            address,
            url,
            contactNo,
          },
        },
      },
      select: {
        id: true, // Include any other fields you need
        name: true,
        email: true,
        role: true,
        owner: true,
      },
    });

    res.status(201).json({
      status: "success",
      data: newOwner,
    });
  } catch (err) {
    if (process.env.NODE_ENV === "development") console.error(err);
    res
      .status(500)
      .json({ status: "error", message: ["Internal server error"] });
  }
}

export async function login(req, res) {
  const { error, value } = loginSchema.validate(req.body);
  const { email, password } = value;

  if (error) {
    const errorRespond = error.details.map((err) => err.message);
    return res.status(400).json({ status: "error", message: errorRespond });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email: email } });

    if (!user)
      return res.status(401).json({
        status: "error",
        message:
          "The email or password you entered is incorrect. Please try again",
      });

    const isPasswordMatch = checkPassword(password, user.password);

    if (!isPasswordMatch)
      return res.status(401).send({
        status: "error",
        message:
          "The email or password you entered is incorrect. Please try again.",
      });

    const secret = req.csrfSecret;
    const csrfToken = tokens.create(secret);

    const accessToken = jwt.sign(
      { id: user.id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "5d" }
    );
    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "5d" }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "Strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      status: "success",
      data: { accessToken, csrfToken },
    });
  } catch (error) {
    if (process.env.NODE_ENV === "development") console.log(error);
    res
      .status(500)
      .json({ status: "error", message: ["Internal server error"] });
  }
}

export async function generateRefreshToken(req, res) {
  const cookies = req.cookies;
  console.log(cookies);
  if (!cookies?.refreshToken)
    return res.status(401).send({
      status: "error",
      message: ["Invalid Cookie"],
    });
  const refreshToken = cookies.refreshToken;

  try {
    const data = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const accessToken = jwt.sign(
      { username: data.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "5d" }
    );
    res.status(200).json({
      status: "success",
      data: { accessToken },
    });
  } catch (error) {
    return res.status(403).send({
      status: "error",
      message: ["Forbidden"],
    });
  }
}

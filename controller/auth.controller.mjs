import prisma from "../prisma/prismaClient.mjs";
import ownerSchema from "../validation/owner.validation.mjs";

export async function registerOwner(req, res) {
  const { error, value } = ownerSchema.validate(req.body);
  const { brNo, companyName, address, contactNo, user } = value;
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

    const newOwner = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role,
        owner: {
          create: {
            brNo,
            companyName,
            address,
            contactNo,
          },
        },
      },
      include: {
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

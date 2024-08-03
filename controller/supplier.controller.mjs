import prisma from "../prisma/prismaClient.mjs";
import supplierSchema from "../validation/supplier.validation.mjs";
import "dotenv/config";

export async function createSupplier(req, res) {
  const ownerId = req.user.ownerId;
  const { error, value } = supplierSchema.validate(req.body);
  const { name, email, contactNo, address, ingredients } = value;
  let errors = [];

  if (error) {
    const errorRespond = error.details.map((err) => err.message);
    return res.status(400).json({ status: "fail", message: errorRespond });
  }

  try {
    // Check for unique email
    const existingEmail = await prisma.supplier.findUnique({
      where: { email },
    });
    if (existingEmail) errors.push("Email already exists");

    // Check for unique contact number
    const existingContactNo = await prisma.supplier.findUnique({
      where: { contactNo },
    });
    if (existingContactNo) errors.push("Contact number already exists");

    // Validate ingredient IDs

    const validIngredients = await prisma.ingredient.findMany({
      where: {
        id: {
          in: ingredients,
        },
      },
    });

    if (validIngredients.length !== ingredients.length)
      errors.push("One or more ingredient IDs are invalid.");

    if (errors.length > 0) {
      return res.status(400).json({ status: "fail", message: errors });
    }

    // Create new supplier

    const newSupplier = await prisma.supplier.create({
      data: {
        name,
        email,
        contactNo,
        address,
        ownerId,
        supplierIngredients: {
          create: ingredients.map((id) => ({ ingredientId: id })),
        },
      },
    });

    return res.status(201).json({
      status: "success",
      data: newSupplier,
    });
  } catch (err) {
    if (process.env.NODE_ENV === "development") console.error(err);
    res
      .status(500)
      .json({ status: "error", message: ["Internal server error"] });
  }
}

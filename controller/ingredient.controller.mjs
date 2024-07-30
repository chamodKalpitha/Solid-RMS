import prisma from "../prisma/prismaClient.mjs";
import ingredientSchema from "../validation/ingredient.validation.mjs";
import "dotenv/config";

export async function createIngredient(req, res) {
  const ownerId = req.ownerId || 1;
  const { error, value } = ingredientSchema.validate(req.body);
  const { name, unit } = value;

  // Normalize the name: trim, replace multiple spaces with a single space, and convert to lowercase
  const normalizedName = name.trim().replace(/\s+/g, " ").toLowerCase();

  if (error) {
    const errorMessages = error.details.map((err) => err.message);
    return res.status(400).json({ status: "error", message: errorMessages });
  }

  try {
    // Check if the ingredient already exists
    const existingIngredient = await prisma.ingredient.findUnique({
      where: { name: normalizedName },
    });

    if (existingIngredient) {
      return res
        .status(400)
        .json({ status: "error", message: ["Ingredient already exists"] });
    }

    // Create a new ingredient
    const newIngredient = await prisma.ingredient.create({
      data: {
        name: normalizedName,
        unit,
        ownerId,
      },
    });

    return res.status(201).json({
      status: "success",
      data: newIngredient,
    });
  } catch (err) {
    if (process.env.NODE_ENV === "development") console.error(err);
    res
      .status(500)
      .json({ status: "error", message: ["Internal server error"] });
  }
}

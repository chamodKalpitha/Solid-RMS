import prisma from "../prisma/prismaClient.mjs";
import dishSchema from "../validation/dish.validation.mjs";
import "dotenv/config";

export async function createDish(req, res) {
  const ownerId = req.ownerId || 1;
  const { error, value } = dishSchema.validate(req.body);
  const { name, price, estimatedCount, ingredients } = value;
  let errors = [];

  const normalizedName = name.trim().replace(/\s+/g, " ").toLowerCase();

  if (error) {
    const errorRespond = error.details.map((err) => err.message);
    return res.status(400).json({ status: "error", message: errorRespond });
  }

  try {
    // Validate all ingredient IDs
    const ingredientIds = ingredients.map((ingredient) => ingredient.id);
    const validIngredients = await prisma.ingredient.findMany({
      where: {
        id: {
          in: ingredientIds,
        },
      },
    });

    if (validIngredients.length !== ingredientIds.length)
      errors.push("One or more ingredient IDs are invalid.");

    // Check if the dish already exists
    const existingDish = await prisma.dish.findUnique({
      where: { name: normalizedName },
    });

    if (existingDish) errors.push("Dish already exists");

    if (errors.length > 0) {
      return res.status(400).json({ status: "error", message: errors });
    }

    // Create the dish and link ingredients
    const newDish = await prisma.dish.create({
      data: {
        name: normalizedName,
        price,
        estimatedCount,
        ownerId,
        dishIngredients: {
          create: ingredients.map((ingredient) => ({
            ingredient: {
              connect: { id: ingredient.id },
            },
            quantity: ingredient.quantity,
          })),
        },
      },
    });

    return res.status(201).json({
      status: "success",
      data: newDish,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ status: "error", message: ["Internal server error"] });
  }
}

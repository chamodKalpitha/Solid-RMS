import prisma from "../prisma/prismaClient.mjs";
import dishSchema, {
  dishIdSchema,
  dishIngredientsSchema,
  dishUpdateSchema,
} from "../validation/dish.validation.mjs";
import "dotenv/config";

export async function createDish(req, res) {
  const ownerId = req.user.ownerId;
  const { error, value } = dishSchema.validate(req.body);
  const { name, price, url, estimatedCount, ingredients } = value;
  let errors = [];

  if (error) {
    const errorRespond = error.details.map((err) => err.message);
    return res.status(400).json({ status: "error", message: errorRespond });
  }

  const normalizedName = name.trim().replace(/\s+/g, " ").toLowerCase();

  try {
    // Validate all ingredient IDs
    const ingredientIds = ingredients.map((ingredient) => ingredient.id);
    const ingredientSet = new Set(ingredientIds);

    if (ingredientIds.length !== ingredientSet.size)
      errors.push("There are duplicate ingredients");

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
      where: {
        ownerId_name: {
          ownerId: ownerId,
          name: normalizedName,
        },
      },
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
        url,
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
    if (process.env.NODE_ENV === "development") console.error(err);
    res
      .status(500)
      .json({ status: "error", message: ["Internal server error"] });
  }
}

export async function getAllDishes(req, res) {
  const ownerId = req.user.ownerId;

  try {
    const allDishes = await prisma.dish.findMany({
      where: {
        ownerId,
      },
    });
    res.status(200).json({ status: "success", data: allDishes });
  } catch (error) {
    if (process.env.NODE_ENV === "development") console.error(err);
    res
      .status(500)
      .json({ status: "error", message: ["Internal server error"] });
  }
}

//update Dishes
export async function updateDishes(req, res) {
  const { error: idError, value: idValue } = dishIdSchema.validate(req.params);

  const { id } = idValue;
  const ownerId = req.user.ownerId;

  if (idError) {
    const errorMessages = idError.details.map((err) => err.message);
    return res.status(400).json({ status: "error", message: errorMessages });
  }

  const { error: bodyError, value: bodyValue } = dishUpdateSchema.validate(
    req.body
  );

  if (bodyError) {
    const errorRespond = bodyError.details.map((err) => err.message);
    return res.status(400).json({ status: "error", message: errorRespond });
  }

  try {
    const updatedDish = await prisma.dish.update({
      where: {
        ownerId,
        id,
      },
      data: bodyValue,
    });

    return res.status(200).json({ status: "success", data: updatedDish });
  } catch (error) {
    if (error.code === "P2025") {
      return res
        .status(404)
        .json({ status: "error", message: ["Dish not found"] });
    }
    if (process.env.NODE_ENV === "development") console.error(error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
}

//update dishIngredeint

export async function updateDishIngredients(req, res) {
  const { error: idError, value: idValue } = dishIdSchema.validate(req.params);

  const { id } = idValue;
  const ownerId = req.user.ownerId;

  if (idError) {
    const errorMessages = idError.details.map((err) => err.message);
    return res.status(400).json({ status: "error", message: errorMessages });
  }

  const { error: bodyError, value: bodyValue } = dishIngredientsSchema.validate(
    req.body
  );

  const { ingredients } = bodyValue;
  if (bodyError) {
    const errorRespond = bodyError.details.map((err) => err.message);
    return res.status(400).json({ status: "error", message: errorRespond });
  }

  try {
    const updatedDishIngredient = await prisma.dish.update({
      where: {
        ownerId,
        id,
      },
      data: {
        dishIngredients: {
          deleteMany: {},
          create: ingredients.map((ingredient) => ({
            ingredient: { connect: { id: ingredient.id } },
            quantity: ingredient.quantity,
          })),
        },
      },
      include: { dishIngredients: true },
    });
    return res
      .status(200)
      .json({ status: "success", data: updatedDishIngredient });
  } catch (error) {
    if (error.code === "P2025") {
      return res
        .status(404)
        .json({ status: "error", message: ["Ingredient Not Found"] });
    }
    if (process.env.NODE_ENV === "development") console.error(error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
}

//Delete Dishes
export async function deleteDishes(req, res) {
  const { error: idError, value: idValue } = dishIdSchema.validate(req.params);
  const { id } = idValue;
  const ownerId = req.user.ownerId;

  if (idError) {
    const errorMessages = idError.details.map((err) => err.message);
    return res.status(400).json({ status: "error", message: errorMessages });
  }

  try {
    const deletedDish = await prisma.dish.delete({
      where: {
        id,
        ownerId,
      },
    });

    return res.status(200).json({ status: "success", data: deletedDish });
  } catch (error) {
    if (error.code === "P2025") {
      return res
        .status(404)
        .json({ status: "error", message: ["Dish not found"] });
    }
    if (process.env.NODE_ENV === "development") console.error(error);
    return res
      .status(500)
      .json({ status: "error", message: ["Internal server error"] });
  }
}

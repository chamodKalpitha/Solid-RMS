import prisma from "../prisma/prismaClient.mjs";
import {
  createnew,
  idSchema,
  ingredientUpdateSchema,
} from "../validation/ingredient.validation.mjs";
import "dotenv/config";

export async function createIngredient(req, res) {
  const ownerId = req.user.ownerId;
  const { error, value } = createnew.validate(req.body);
  const { name, unit, price, url } = value;

  if (error) {
    const errorMessages = error.details.map((err) => err.message);
    return res.status(400).json({ status: "error", message: errorMessages });
  }

  const normalizedName = name.trim().replace(/\s+/g, " ").toLowerCase();

  try {
    // Check if the ingredient already exists
    const existingIngredient = await prisma.ingredient.findUnique({
      where: {
        ownerId_name: {
          ownerId: ownerId,
          name: normalizedName,
        },
      },
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
        price,
        url,
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

//Get Ingredeints
export async function getIngredients(req, res) {
  const ownerId = req.user.ownerId;

  try {
    // Find all ingredients for the owner
    const ingredients = await prisma.ingredient.findMany({
      where: { ownerId },
      orderBy: { name: "asc" },
    });

    if (ingredients.length === 0) {
      return res.status(404).json({
        status: "error",
        message: ["No ingredients found for this owner"],
      });
    }

    return res.status(200).json({ status: "success", data: ingredients });
  } catch (error) {
    if (process.env.NODE_ENV === "development") console.error(error);
    res
      .status(500)
      .json({ status: "error", message: ["Internal server error"] });
  }
}

//Upadte ingredient
export async function updateIngredient(req, res) {
  // Validate the ingredient ID
  const { error: idError, value: idValue } = idSchema.validate(req.params);

  const { id } = idValue;
  const ownerId = req.user.ownerId;

  if (idError) {
    const errorMessages = idError.details.map((err) => err.message);
    return res.status(400).json({ status: "error", message: errorMessages });
  }

  // Validate the request body
  const { error: bodyError, value: bodyValue } =
    ingredientUpdateSchema.validate(req.body);

  if (bodyError) {
    const errorMessages = bodyError.details.map((err) => err.message);
    return res.status(400).json({ status: "error", message: errorMessages });
  }

  try {
    // Check if the ingredient exists and belongs to the owner
    const existingIngredient = await prisma.ingredient.findUnique({
      where: { id: id },
    });

    if (!existingIngredient || existingIngredient.ownerId !== ownerId) {
      return res.status(404).json({
        status: "error",
        message: [
          "Ingredient not found or you do not have permission to edit this ingredient",
        ],
      });
    }

    // Update the ingredient
    const updatedIngredient = await prisma.ingredient.update({
      where: { id: id },
      data: bodyValue,
    });

    return res.status(200).json({ status: "success", data: updatedIngredient });
  } catch (error) {
    if (process.env.NODE_ENV === "development") console.error(error);
    res
      .status(500)
      .json({ status: "error", message: ["Internal server error"] });
  }
}

//Delete an ingredient
export async function deleteIngredient(req, res) {
  const { error, value } = idSchema.validate(req.params);

  const { id } = value;
  const ownerId = req.user.ownerId;

  if (error) {
    const errorMessages = error.details.map((err) => err.message);
    return res.status(400).json({ status: "error", message: errorMessages });
  }

  try {
    // Check if the ingredient exists
    const existingIngredient = await prisma.ingredient.findUnique({
      where: { id: id },
    });

    if (!existingIngredient) {
      return res
        .status(404)
        .json({ status: "error", message: ["Ingredient not found"] });
    }

    // Check if the ingredient belongs to the owner making the request
    if (existingIngredient.ownerId !== ownerId) {
      return res.status(403).json({
        status: "error",
        message: ["You do not have permission to delete this ingredient"],
      });
    }

    // Delete the ingredient (and related records due to cascade delete)
    const ingriendntDelete = await prisma.ingredient.delete({
      where: { id: Number(id) },
    });

    return res.status(200).json({ status: "success", data: ingriendntDelete });
  } catch (error) {
    if (process.env.NODE_ENV === "development") console.error(error);
    res
      .status(500)
      .json({ status: "error", message: ["Internal server error"] });
  }
}

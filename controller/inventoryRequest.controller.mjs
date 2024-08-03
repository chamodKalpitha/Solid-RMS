import prisma from "../prisma/prismaClient.mjs";
import inventoryRequestSchema from "../validation/inventoryRequest.validation.mjs";
import "dotenv/config";

export async function addInventoryRequest(req, res) {
  const managerId = req.managerId;
  const ownerId = req.ownerId;
  const { error, value } = inventoryRequestSchema.validate(req.body);
  const { ingredients } = value;
  let errors = [];

  if (error) {
    const errorRespond = error.details.map((err) => err.message);
    return res.status(400).json({ status: "error", message: errorRespond });
  }

  if (!managerId) managerId = value.managerId;

  try {
    if (!ownerId) {
      const owner = await prisma.manager.findUnique({
        where: {
          id: managerId,
        },
        include: {
          outlet: true,
        },
      });
      ownerId = owner.outlet.ownerId;
    }

    // Validate the ingredients and ensure they belong to the owner
    const ingredientIds = ingredients.map((item) => item.ingredientId);

    const ingredientSet = new Set(ingredientIds);
    if (ingredientIds.length !== ingredientSet.length)
      errors.push("There are duplicate Inventory Items");

    const validIngredients = await prisma.ingredient.findMany({
      where: {
        id: { in: ingredientIds },
        ownerId: ownerId,
      },
    });

    if (validIngredients.length !== ingredientIds.length)
      errors.push("One or more ingredients are invalid or not authorized");

    if (errors.length > 0) {
      return res.status(400).json({ status: "error", message: errors });
    }

    // Create the inventory request with associated ingredients
    const newInventoryRequest = await prisma.inventoryRequest.create({
      data: {
        status: "PENDING",
        ownerId,
        managerId,
        requestIngredients: {
          create: ingredients.map(({ ingredientId, quantity }) => ({
            ingredientId,
            quantity,
          })),
        },
      },
      include: {
        requestIngredients: true,
      },
    });

    return res.status(201).json({
      status: "success",
      data: newInventoryRequest,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ status: "error", message: ["Internal server error"] });
  }
}

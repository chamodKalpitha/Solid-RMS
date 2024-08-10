import prisma from "../prisma/prismaClient.mjs";
import {
  addItemSchema,
  outletIdSchema,
} from "../validation/inventory.validation.mjs";
import "dotenv/config";

export async function addItemToInventory(req, res) {
  const ownerId = req.user.ownerId;
  const { error, value } = addItemSchema.validate(req.body);
  const { inventoryId, items } = value;
  let errors = [];

  if (error) {
    const errorRespond = error.details.map((err) => err.message);
    return res.status(400).json({ status: "error", message: errorRespond });
  }

  try {
    // Check if the inventory exists
    const existingInventory = await prisma.inventory.findUnique({
      where: { id: inventoryId },
    });

    if (!existingInventory) {
      return res
        .status(400)
        .json({ status: "error", message: ["Invalid Inventory ID"] });
    }

    const outlet = await prisma.outlet.findUnique({
      where: { id: existingInventory.outletId },
    });

    if (outlet.ownerId !== ownerId) errors.push("Invalid Inventory ID");

    // Check if all ingredient IDs are valid
    const ingredientIds = items.map((item) => item.ingredientId);
    const validIngredients = await prisma.ingredient.findMany({
      where: { id: { in: ingredientIds }, ownerId: ownerId },
    });

    if (validIngredients.length !== ingredientIds.length)
      errors.push("One or more invalid Ingredient IDs");

    // Check if ingredients are already in the table
    const ingredientListInInventory = await prisma.inventoryIngredient.findMany(
      {
        where: {
          inventoryId: inventoryId,
          ingredientId: { in: ingredientIds },
        },
        include: {
          ingredient: true,
        },
      }
    );

    if (ingredientListInInventory.length > 0) {
      ingredientListInInventory.forEach((inventory) => {
        errors.push(`${inventory.ingredient.name} is already in the inventory`);
      });
    }

    if (errors.length > 0) {
      return res.status(400).json({ status: "error", message: errors });
    }

    // Add items to the inventory
    const updatedInventory = await prisma.inventory.update({
      where: { id: inventoryId },
      data: {
        inventoryIngredients: {
          create: items.map((item) => ({
            ingredientId: item.ingredientId,
            quantity: item.quantity,
          })),
        },
      },
      include: {
        inventoryIngredients: true,
      },
    });

    return res.status(201).json({
      status: "success",
      data: updatedInventory,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ status: "error", message: ["Internal server error"] });
  }
}

export async function getInventoryById(req, res) {
  const ownerId = req.user.ownerId;

  try {
    const { error, value } = outletIdSchema.validate(req.params);

    if (error) {
      const errorRespond = error.details.map((err) => err.message);
      return res.status(400).json({ status: "error", message: errorRespond });
    }
    const { outletId } = value;

    const outlet = await prisma.outlet.findUnique({
      where: {
        id: outletId,
        ownerId,
      },
      include: {
        inventory: {
          include: {
            inventoryIngredients: true,
          },
        },
      },
    });

    if (!outlet) {
      return res
        .status(400)
        .json({ status: "error", message: ["Invalid Outlet Id"] });
    }
    res.status(200).json({ status: "success", data: outlet });
  } catch (error) {
    if (process.env.NODE_ENV === "development") console.error(error);
    res
      .status(500)
      .json({ status: "error", message: ["Internal server error"] });
  }
}

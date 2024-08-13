import prisma from "../prisma/prismaClient.mjs";
import {
  addItemSchema,
  outletIdSchema,
  updateInventoryBodySchema,
  inventoryIdSchema,
  removeItemSchema,
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

export async function updateInventoryItem(req, res) {
  const ownerId = req.user.ownerId;
  const { error: paramsError, value: paramValue } = outletIdSchema.validate(
    req.params
  );
  const { error: bodyError, value } = updateInventoryBodySchema.validate(
    req.body
  );
  const { outletId } = paramValue;
  const { ingredientId, quantity } = value;
  let errors = [];

  if (paramsError) {
    const errorRespond = paramsError.details.map((err) => err.message);
    return res.status(400).json({ status: "error", message: errorRespond });
  }

  if (bodyError) {
    const errorRespond = bodyError.details.map((err) => err.message);
    return res.status(400).json({ status: "error", message: errorRespond });
  }

  try {
    const existingOutlet = await prisma.outlet.findUnique({
      where: { id: outletId },
    });

    if (!existingOutlet || existingOutlet.ownerId !== ownerId) {
      return res
        .status(400)
        .json({ status: "error", message: ["Invalid Outlet ID"] });
    }

    const inventory = await prisma.inventory.findUnique({
      where: { outletId },
    });

    if (!inventory) {
      return res.status(400).json({
        status: "error",
        message: ["Inventory not found"],
      });
    }

    const inventoryIngredient = await prisma.inventoryIngredient.findUnique({
      where: {
        inventoryId_ingredientId: {
          inventoryId: inventory.id,
          ingredientId: ingredientId,
        },
      },
    });

    if (!inventoryIngredient) {
      return res.status(400).json({
        status: "error",
        message: ["Ingredient not found in inventory"],
      });
    }

    // Update the quantity
    const updatedInventoryIngredient = await prisma.inventoryIngredient.update({
      where: {
        id: inventoryIngredient.id,
      },
      data: {
        quantity: quantity,
      },
    });

    return res.status(200).json({
      status: "success",
      data: updatedInventoryIngredient,
    });
  } catch (error) {
    if (process.env.NODE_ENV === "development") console.error(error);
    res
      .status(500)
      .json({ status: "error", message: ["Internal server error"] });
  }
}

export async function removeItemFromInventory(req, res) {
  const ownerId = req.user.ownerId;
  const { error: paramError, value: paramValue } = inventoryIdSchema.validate(
    req.params
  );
  const { error, value } = removeItemSchema.validate(req.body);
  const { ingredientId } = value;
  const { id } = paramValue;
  let errors = [];

  if (error) {
    const errorRespond = error.details.map((err) => err.message);
    return res.status(400).json({ status: "error", message: errorRespond });
  }

  if (paramError) {
    const errorRespond = paramError.details.map((err) => err.message);
    return res.status(400).json({ status: "error", message: errorRespond });
  }

  try {
    const existingInventory = await prisma.inventory.findUnique({
      where: { id },
      include: {
        outlet: true,
      },
    });

    if (!existingInventory) {
      return res
        .status(400)
        .json({ status: "error", message: ["Invalid Inventory ID"] });
    }

    if (existingInventory.outlet.ownerId !== ownerId)
      errors.push("Invalid Inventory ID");

    // Check if the ingredient ID is valid and belongs to the inventory
    const validIngredient = await prisma.inventoryIngredient.findUnique({
      where: {
        inventoryId_ingredientId: {
          inventoryId: id,
          ingredientId: ingredientId,
        },
      },
    });

    if (!validIngredient) {
      errors.push("Invalid Ingredient ID or not found in the inventory");
    }

    if (errors.length > 0) {
      return res.status(400).json({ status: "error", message: errors });
    }

    const response = await prisma.inventoryIngredient.delete({
      where: {
        inventoryId_ingredientId: {
          inventoryId: id,
          ingredientId: ingredientId,
        },
      },
    });

    return res.status(200).json({
      status: "success",
      data: response,
    });
  } catch (error) {
    if (process.env.NODE_ENV === "development") console.error(error);
    res
      .status(500)
      .json({ status: "error", message: ["Internal server error"] });
  }
}

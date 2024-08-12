import prisma from "../prisma/prismaClient.mjs";
import {
  createInventoryRequestSchema,
  getAllInventoryRequestSchema,
  updateInventoryRequestSchema,
  requestIdSchema,
} from "../validation/inventoryRequest.validation.mjs";
import "dotenv/config";

export async function addInventoryRequest(req, res) {
  let managerId = req.user.managerId;
  const ownerId = req.user.ownerId;
  const { error, value } = createInventoryRequestSchema.validate(req.body);
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
    if (ingredientIds.length !== ingredientSet.size)
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

export async function getAllInventoryRequest(req, res) {
  const ownerId = req.user.ownerId;

  try {
    const { error, value } = getAllInventoryRequestSchema.validate(req.query);

    if (error) {
      const errorRespond = error.details.map((err) => err.message);
      return res.status(400).json({ status: "error", message: errorRespond });
    }
    const { cursor, take } = value;
    const takeNumber = parseInt(take) || 10;
    const cursorObject = cursor ? { id: parseInt(cursor) } : undefined;

    const inventoryRequest = await prisma.inventoryRequest.findMany({
      take: takeNumber,
      skip: cursorObject ? 1 : 0,
      cursor: cursorObject,
      where: {
        ownerId,
      },
      include: {
        requestIngredients: true,
      },
    });

    const nextCursor =
      inventoryRequest.length === takeNumber
        ? inventoryRequest[inventoryRequest.length - 1].id
        : null;

    res
      .status(200)
      .json({ status: "success", data: { inventoryRequest, nextCursor } });
  } catch (error) {
    if (process.env.NODE_ENV === "development") console.error(error);
    res
      .status(500)
      .json({ status: "error", message: ["Internal server error"] });
  }
}

export async function updateInventoryRequestStatus(req, res) {
  const ownerId = req.user.ownerId;
  const { error: paramsError, value: paramValue } = requestIdSchema.validate(
    req.params
  );
  const { error: bodyError, value } = updateInventoryRequestSchema.validate(
    req.body
  );
  const { id } = paramValue;
  const { status } = value;

  if (paramsError) {
    const errorRespond = paramsError.details.map((err) => err.message);
    return res.status(400).json({ status: "error", message: errorRespond });
  }

  if (bodyError) {
    const errorRespond = bodyError.details.map((err) => err.message);
    return res.status(400).json({ status: "error", message: errorRespond });
  }

  try {
    // Check if the inventory request exists
    const existingRequest = await prisma.inventoryRequest.findUnique({
      where: { id, ownerId },
    });

    if (!existingRequest) {
      return res
        .status(404)
        .json({ status: "error", message: ["Inventory request not found"] });
    }

    const updatedRequest = await prisma.inventoryRequest.update({
      where: { id },
      data: { status },
    });

    return res.status(200).json({
      status: "success",
      data: updatedRequest,
    });
  } catch (error) {
    if (process.env.NODE_ENV === "development") console.error(error);
    res
      .status(500)
      .json({ status: "error", message: ["Internal server error"] });
  }
}

export async function deleteInventoryRequest(req, res) {
  const ownerId = req.user.ownerId;
  const managerId = req.user.managerId;
  const { error, value } = requestIdSchema.validate(req.params);
  let errors = [];

  if (error) {
    const errorRespond = bodyError.details.map((err) => err.message);
    return res.status(400).json({ status: "error", message: errorRespond });
  }
  const { id } = value;
  try {
    const inventoryRequest = await prisma.inventoryRequest.findUnique({
      where: { id },
    });

    if (!inventoryRequest) {
      return res.status(404).json({
        status: "error",
        message: ["Inventory request not found"],
      });
    }

    if (
      (ownerId && inventoryRequest.ownerId !== ownerId) ||
      (managerId && inventoryRequest.managerId !== managerId)
    ) {
      return res.status(403).json({
        status: "error",
        message: ["Not authorized to delete this Inventory request"],
      });
    }

    const response = await prisma.inventoryRequest.delete({
      where: { id },
    });

    return res.status(200).json({
      status: "success",
      message: response,
    });
  } catch (error) {
    if (process.env.NODE_ENV === "development") console.error(error);
    res
      .status(500)
      .json({ status: "error", message: ["Internal server error"] });
  }
}

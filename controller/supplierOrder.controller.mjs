import prisma from "../prisma/prismaClient.mjs";
import supplierOrderSchema, { getAllSupplierOrderSchema, suplierOrderIdSchema } from "../validation/supplierOrder.validation.mjs";
import "dotenv/config";

export async function addSupplierOrder(req, res) {
  const ownerId = req.user.ownerId;
  const { error, value } = supplierOrderSchema.validate(req.body);
  const { supplierId, ingredients } = value;
  let errors = [];

  if (error) {
    const errorRespond = error.details.map((err) => err.message);
    return res.status(400).json({ status: "error", message: errorRespond });
  }

  try {
    // Validate the supplier id
    const validSupplier = await prisma.supplier.findUnique({
      where: {
        id: supplierId,
        ownerId,
      },
    });

    if (!validSupplier || validSupplier.ownerId !== ownerId)
      errors.push("Invalid Supplier Id");

    // Check whether ingredients belong to the owner
    const ingredientIds = ingredients.map((item) => item.ingredientId);

    const ingredientSet = new Set(ingredientIds);
    if (ingredientIds.length !== ingredientSet.size)
      errors.push("There are duplicate Inventory Items");

    const validIngredientsOwner = await prisma.ingredient.findMany({
      where: {
        id: { in: ingredientIds },
        ownerId: ownerId,
      },
    });

    if (validIngredientsOwner.length !== ingredientIds.length)
      errors.push("Invalid Ingredients Id");

    // Check whether ingredients belong to the supplier
    const validSupplierIngredients = await prisma.supplierIngredient.findMany({
      where: {
        ingredientId: { in: ingredientIds },
        supplierId,
      },
    });

    if (validSupplierIngredients.length !== ingredientIds.length)
      errors.push("Invalid Ingredients Id");

    if (errors.length > 0) {
      return res.status(400).json({ status: "error", message: errors });
    }

    const totalValue = ingredients.reduce(
      (total, { ingredientId, quantity }) => {
        const ingredient = validIngredientsOwner.find(
          (i) => i.id === ingredientId
        );
        return total + (ingredient ? ingredient.price * quantity : 0);
      },
      0
    );

    const newOrder = await prisma.supplierOrder.create({
      data: {
        totalValue: totalValue,
        supplierId,
        ownerId,
        supplierOrderIngredient: {
          create: ingredients.map((ingredient) => ({
            ingredientId: ingredient.ingredientId,
            quantity: ingredient.quantity,
          })),
        },
      },
      include: {
        supplierOrderIngredient: true,
      },
    });
    res.status(201).json({ status: "success", data: newOrder });
  } catch (err) {
    if (process.env.NODE_ENV === "development") console.error(err);
    res
      .status(500)
      .json({ status: "error", message: ["Internal server error"] });
  }
}

//get all supplierOrder
export async function getAllSupplierOrder(req, res) {
  const ownerId = req.user.ownerId;

  try {
    const { error, value } = getAllSupplierOrderSchema.validate(req.query);

    if (error) {
      const errorRespond = error.details.map((err) => err.message);
      return res.status(400).json({ status: "error", message: errorRespond });
    }

    const { cursor, take } = value;
    const takeNumber = parseInt(take) || 10;
    const cursorObject = cursor ? { id: parseInt(cursor) } : undefined;

    const supplierOrders = await prisma.supplierOrder.findMany({
      take: takeNumber,
      skip: cursorObject ? 1 : 0,
      cursor: cursorObject,
      where: {
        ownerId,
      },
      include: {
        supplierOrderIngredient: true,
      },
    });

    const nextCursor =
      supplierOrders.length === takeNumber
        ? supplierOrders[supplierOrders.length - 1].id
        : null;

    res
      .status(200)
      .json({ status: "success", data: { supplierOrders, nextCursor } });
  } catch (error) {
    if (process.env.NODE_ENV === "development") console.error(error);
    res
      .status(500)
      .json({ status: "error", message: ["Internal server error"] });
  }
}

//get Supplier Order By Id

export async function getSupplierOrderById(req, res) {
  const ownerId = req.user.ownerId; 


  const { error, value } = suplierOrderIdSchema.validate(req.params);
  const { id } = value;

  if (error) {
    const errorMessages = error.details.map((err) => err.message);
    return res.status(400).json({ status: "error", message: errorMessages });
  }

  try {
    const supplierOrder = await prisma.supplierOrder.findUnique({
      where: {
        id,
        ownerId,
      },
      include: {
        supplierOrderIngredient: true, 
      },
    });

    if (!supplierOrder) {
      return res.status(404).json({ status: "error", message: ["Supplier order not found"] });
    }

    return res.status(200).json({ status: "success", data: supplierOrder });
  } catch (error) {}
    if (process.env.NODE_ENV === "development") console.error(error);
    return res.status(500).json({ status: "error", message: ["Internal server error"] });
  }

  //Delete Supplier Order
  export async function deleteSupplierOrder(req, res) {
    const { error: idError, value: idValue } = suplierOrderIdSchema.validate(
      req.params
    );
    const { id } = idValue;
    const ownerId = req.user.ownerId;
  
    if (idError) {
      const errorMessages = idError.details.map((err) => err.message);
      return res.status(400).json({ status: "error", message: errorMessages });
    }
    try {
      const deleteSupplierOrder = await prisma.supplierOrder.delete({
        where: {
          id,
          ownerId,
        },
      });
  
      return res.status(200).json({ status: "success", data: deleteSupplierOrder });
    } catch (error) {
      if (error.code === "P2025") {
        return res
          .status(404)
          .json({ status: "error", message: ["Supplier Order not found"] });
      }
      if (process.env.NODE_ENV === "development") console.error(error);
      return res
        .status(500)
        .json({ status: "error", message: ["Internal server error"] });
    }
  }
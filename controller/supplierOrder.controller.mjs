import prisma from "../prisma/prismaClient.mjs";
import supplierOrderSchema from "../validation/supplierOrder.validation.mjs";
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
    if (ingredientIds.length !== ingredientSet.length)
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

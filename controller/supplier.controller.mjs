import prisma from "../prisma/prismaClient.mjs";
import supplierSchema, {
  getAllSupplierSchema,
  suplierIdSchema,
  updatSupllierSchema,
} from "../validation/supplier.validation.mjs";
import "dotenv/config";

export async function createSupplier(req, res) {
  const ownerId = req.user.ownerId;
  const { error, value } = supplierSchema.validate(req.body);
  const { name, email, contactNo, address, ingredients } = value;
  let errors = [];

  if (error) {
    const errorRespond = error.details.map((err) => err.message);
    return res.status(400).json({ status: "fail", message: errorRespond });
  }

  try {
    // Check for unique email
    const existingEmail = await prisma.supplier.findUnique({
      where: { email },
    });
    if (existingEmail) errors.push("Email already exists");

    // Check for unique contact number
    const existingContactNo = await prisma.supplier.findUnique({
      where: { contactNo },
    });
    if (existingContactNo) errors.push("Contact number already exists");

    // Validate ingredient IDs

    const validIngredients = await prisma.ingredient.findMany({
      where: {
        id: {
          in: ingredients,
        },
      },
    });

    if (validIngredients.length !== ingredients.length)
      errors.push("One or more ingredient IDs are invalid.");

    if (errors.length > 0) {
      return res.status(400).json({ status: "fail", message: errors });
    }

    // Create new supplier

    const newSupplier = await prisma.supplier.create({
      data: {
        name,
        email,
        contactNo,
        address,
        ownerId,
        supplierIngredients: {
          create: ingredients.map((id) => ({ ingredientId: id })),
        },
      },
    });

    return res.status(201).json({
      status: "success",
      data: newSupplier,
    });
  } catch (err) {
    if (process.env.NODE_ENV === "development") console.error(err);
    res
      .status(500)
      .json({ status: "error", message: ["Internal server error"] });
  }
}

//update Suplier
export async function updateSupplier(req, res) {
  const { error: idError, value: idValue } = suplierIdSchema.validate(
    req.params
  );

  const { id } = idValue;
  const ownerId = req.user.ownerId;

  if (idError) {
    const errorMessages = idError.details.map((err) => err.message);
    return res.status(400).json({ status: "error", message: errorMessages });
  }

  const { error: bodyError, value: bodyValue } = updatSupllierSchema.validate(
    req.body
  );

  const { name, email, contactNo, address, ingredients } = bodyValue;

  if (bodyError) {
    const errorRespond = bodyError.details.map((err) => err.message);
    return res.status(400).json({ status: "error", message: errorRespond });
  }

  try {
    const supplier = await prisma.supplier.findUnique({
      where: {
        id,
        ownerId,
      },
    });

    if (!supplier) {
      return res
        .status(404)
        .json({ status: "error", message: ["Supplier not found"] });
    }

    // Validate that all ingredient IDs exist
    if (ingredients) {
      const existingIngredients = await prisma.ingredient.findMany({
        where: {
          id: {
            in: ingredients,
          },
          ownerId: ownerId,
        },
        select: {
          id: true,
        },
      });

      const existingIngredientIds = existingIngredients.map((i) => i.id);
      const invalidIngredientIds = ingredients.filter(
        (id) => !existingIngredientIds.includes(id)
      );

      if (invalidIngredientIds.length > 0) {
        return res.status(400).json({
          status: "error",
          message: [
            `Ingredient ID(s) not found: ${invalidIngredientIds.join(", ")}`,
          ],
        });
      }
    }

    const updatedSupplier = await prisma.supplier.update({
      where: {
        id: id,
        ownerId: ownerId,
      },
      data: {
        name,
        email,
        contactNo,
        address,
        supplierIngredients: ingredients
          ? {
              deleteMany: {},
              create: ingredients.map((ingredient) => ({
                ingredient: { connect: { id: ingredient } },
              })),
            }
          : undefined,
      },
      include: {
        supplierIngredients: true,
      },
    });

    return res.status(200).json({ status: "success", data: updatedSupplier });
  } catch (error) {
    if (error.code === "P2025") {
      if (process.env.NODE_ENV === "development") console.error(error);
      return res
        .status(404)
        .json({ status: "error", message: ["Supplier not found"] });
    }
    if (process.env.NODE_ENV === "development") console.error(error);
    return res
      .status(500)
      .json({ status: "error", message: ["Internal server error"] });
  }
}

//get all supplier
export async function getAllSupplier(req, res) {
  const ownerId = req.user.ownerId;

  try {
    const { error, value } = getAllSupplierSchema.validate(req.query);

    if (error) {
      const errorRespond = error.details.map((err) => err.message);
      return res.status(400).json({ status: "error", message: errorRespond });
    }

    const { cursor, take } = value;
    const takeNumber = parseInt(take) || 10;
    const cursorObject = cursor ? { id: parseInt(cursor) } : undefined;

    const suppliers = await prisma.supplier.findMany({
      take: takeNumber,
      skip: cursorObject ? 1 : 0,
      cursor: cursorObject,
      where: {
        ownerId,
      },
      include: {
        supplierIngredients: true,
      },
    });

    const nextCursor =
      suppliers.length === takeNumber
        ? suppliers[suppliers.length - 1].id
        : null;

    res
      .status(200)
      .json({ status: "success", data: { suppliers, nextCursor } });
  } catch (error) {
    if (process.env.NODE_ENV === "development") console.error(error);
    res
      .status(500)
      .json({ status: "error", message: ["Internal server error"] });
  }
}

//delete supplier
export async function deleteSupplier(req, res) {
  const { error: idError, value: idValue } = suplierIdSchema.validate(
    req.params
  );
  const { id } = idValue;
  const ownerId = req.user.ownerId;

  if (idError) {
    const errorMessages = idError.details.map((err) => err.message);
    return res.status(400).json({ status: "error", message: errorMessages });
  }
  try {
    const deleteSupplier = await prisma.supplier.delete({
      where: {
        id,
        ownerId,
      },
    });

    return res.status(200).json({ status: "success", data: deleteSupplier });
  } catch (error) {
    if (error.code === "P2025") {
      return res
        .status(404)
        .json({ status: "error", message: ["Supplier not found"] });
    }
    if (process.env.NODE_ENV === "development") console.error(error);
    return res
      .status(500)
      .json({ status: "error", message: ["Internal server error"] });
  }
}

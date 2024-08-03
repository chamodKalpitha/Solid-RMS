import prisma from "../prisma/prismaClient.mjs";
import menuSchema from "../validation/menu.validation.mjs";
import "dotenv/config";

export async function createMenu(req, res) {
  const ownerId = req.user.ownerId;
  const { error, value } = menuSchema.validate(req.body);
  const { name, dishIds } = value;
  let errors = [];

  if (error) {
    const errorRespond = error.details.map((err) => err.message);
    return res.status(400).json({ status: "error", message: errorRespond });
  }

  const normalizedName = name.trim().replace(/\s+/g, " ").toLowerCase();

  try {
    const menuSet = new Set(dishIds);
    if (dishIds.length !== menuSet.length)
      errors.push("There are duplicate dishes");

    // Check if all provided dish IDs exist
    const existingDishes = await prisma.dish.findMany({
      where: {
        id: { in: dishIds },
      },
    });

    if (existingDishes.length !== dishIds.length)
      errors.push("Some dish IDs are invalid");

    const existingMenu = await prisma.menu.findUnique({
      where: {
        ownerId: ownerId,
        name: normalizedName,
      },
    });

    if (existingMenu) errors.push("Dish already exists");

    if (errors.length > 0) {
      return res.status(400).json({ status: "error", message: errors });
    }

    const newMenu = await prisma.menu.create({
      data: {
        name: normalizedName,
        ownerId,
        menuDishes: {
          create: dishIds.map((dishId) => ({
            dishId,
          })),
        },
      },
    });

    return res.status(201).json({
      status: "success",
      data: newMenu,
    });
  } catch (err) {
    if (process.env.NODE_ENV === "development") console.error(err);
    res
      .status(500)
      .json({ status: "error", message: ["Internal server error"] });
  }
}

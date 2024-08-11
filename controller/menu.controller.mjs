import prisma from "../prisma/prismaClient.mjs";
import menuSchema, { getAllMenuSchema, menuIdSchema, updateMenuSchema } from "../validation/menu.validation.mjs";
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
    if (dishIds.length !== menuSet.size)
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
        ownerId_name: {
          ownerId: ownerId,
          name: normalizedName,
        },
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

//Update Menu
export async function updateMenus (req,res){
  const {error:idError, value:idValue} = menuIdSchema.validate(req.params);

  const {id} = idValue;
  const ownerId = req.user.ownerId;

  if (idError) {
    const errorMessages = idError.details.map((err) => err.message);
    return res.status(400).json({ status: "error", message: errorMessages });
  }

  const {error:bodyError, value:bodyValue} = updateMenuSchema.validate(req.body);

  const { name,dishIds } = bodyValue;

  if (bodyError) {
    const errorRespond = bodyError.details.map((err) => err.message);
    return res.status(400).json({ status: "error", message: errorRespond });
  }

  try {
    const updatedMenu = await prisma.menu.update({
      where: {
        id, 
        ownerId  
      },
      data: {
        name,
        menuDishes: dishIds
          ? {
              deleteMany: {}, 
              create: dishIds.map((dishId) => ({
                dish: { connect: { id: dishId } }, 
              })),
            }
          : undefined,
      },
      include: {
        menuDishes: true, 
      },
    });

    return res.status(200).json({ status: "success", data: updatedMenu });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ status: "error", message: ["Menu not found"] });
    }
    if (process.env.NODE_ENV === "development") console.error(error);
    return res.status(500).json({ status: "error", message: ["Internal server error"] });
  }
}

//get menu
export async function getAllMenus(req, res) {
  const ownerId = req.user.ownerId;

  try {
    const { error, value } = getAllMenuSchema.validate(req.query);

    if (error) {
      const errorRespond = error.details.map((err) => err.message);
      return res.status(400).json({ status: "error", message: errorRespond });
    }

    const { cursor, take } = value;
    const takeNumber = parseInt(take) || 10;
    const cursorObject = cursor ? { id: parseInt(cursor) } : undefined;

    const menus = await prisma.menu.findMany({
      take: takeNumber,
      skip: cursorObject ? 1 : 0,
      cursor: cursorObject,
      where: {
        ownerId,
      },
      include: {
        menuDishes: true,
      },
    });

    const nextCursor =
      menus.length === takeNumber
        ? menus[menus.length - 1].id
        : null;

    res
      .status(200)
      .json({ status: "success", data: { menus, nextCursor } });
  } catch (error) {
    if (process.env.NODE_ENV === "development") console.error(error);
    res
      .status(500)
      .json({ status: "error", message: ["Internal server error"] });
  }
}

//delete menu
export  async function deleteMenu(req,res){
  const { error: idError, value: idValue } = menuIdSchema.validate(req.params);
  const { id } = idValue;
  const ownerId = req.user.ownerId;

  if (idError) {
    const errorMessages = idError.details.map((err) => err.message);
    return res.status(400).json({ status: "error", message: errorMessages });
  }
  try {
    const deleteMenu = await prisma.menu.delete({
      where: {
        id,
        ownerId,
      }
    });

    return res.status(200).json({ status: "success", data: deleteMenu });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ status: "error", message: ["Menu not found"] });
    }
    if (process.env.NODE_ENV === "development") console.error(error);
    return res.status(500).json({ status: "error", message: ["Internal server error"] });
  }
}
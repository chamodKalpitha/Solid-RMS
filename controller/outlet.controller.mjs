import prisma from "../prisma/prismaClient.mjs";
import {
  createOutletSchema,
  getAllOutletSchema,
  pacthOutletSchema,
  idSchema,
} from "../validation/outlet.validation.mjs";
import "dotenv/config";

export async function createOutlet(req, res) {
  const ownerId = req.user.ownerId;
  const { error, value } = createOutletSchema.validate(req.body);
  const { location } = value;

  if (error) {
    const errorRespond = error.details.map((err) => err.message);
    return res.status(400).json({ status: "error", message: errorRespond });
  }

  try {
    const newOutlet = await prisma.outlet.create({
      data: {
        location,
        ownerId,
        inventory: {
          create: {},
        },
      },
    });

    return res.status(201).json({
      status: "success",
      data: newOutlet,
    });
  } catch (err) {
    if (process.env.NODE_ENV === "development") console.error(err);
    res
      .status(500)
      .json({ status: "error", message: ["Internal server error"] });
  }
}

export async function getAllOutlet(req, res) {
  const ownerId = req.user.ownerId;

  try {
    const { error, value } = getAllOutletSchema.validate(req.query);

    if (error) {
      const errorRespond = error.details.map((err) => err.message);
      return res.status(400).json({ status: "error", message: errorRespond });
    }
    const { cursor, take } = value;
    const takeNumber = parseInt(take) || 10;
    const cursorObject = cursor ? { id: parseInt(cursor) } : undefined;

    const outlets = await prisma.outlet.findMany({
      take: takeNumber,
      skip: cursorObject ? 1 : 0,
      cursor: cursorObject,
      where: {
        ownerId,
      },
    });

    const nextCursor =
      outlets.length === takeNumber ? outlets[outlets.length - 1].id : null;

    res.status(200).json({ status: "success", data: { outlets, nextCursor } });
  } catch (error) {
    if (process.env.NODE_ENV === "development") console.error(error);
    res
      .status(500)
      .json({ status: "error", message: ["Internal server error"] });
  }
}

export async function updateOutlet(req, res) {
  const ownerId = req.user.ownerId;
  const { error: outletIderror, value: outletIdValue } = idSchema.validate(
    req.params
  );
  const { error, value } = pacthOutletSchema.validate(req.body);
  const { id } = outletIdValue;

  if (outletIderror) {
    const errorRespond = outletIderror.details.map((err) => err.message);
    return res.status(400).json({ status: "error", message: errorRespond });
  }

  if (error) {
    const errorRespond = error.details.map((err) => err.message);
    return res.status(400).json({ status: "error", message: errorRespond });
  }

  try {
    const updatedOutlet = await prisma.outlet.update({
      where: {
        id,
        ownerId,
      },
      data: value,
    });

    return res.status(200).json({
      status: "success",
      data: updatedOutlet,
    });
  } catch (error) {
    if (error.code === "P2025") {
      return res
        .status(404)
        .json({ status: "error", message: ["Outlet not found"] });
    }

    if (process.env.NODE_ENV === "development") console.error(error);

    res
      .status(500)
      .json({ status: "error", message: ["Internal server error"] });
  }
}

export async function deleteOutlet(req, res) {
  const ownerId = req.user.ownerId;
  const { error, value } = idSchema.validate(req.params);
  let errors = [];

  if (error) {
    const errorRespond = error.details.map((err) => err.message);
    return res.status(400).json({ status: "error", message: errorRespond });
  }

  const { id } = value;

  try {
    const existingOutlet = await prisma.outlet.findUnique({
      where: { id },
    });

    if (!existingOutlet) {
      return res.status(404).json({
        status: "error",
        message: ["Outlet not found"],
      });
    }

    if (existingOutlet.ownerId !== ownerId) {
      return res.status(403).json({
        status: "error",
        message: ["Not authorized to delete the outlet"],
      });
    }

    const response = await prisma.outlet.delete({
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

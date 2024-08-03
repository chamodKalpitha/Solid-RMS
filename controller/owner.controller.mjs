import prisma from "../prisma/prismaClient.mjs";
import {
  getAllClientSchema,
  idSchema,
} from "../validation/owner.validation.mjs";

export async function getAllOwners(req, res) {
  try {
    const { error, value } = getAllClientSchema.validate(req.query);

    if (error) {
      const errorRespond = error.details.map((err) => err.message);
      return res.status(400).json({ status: "error", message: errorRespond });
    }
    const { cursor, take } = value;
    const takeNumber = parseInt(take) || 10;
    const cursorObject = cursor ? { id: parseInt(cursor) } : undefined;

    const clients = await prisma.owner.findMany({
      take: takeNumber,
      skip: cursorObject ? 1 : 0,
      cursor: cursorObject,
    });

    const nextCursor =
      clients.length === takeNumber ? clients[clients.length - 1].id : null;

    res.status(200).json({ status: "success", data: { clients, nextCursor } });
  } catch (error) {
    if (process.env.NODE_ENV === "development") console.error(err);
    res
      .status(500)
      .json({ status: "error", message: ["Internal server error"] });
  }
}

export const getOwnerById = async (req, res) => {
  const { error, value } = idSchema.validate(req.params);
  if (error) {
    const errorRespond = error.details.map((err) => err.message);
    return res.status(400).json({ status: "error", message: errorRespond });
  }
  const { id } = value;

  try {
    const client = await prisma.owner.findUnique({
      where: { id: id },
    });

    if (!client) {
      return res
        .status(404)
        .json({ status: "error", message: ["Client not found"] });
    }
    res.status(200).json({ status: "success", data: client });
  } catch (error) {
    if (process.env.NODE_ENV === "development") console.error(error);
    res
      .status(500)
      .json({ status: "error", message: ["Internal server error"] });
  }
};

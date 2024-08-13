import prisma from "../prisma/prismaClient.mjs";
import {
  getAllClientSchema,
  idSchema,
  updateOwnerSchema,
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
    if (process.env.NODE_ENV === "development") console.error(error);
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

//Update Owner

export const updateOwner = async (req, res) => {
  const ownerId = req.user.ownerId;
  const userId = req.user.id;

  const { error: updateError, value: updateValue } = updateOwnerSchema.validate(
    req.body
  );

  if (updateError) {
    const errorRespond = updateError.details.map((err) => err.message);
    return res.status(400).json({ status: "error", message: errorRespond });
  }

  const { user, ...ownerData } = updateValue;
  const duplicateErrors = [];

  try {
    if (user) {
      if (user.email) {
        const existingUserEmail = await prisma.user.findFirst({
          where: {
            email: user.email,
            id: { not: userId },
          },
        });
        if (existingUserEmail) duplicateErrors.push("Email is already in use.");
      }
    }

    if (ownerData.brNo) {
      const existingOwnerBrNo = await prisma.owner.findFirst({
        where: {
          brNo: ownerData.brNo,
          id: { not: ownerId },
        },
      });
      if (existingOwnerBrNo)
        duplicateErrors.push("BR Number is already in use.");
    }

    if (ownerData.contactNo) {
      const existingOwnerContactNo = await prisma.owner.findFirst({
        where: {
          contactNo: ownerData.contactNo,
          id: { not: ownerId },
        },
      });
      if (existingOwnerContactNo)
        duplicateErrors.push("Contact Number is already in use.");
    }

    if (duplicateErrors.length > 0) {
      return res
        .status(400)
        .json({ status: "error", message: duplicateErrors });
    }

    const { updatedUser, updatedOwner } = await prisma.$transaction(
      async (prisma) => {
        let updatedUser;
        if (user) {
          updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
              name: user.name,
              email: user.email,
            },
            select: {
              id: true,
              name: true,
              email: true,
              createdAt: true,
              updatedAt: true,
            },
          });
        }

        let updatedOwner;
        if (Object.keys(ownerData).length > 0) {
          updatedOwner = await prisma.owner.update({
            where: { id: ownerId },
            data: ownerData,
          });
        }

        return { updatedUser, updatedOwner };
      }
    );

    const responseData = {
      ...(updatedUser && { updatedUser }),
      ...(updatedOwner && { updatedOwner }),
    };

    res.status(200).json({ status: "success", data: responseData });
  } catch (error) {
    if (process.env.NODE_ENV === "development") console.error(error);
    res
      .status(500)
      .json({ status: "error", message: ["Internal server error"] });
  }
};

export async function deleteOwner(req, res) {
  const userId = req.user.id;
  let errors = [];
  try {
    const response = await prisma.user.delete({
      where: { id: userId },
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

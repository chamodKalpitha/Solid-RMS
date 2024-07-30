import prisma from "../prisma/prismaClient.mjs";
import outletSchema from "../validation/outlet.validation.mjs";
import "dotenv/config";

export async function createOutlet(req, res) {
  const ownerId = req.ownerId || 1;
  const { error, value } = outletSchema.validate(req.body);
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

import prisma from "../prisma/prismaClient.mjs";
import { hashPassword } from "../utilts/bcrypt.utilts.mjs";
import {
  createManagerSchema,
  getAllManagerSchema,
} from "../validation/manager.validation.mjs";
import "dotenv/config";

export async function createManager(req, res) {
  const ownerId = req.user.ownerId;
  const { error, value } = createManagerSchema.validate(req.body);
  const { status, outletId, employeeId, user } = value;
  let errors = [];

  if (error) {
    const errorRespond = error.details.map((err) => err.message);
    return res.status(400).json({ status: "error", message: errorRespond });
  }

  try {
    //Validating outlet id
    const existingOutlet = await prisma.outlet.findUnique({
      where: { id: outletId },
    });

    if (!existingOutlet) errors.push("Invalid Outlet Id");

    if (existingOutlet && existingOutlet.ownerId !== ownerId)
      errors.push("Invalid Outlet Id");

    //Validating employee id
    const existingEmployee = await prisma.employee.findUnique({
      where: { id: employeeId },
    });

    if (!existingEmployee) errors.push("Invalid Employee Id");

    if (existingEmployee && existingEmployee.id !== employeeId)
      errors.push("Invalid Employee Id");

    // Check for unique email
    const existingUser = await prisma.user.findUnique({
      where: { email: user.email },
    });

    if (existingUser) errors.push("Email already exists");

    // Check for unique outletId
    const existingManager = await prisma.manager.findUnique({
      where: { outletId: outletId },
    });

    if (existingManager) errors.push("Outlet already has a manager");

    if (errors.length > 0) {
      return res.status(400).json({ status: "error", message: errors });
    }

    const hashedPassword = hashPassword(user.password);

    const newManager = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: hashedPassword,
        role: user.role,
        manager: {
          create: {
            status,
            outletId,
            employeeId,
          },
        },
      },
      include: {
        manager: true,
      },
    });

    // Destructure to remove the password field
    const { password, ...managerWithoutPassword } = newManager;

    return res.status(201).json({
      status: "success",
      data: managerWithoutPassword,
    });
  } catch (err) {
    if (process.env.NODE_ENV === "development") console.error(err);
    res
      .status(500)
      .json({ status: "error", message: ["Internal server error"] });
  }
}

export async function getAllManagers(req, res) {
  const ownerId = req.user.ownerId;

  try {
    const { error, value } = getAllManagerSchema.validate(req.query);

    if (error) {
      const errorRespond = error.details.map((err) => err.message);
      return res.status(400).json({ status: "error", message: errorRespond });
    }
    const { cursor, take } = value;
    const takeNumber = parseInt(take) || 10;
    const cursorObject = cursor ? { id: parseInt(cursor) } : undefined;

    const managers = await prisma.employee.findMany({
      take: takeNumber,
      skip: cursorObject ? 1 : 0,
      cursor: cursorObject,
      where: {
        AND: {
          ownerId,
          designation: "Manager",
        },
      },
    });

    const nextCursor =
      managers.length === takeNumber ? managers[managers.length - 1].id : null;

    res.status(200).json({ status: "success", data: { managers, nextCursor } });
  } catch (error) {
    if (process.env.NODE_ENV === "development") console.error(error);
    res
      .status(500)
      .json({ status: "error", message: ["Internal server error"] });
  }
}

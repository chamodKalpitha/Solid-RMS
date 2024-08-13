import prisma from "../prisma/prismaClient.mjs";
import { hashPassword } from "../utilts/bcrypt.utilts.mjs";
import {
  createManagerSchema,
  getAllManagerSchema,
  updateManagerSchema,
  managerIdSchema,
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
          designation: "MANAGER",
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

// export async function updateOutlet(req, res) {
//   const ownerId = req.user.ownerId;
//   const { error: outletIderror, value: outletIdValue } = idSchema.validate(
//     req.params
//   );
//   const { error, value } = pacthOutletSchema.validate(req.body);
//   const { outletId } = outletIdValue;

//   if (outletIderror) {
//     const errorRespond = error.details.map((err) => err.message);
//     return res.status(400).json({ status: "error", message: errorRespond });
//   }

//   if (error) {
//     const errorRespond = error.details.map((err) => err.message);
//     return res.status(400).json({ status: "error", message: errorRespond });
//   }

//   try {
//     const updatedOutlet = await prisma.outlet.update({
//       where: {
//         id: outletId,
//         ownerId,
//       },
//       data: value,
//     });

//     return res.status(200).json({
//       status: "success",
//       data: updatedOutlet,
//     });
//   } catch (error) {
//     if (error.code === "P2025") {
//       return res
//         .status(404)
//         .json({ status: "error", message: ["Outlet not found"] });
//     }

//     if (process.env.NODE_ENV === "development") console.error(error);

//     res
//       .status(500)
//       .json({ status: "error", message: ["Internal server error"] });
//   }
// }

export async function patchManager(req, res) {
  const { managerId } = req.params;
  const ownerId = req.user.ownerId;
  const { error, value } = updateManagerSchema.validate(req.body);
  const { status, outletId, employeeId, user } = value;
  let errors = [];

  if (error) {
    const errorRespond = error.details.map((err) => err.message);
    return res.status(400).json({ status: "error", message: errorRespond });
  }

  try {
    // Validate manager existence and ownership
    const existingManager = await prisma.manager.findUnique({
      where: { id: Number(managerId) },
      include: { outlet: true }, // Include outlet to check ownerId
    });

    if (!existingManager) errors.push("Manager not found");

    if (existingManager && existingManager.outlet.ownerId !== ownerId)
      errors.push("Manager not found");

    if (errors.length > 0) {
      return res.status(400).json({ status: "error", message: errors });
    }

    // Validate outletId and employeeId if they are being updated
    if (outletId) {
      const existingOutlet = await prisma.outlet.findUnique({
        where: { id: outletId },
      });

      if (!existingOutlet || existingOutlet.ownerId !== ownerId)
        errors.push("Invalid Outlet Id");
    }

    if (employeeId) {
      const existingEmployee = await prisma.employee.findUnique({
        where: { id: employeeId },
      });

      if (!existingEmployee) errors.push("Invalid Employee Id");
    }

    if (user && user.email) {
      // Check for unique email if it's being updated
      const existingUser = await prisma.user.findUnique({
        where: { email: user.email },
      });

      if (existingUser && existingUser.id !== existingManager.userId)
        errors.push("Email already exists");
    }

    if (errors.length > 0) {
      return res.status(400).json({ status: "error", message: errors });
    }

    const updatedData = {
      status,
      outletId,
      employeeId,
    };

    if (user) {
      // Handle updates to user fields
      const userData = {};
      if (user.name) userData.name = user.name;
      if (user.email) userData.email = user.email;
      if (user.password) userData.password = hashPassword(user.password);

      updatedData.user = { update: userData };
    }

    const updatedManager = await prisma.manager.update({
      where: { id: Number(managerId) },
      data: updatedData,
      include: { user: true },
    });

    console.log(updatedManager);

    // Destructure to remove the password field
    const {
      user: { password, ...userWithoutPassword },
      ...managerWithoutPassword
    } = updatedManager;

    return res.status(200).json({
      status: "success",
      data: { ...managerWithoutPassword, user: userWithoutPassword },
    });
  } catch (err) {
    if (process.env.NODE_ENV === "development") console.error(err);
    res
      .status(500)
      .json({ status: "error", message: ["Internal server error"] });
  }
}

export async function deleteManager(req, res) {
  const ownerId = req.user.ownerId;
  const { error, value } = managerIdSchema.validate(req.params);
  let errors = [];

  if (error) {
    const errorRespond = error.details.map((err) => err.message);
    return res.status(400).json({ status: "error", message: errorRespond });
  }

  const { managerId } = value;

  try {
    const existingManager = await prisma.manager.findUnique({
      where: { id: managerId },
      include: {
        outlet: true,
      },
    });

    if (!existingManager) {
      return res.status(404).json({
        status: "error",
        message: ["Manager not found"],
      });
    }

    if (existingManager.outlet.ownerId !== ownerId) {
      return res.status(403).json({
        status: "error",
        message: ["Not authorized to delete the Manager"],
      });
    }

    const response = await prisma.user.delete({
      where: { id: existingManager.userId },
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

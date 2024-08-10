import prisma from "../prisma/prismaClient.mjs";
import {
  createLeaveRequestSchema,
  getAllLeaveRequestSchema,
} from "../validation/leaveRequest.validation.mjs";
import "dotenv/config";

export async function addLeaveRequest(req, res) {
  let managerId = req.user.managerId;
  const ownerId = req.user.ownerId;
  const { error, value } = createLeaveRequestSchema.validate(req.body);
  const { type, from, noOfDate, reason, employeeId } = value;

  if (error) {
    const errorRespond = error.details.map((err) => err.message);
    return res.status(400).json({ status: "error", message: errorRespond });
  }

  if (!managerId) managerId = value.managerId;

  try {
    if (!ownerId) {
      const owner = await prisma.manager.findUnique({
        where: {
          id: managerId,
        },
        include: {
          outlet: true,
        },
      });
      ownerId = owner.outlet.ownerId;
    }

    // Validate the employee ID and ensure the employee belongs to the authenticated owner
    const existingEmployee = await prisma.employee.findUnique({
      where: { id: employeeId },
      include: { outlet: true },
    });

    if (!existingEmployee || existingEmployee.outlet.ownerId !== ownerId) {
      return res.status(400).json({
        status: "error",
        message: ["Invalid Employee ID or not authorized"],
      });
    }

    // Create the leave request
    const newLeaveRequest = await prisma.leaveRequest.create({
      data: {
        type,
        from,
        noOfDate,
        reason,
        status: "PENDING",
        employeeId,
        managerId,
        ownerId,
      },
    });

    return res.status(201).json({
      status: "success",
      data: newLeaveRequest,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ status: "error", message: ["Internal server error"] });
  }
}

export async function getAllLeaveRequest(req, res) {
  const ownerId = req.user.ownerId;

  try {
    const { error, value } = getAllLeaveRequestSchema.validate(req.query);

    if (error) {
      const errorRespond = error.details.map((err) => err.message);
      return res.status(400).json({ status: "error", message: errorRespond });
    }
    const { cursor, take } = value;
    const takeNumber = parseInt(take) || 10;
    const cursorObject = cursor ? { id: parseInt(cursor) } : undefined;

    const leaveRequest = await prisma.leaveRequest.findMany({
      take: takeNumber,
      skip: cursorObject ? 1 : 0,
      cursor: cursorObject,
      where: {
        ownerId,
      },
      include: {
        employee: true,
      },
    });

    const nextCursor =
      leaveRequest.length === takeNumber
        ? leaveRequest[leaveRequest.length - 1].id
        : null;

    res
      .status(200)
      .json({ status: "success", data: { leaveRequest, nextCursor } });
  } catch (error) {
    if (process.env.NODE_ENV === "development") console.error(error);
    res
      .status(500)
      .json({ status: "error", message: ["Internal server error"] });
  }
}

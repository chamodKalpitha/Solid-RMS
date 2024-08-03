import prisma from "../prisma/prismaClient.mjs";
import leaveRequestSchema from "../validation/leaveRequest.validation.mjs";
import "dotenv/config";

export async function addLeaveRequest(req, res) {
  const managerId = req.managerId;
  const ownerId = req.ownerId;
  const { error, value } = leaveRequestSchema.validate(req.body);
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

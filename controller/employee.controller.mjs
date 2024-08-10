import prisma from "../prisma/prismaClient.mjs";
import {
  createEmployeeSchema,
  employeeIdSchema,
  updateEmployeeSchema,
} from "../validation/employee.validation.mjs";
import "dotenv/config";

export async function createEmployee(req, res) {
  const ownerId = req.user.ownerId;
  const { error, value } = createEmployeeSchema.validate(req.body);
  const {
    name,
    nicNo,
    address,
    contactNo,
    emgConNo,
    emgConName,
    designation,
    isCritical,
    salary,
    url,
    outletId,
  } = value;
  let errors = [];

  if (error) {
    const errorRespond = error.details.map((err) => err.message);
    return res.status(400).json({ status: "error", message: errorRespond });
  }

  try {
    // Check for unique NIC number
    const existingUser = await prisma.employee.findUnique({
      where: { nicNo },
    });

    if (existingUser) {
      errors.push("Employee with same NIC already exists");
    }

    const existingOutlet = await prisma.outlet.findUnique({
      where: { id: outletId },
    });

    if (!existingOutlet) errors.push("Invalid Outlet Id");
    if (existingOutlet && existingOutlet.ownerId !== ownerId)
      errors.push("Invalid Outlet Id");

    if (errors.length > 0) {
      return res.status(400).json({ status: "error", message: errors });
    }

    // Create user
    const newEmployee = await prisma.employee.create({
      data: {
        name,
        nicNo,
        address,
        contactNo,
        emgConNo,
        emgConName,
        designation,
        isCritical,
        salary,
        url,
        ownerId,
        outletId,
      },
    });

    return res.status(201).json({
      status: "success",
      data: newEmployee,
    });
  } catch (err) {
    if (process.env.NODE_ENV === "development") console.error(err);
    res
      .status(500)
      .json({ status: "error", message: ["Internal server error"] });
  }
}

export async function updateEmplyee(req, res) {
  const ownerId = req.user.ownerId;
  const { error: idError, value: employeeId } = employeeIdSchema.validate(
    req.params
  );
  const { id } = employeeId;
  const { error: dataError, value: employeeData } =
    updateEmployeeSchema.validate(req.body);
  let errors = [];

  if (idError) {
    const errorRespond = idError.details.map((err) => err.message);
    return res.status(400).json({ status: "error", message: errorRespond });
  }

  if (dataError) {
    const errorRespond = dataError.details.map((err) => err.message);
    return res.status(400).json({ status: "error", message: errorRespond });
  }

  try {
    // Check for valid Employee
    const currentEmployee = await prisma.employee.findUnique({
      where: {
        id,
      },
    });

    if (!currentEmployee) {
      return res
        .status(400)
        .json({ status: "error", message: ["Invalid Employee Id"] });
    }

    const uniqueCheck = await prisma.employee.findFirst({
      where: {
        OR: [{ nicNo: employeeData.nicNo }],
      },
    });

    if (uniqueCheck) {
      if (uniqueCheck.nicNo === employeeData.nicNo) {
        errors.push("Employee with same NIC already exists");
      }
    }

    if (employeeData.outletId) {
      const existingOutlet = await prisma.outlet.findUnique({
        where: { id: employeeData.outletId },
      });
      if (!existingOutlet) errors.push("Invalid Outlet Id");
      if (existingOutlet && existingOutlet.ownerId !== ownerId)
        errors.push("Invalid Outlet Id");
    }

    if (errors.length > 0) {
      return res.status(400).json({ status: "error", message: errors });
    }

    const updatedEmployee = await prisma.employee.update({
      where: {
        id,
      },
      data: employeeData,
    });

    res.status(200).json({ status: "success", data: updatedEmployee });
  } catch (error) {
    if (process.env.NODE_ENV === "development") console.error(error);
    res
      .status(500)
      .json({ status: "error", message: ["Internal server error"] });
  }
}

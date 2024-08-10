import prisma from "../prisma/prismaClient.mjs";
import {
  createEmployeeSchema,
  employeeIdSchema,
  getAllEmployeechema,
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

export async function getAllEmployee(req, res) {
  const ownerId = req.user.ownerId;
  try {
    const { error, value } = getAllEmployeechema.validate(req.query);

    if (error) {
      const errorRespond = error.details.map((err) => err.message);
      return res.status(400).json({ status: "error", message: errorRespond });
    }
    const { cursor, take } = value;
    const takeNumber = parseInt(take) || 10;
    const cursorObject = cursor ? { id: parseInt(cursor) } : undefined;

    const employees = await prisma.employee.findMany({
      take: takeNumber,
      skip: cursorObject ? 1 : 0,
      cursor: cursorObject,
      where: {
        ownerId,
      },
    });

    const nextCursor =
      employees.length === takeNumber
        ? employees[employees.length - 1].id
        : null;

    res
      .status(200)
      .json({ status: "success", data: { employees, nextCursor } });
  } catch (error) {
    if (process.env.NODE_ENV === "development") console.error(error);
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

export async function deleteEmployee(req, res) {
  const ownerId = req.user.ownerId;
  const { error, value } = employeeIdSchema.validate(req.params);
  const { id } = value;

  if (error) {
    const errorRespond = error.details.map((err) => err.message);
    return res.status(400).json({ status: "error", message: errorRespond });
  }

  try {
    const existingEmployee = await prisma.employee.findUnique({
      where: { id },
    });

    if (!existingEmployee) {
      return res
        .status(404)
        .json({ status: "error", message: ["Invalid Employee Id"] });
    }

    if (existingEmployee.ownerId !== ownerId) {
      return res.status(404).json({
        status: "error",
        message: ["Invalid Employee Id"],
      });
    }
    const employeeDelete = await prisma.employee.delete({
      where: { id },
    });
    return res.status(200).json({ status: "success", data: employeeDelete });
  } catch (error) {
    if (process.env.NODE_ENV === "development") console.error(error);
    res
      .status(500)
      .json({ status: "error", message: ["Internal server error"] });
  }
}

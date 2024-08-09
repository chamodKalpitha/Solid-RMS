import prisma from "../prisma/prismaClient.mjs";
import employeeSchema from "../validation/employee.validation.mjs";
import "dotenv/config";

export async function createEmployee(req, res) {
  const ownerId = req.user.ownerId;
  const { error, value } = employeeSchema.validate(req.body);
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


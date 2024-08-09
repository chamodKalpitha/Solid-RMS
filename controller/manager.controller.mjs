import prisma from "../prisma/prismaClient.mjs";
import managerSchema from "../validation/manager.validation.mjs";
import "dotenv/config";

export async function createManager(req, res) {
  const ownerId = req.user.ownerId;
  const { error, value } = managerSchema.validate(req.body);
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

    const newManager = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
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

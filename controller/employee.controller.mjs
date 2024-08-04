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

/**
 * @swagger
 * /api/v1/employees:
 *   post:
 *     tags:
 *       - Employees
 *     summary: Create a new employee
 *     description: Creates a new employee and associates it with the authenticated owner and the specified outlet.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               nicNo:
 *                 type: string
 *                 example: "123456789V"
 *               address:
 *                 type: string
 *                 example: "123 Main St"
 *               contactNo:
 *                 type: string
 *                 example: "0771234567"
 *               emgConNo:
 *                 type: string
 *                 example: "0777654321"
 *               emgConName:
 *                 type: string
 *                 example: "Jane Doe"
 *               designation:
 *                 type: string
 *                 example: "Manager"
 *               isCritical:
 *                 type: boolean
 *                 example: true
 *               salary:
 *                 type: number
 *                 example: 50000
 *               url:
 *                 type: string
 *                 example: "http://example.com/profile-picture.jpg"
 *               outletId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       '201':
 *         description: Successfully created a new employee
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "John Doe"
 *                     nicNo:
 *                       type: string
 *                       example: "123456789V"
 *                     address:
 *                       type: string
 *                       example: "123 Main St"
 *                     contactNo:
 *                       type: string
 *                       example: "0771234567"
 *                     emgConNo:
 *                       type: string
 *                       example: "0777654321"
 *                     emgConName:
 *                       type: string
 *                       example: "Jane Doe"
 *                     designation:
 *                       type: string
 *                       example: "Manager"
 *                     isCritical:
 *                       type: boolean
 *                       example: true
 *                     salary:
 *                       type: number
 *                       example: 50000
 *                     url:
 *                       type: string
 *                       example: "http://example.com/profile-picture.jpg"
 *                     ownerId:
 *                       type: integer
 *                       example: 1
 *                     outletId:
 *                       type: integer
 *                       example: 1
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-08-03T17:03:17.431Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-08-03T17:03:17.431Z"
 *       '400':
 *         description: Bad request, validation errors or employee already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["Employee with same NIC already exists", "Invalid Outlet Id"]
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["Internal server error"]
 */

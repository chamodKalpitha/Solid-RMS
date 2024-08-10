import { Router } from "express";
import {
  createEmployee,
  updateEmplyee,
} from "../controller/employee.controller.mjs";
import checkRole from "../middleware/authorizationChecker.middleware.mjs";

const router = Router();

router.post("/new", checkRole("OWNER"), createEmployee);
router.patch("/edit/:id", checkRole("OWNER"), updateEmplyee);

export default router;

/**
 * @swagger
 * /api/v1/employee/new:
 *   post:
 *     tags:
 *       - Employee
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

/**
 * @swagger
 * /api/v1/employee/edit/{id}:
 *   patch:
 *     tags:
 *       - Employee
 *     summary: Update an employee
 *     description: Updates an employee's details for the authenticated owner.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the employee to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "chamod Weerasinghe"
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
 *       '200':
 *         description: Successfully updated the employee
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
 *                       example: "chamod Weerasinghe"
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
 *                       example: "2024-08-10T07:38:21.857Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-08-10T07:39:31.906Z"
 *       '400':
 *         description: Invalid request parameters or body
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
 *                   example: ["Invalid Employee Id", "Employee with same NIC already exists", "Invalid Outlet Id"]
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

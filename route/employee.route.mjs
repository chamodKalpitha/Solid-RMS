import { Router } from "express";
import {
  createEmployee,
  updateEmplyee,
  getAllEmployee,
  deleteEmployee,
} from "../controller/employee.controller.mjs";
import checkRole from "../middleware/authorizationChecker.middleware.mjs";

const router = Router();

router.post("/new", checkRole(["OWNER"]), createEmployee);
router.get("/all", checkRole(["OWNER", "MANAGER"]), getAllEmployee);
router.patch("/edit/:id", checkRole(["OWNER"]), updateEmplyee);
router.delete("/delete/:id", checkRole(["OWNER"]), deleteEmployee);

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
/**
 * @swagger
 * /api/v1/employee/all:
 *   get:
 *     tags:
 *       - Employee
 *     summary: Retrieve a list of employees
 *     description: Fetch a paginated list of employees with an optional cursor for pagination.
 *     parameters:
 *       - in: query
 *         name: cursor
 *         schema:
 *           type: integer
 *         description: The ID of the last employee in the previous page. Use this for pagination.
 *       - in: query
 *         name: take
 *         schema:
 *           type: integer
 *           example: 10
 *         description: The number of employees to return. Defaults to 10.
 *     responses:
 *       '200':
 *         description: A list of employees
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
 *                     employees:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           name:
 *                             type: string
 *                             example: "chamod Weerasinghe"
 *                           nicNo:
 *                             type: string
 *                             example: "123456789V"
 *                           address:
 *                             type: string
 *                             example: "123 Main St"
 *                           contactNo:
 *                             type: string
 *                             example: "0771234567"
 *                           emgConNo:
 *                             type: string
 *                             example: "0777654321"
 *                           emgConName:
 *                             type: string
 *                             example: "Jane Doe"
 *                           designation:
 *                             type: string
 *                             example: "Manager"
 *                           isCritical:
 *                             type: boolean
 *                             example: true
 *                           salary:
 *                             type: number
 *                             example: 50000
 *                           url:
 *                             type: string
 *                             example: "http://example.com/profile-picture.jpg"
 *                           ownerId:
 *                             type: integer
 *                             example: 1
 *                           outletId:
 *                             type: integer
 *                             example: 1
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-08-10T07:38:21.857Z"
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-08-10T07:39:31.906Z"
 *                     nextCursor:
 *                       type: integer
 *                       example: null
 *                       description: The cursor for the next set of results. Null if there are no more results.
 *       '400':
 *         description: Invalid query parameters
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
 *                     example: ["Invalid query parameter"]
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
 *                     example: ["Internal server error"]
 */

/**
 * @swagger
 * /api/v1/employee/delete/{id}:
 *   delete:
 *     tags:
 *       - Employee
 *     summary: Delete an employee
 *     description: Delete an employee by ID. Only the owner who created the employee can delete it.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the employee to delete
 *     responses:
 *       '200':
 *         description: Successfully deleted the employee
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
 *                       example: 2
 *                     name:
 *                       type: string
 *                       example: "RavinduDoe"
 *                     nicNo:
 *                       type: string
 *                       example: "123456729V"
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
 *                       example: "2024-08-10T08:10:28.902Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-08-10T08:10:28.902Z"
 *       '404':
 *         description: Employee not found
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
 *                     example: ["Invalid Employee Id"]
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
 *                     example: ["Internal server error"]
 */

import { Router } from "express";
import { createManager } from "../controller/manager.controller.mjs";
import checkRole from "../middleware/authorizationChecker.middleware.mjs";

const router = Router();

router.post("/new", checkRole("OWNER"), createManager);

export default router;

/**
 * @swagger
 * /api/v1/manager/new:
 *   post:
 *     tags:
 *       - Manager
 *     summary: Create a new manager
 *     description: Creates a new manager for a specified outlet and employee by the authenticated owner.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: "ACTIVE"
 *               outletId:
 *                 type: integer
 *                 example: 1
 *               employeeId:
 *                 type: integer
 *                 example: 1
 *               user:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: "John Doe"
 *                   email:
 *                     type: string
 *                     example: "johndoe@example.com"
 *                   password:
 *                     type: string
 *                     example: "securepassword"
 *                   role:
 *                     type: string
 *                     example: "MANAGER"
 *             required:
 *               - status
 *               - outletId
 *               - employeeId
 *               - user
 *     responses:
 *       '201':
 *         description: Successfully created a new manager
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
 *                       example: 6
 *                     name:
 *                       type: string
 *                       example: "John Doe"
 *                     role:
 *                       type: string
 *                       example: "MANAGER"
 *                     email:
 *                       type: string
 *                       example: "johndoe@example.com"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-08-09T11:22:57.003Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-08-09T11:22:57.003Z"
 *                     manager:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 3
 *                         status:
 *                           type: string
 *                           example: "ACTIVE"
 *                         userId:
 *                           type: integer
 *                           example: 6
 *                         outletId:
 *                           type: integer
 *                           example: 5
 *                         employeeId:
 *                           type: integer
 *                           example: 4
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                           example: "2024-08-09T11:22:57.003Z"
 *                         updatedAt:
 *                           type: string
 *                           format: date-time
 *                           example: "2024-08-09T11:22:57.003Z"
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
 *                   example: ["Invalid Outlet Id","Invalid Employee Id","Email already exists", "Outlet already has a manager"]
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

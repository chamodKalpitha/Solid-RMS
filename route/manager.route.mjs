import { Router } from "express";
import {
  createManager,
  getAllManagers,
} from "../controller/manager.controller.mjs";
import checkRole from "../middleware/authorizationChecker.middleware.mjs";

const router = Router();

router.post("/new", checkRole("OWNER"), createManager);
router.get("/all", checkRole("OWNER"), getAllManagers);

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

/**
 * @swagger
 * /api/v1/manager/all:
 *   get:
 *     tags:
 *       - Manager
 *     summary: Get all managers
 *     description: Retrieves a list of all managers for the authenticated owner, with pagination support.
 *     parameters:
 *       - in: query
 *         name: cursor
 *         schema:
 *           type: integer
 *           example: 2
 *         required: false
 *         description: Cursor for pagination to fetch the next set of managers.
 *       - in: query
 *         name: take
 *         schema:
 *           type: integer
 *           example: 10
 *         required: false
 *         description: Number of managers to retrieve.
 *     responses:
 *       '200':
 *         description: Successfully retrieved a list of managers
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
 *                     managers:
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
 *                             example: "2024-08-10T15:55:58.099Z"
 *                     nextCursor:
 *                       type: integer
 *                       example: null
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

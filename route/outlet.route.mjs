import { Router } from "express";
import {
  createOutlet,
  getAllOutlet,
  updateOutlet,
} from "../controller/outlet.controller.mjs";
import checkRole from "../middleware/authorizationChecker.middleware.mjs";

const router = Router();

router.post("/new", checkRole(["OWNER"]), createOutlet);
router.get("/all", checkRole(["OWNER"]), getAllOutlet);
router.patch("/edit/:outletId", checkRole(["OWNER"]), updateOutlet);

export default router;

/**
 * @swagger
 * /api/v1/outlet/new:
 *   post:
 *     tags:
 *       - Outlet
 *     summary: Create a new outlet
 *     description: Creates a new outlet for the authenticated owner.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               location:
 *                 type: string
 *                 example: "123 Main St, Springfield, IL"
 *             required:
 *               - location
 *     responses:
 *       '201':
 *         description: Successfully created a new outlet
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
 *                     location:
 *                       type: string
 *                       example: "123 Main St, Springfield, IL"
 *                     ownerId:
 *                       type: integer
 *                       example: 1
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-08-06T17:03:17.431Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-08-06T17:03:17.431Z"
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
 *                   example:
 *                     - "Location is required"
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
 *                   example:
 *                     - "Internal server error"
 */

/**
 * @swagger
 * /api/v1/outlet/all:
 *   get:
 *     summary: Get all outlets
 *     description: Retrieve a list of outlets for the authenticated owner with pagination support.
 *     tags:
 *       - Outlet
 *     parameters:
 *       - in: query
 *         name: cursor
 *         schema:
 *           type: integer
 *         description: The ID of the last outlet from the previous page.
 *       - in: query
 *         name: take
 *         schema:
 *           type: integer
 *         description: The number of outlets to retrieve.
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of outlets.
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
 *                     outlets:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           location:
 *                             type: string
 *                             example: "Panadura"
 *                           ownerId:
 *                             type: integer
 *                             example: 1
 *                           menuId:
 *                             type: integer
 *                             nullable: true
 *                             example: null
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-08-10T07:35:14.636Z"
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-08-10T07:35:14.636Z"
 *                     nextCursor:
 *                       type: integer
 *                       nullable: true
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
 *                   example:
 *                     - "Internal server error"
 */

/**
 * @swagger
 * /api/v1/outlet/edit/{id}:
 *   patch:
 *     tags:
 *       - Outlet
 *     summary: Update an outlet
 *     description: Updates the details of an outlet associated with the authenticated owner.
 *     parameters:
 *       - in: path
 *         name: outletId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the outlet to update.
 *         example: 1
 *       - in: body
 *         name: body
 *         description: The new details for the outlet.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             location:
 *               type: string
 *               example: "kaluthara"
 *             menuId:
 *               type: integer
 *               nullable: true
 *               example: null
 *     responses:
 *       '200':
 *         description: Successfully updated the outlet
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
 *                     location:
 *                       type: string
 *                       example: "kaluthara"
 *                     ownerId:
 *                       type: integer
 *                       example: 1
 *                     menuId:
 *                       type: integer
 *                       nullable: true
 *                       example: null
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-08-10T07:35:14.636Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-08-11T04:55:11.181Z"
 *       '400':
 *         description: Invalid request parameters
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
 *                     example: ["Invalid outlet ID", "Invalid request body"]
 *       '404':
 *         description: Outlet not found
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
 *                     example: ["Outlet not found"]
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

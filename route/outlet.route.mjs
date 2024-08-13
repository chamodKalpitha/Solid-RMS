import { Router } from "express";
import {
  createOutlet,
  getAllOutlet,
  updateOutlet,
  deleteOutlet,
} from "../controller/outlet.controller.mjs";
import checkRole from "../middleware/authorizationChecker.middleware.mjs";

const router = Router();

router.post("/new", checkRole(["OWNER"]), createOutlet);
router.get("/all", checkRole(["OWNER"]), getAllOutlet);
router.patch("/edit/:id", checkRole(["OWNER"]), updateOutlet);
router.delete("/delete/:id", checkRole(["OWNER"]), deleteOutlet);

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
 *                     menuId:
 *                       type: integer
 *                       nullable: true
 *                       example: null
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
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the outlet to update.
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               location:
 *                 type: string
 *                 example: "kaluthara"
 *               menuId:
 *                 type: integer
 *                 nullable: true
 *                 example: 5
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

/**
 * @swagger
 * /api/v1/outlet/delete/{id}:
 *   delete:
 *     tags:
 *       - Outlet
 *     summary: Delete an outlet
 *     description: Deletes an outlet by its ID if the requester is authorized.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the outlet to delete
 *         example: 1
 *     responses:
 *       '200':
 *         description: Successfully deleted the outlet
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     location:
 *                       type: string
 *                       example: "kalutharaa"
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
 *                       example: "2024-08-11T05:17:45.743Z"
 *       '403':
 *         description: Unauthorized to delete the outlet
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
 *                   example: ["Not authorized to delete the outlet"]
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
 *                   example: ["Outlet not found"]
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

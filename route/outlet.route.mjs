import { Router } from "express";
import {
  createOutlet,
  getAllOutlet,
} from "../controller/outlet.controller.mjs";
import checkRole from "../middleware/authorizationChecker.middleware.mjs";

const router = Router();

router.post("/new", checkRole(["OWNER"]), createOutlet);
router.get("/all", checkRole(["OWNER"]), getAllOutlet);

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

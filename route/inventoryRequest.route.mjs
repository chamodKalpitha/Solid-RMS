import { Router } from "express";
import { addInventoryRequest } from "../controller/inventoryRequest.controller.mjs";

const router = Router();

router.post("/add", addInventoryRequest);

export default router;

/**
 * @swagger
 * /api/v1/inventoryRequest/add:
 *   post:
 *     tags:
 *       - Inventory Requests
 *     summary: Create a new inventory request
 *     description: Creates a new inventory request for the authenticated owner or manager.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             oneOf:
 *               - type: object
 *                 required:
 *                   - ingredients
 *                 properties:
 *                   managerId:
 *                     type: integer
 *                     example: 1
 *                   ingredients:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         ingredientId:
 *                           type: integer
 *                           example: 1
 *                         quantity:
 *                           type: number
 *                           example: 10
 *               - type: object
 *                 required:
 *                   - ingredients
 *                 properties:
 *                   ingredients:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         ingredientId:
 *                           type: integer
 *                           example: 1
 *                         quantity:
 *                           type: number
 *                           example: 10
 *             required:
 *               - ingredients
 *     responses:
 *       '201':
 *         description: Successfully created a new inventory request
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
 *                     ownerId:
 *                       type: integer
 *                       example: 1
 *                     managerId:
 *                       type: integer
 *                       example: 1
 *                     status:
 *                       type: string
 *                       example: "PENDING"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-08-09T05:03:14.404Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-08-09T05:03:14.404Z"
 *                     requestIngredients:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           inventoryRequestId:
 *                             type: integer
 *                             example: 1
 *                           ingredientId:
 *                             type: integer
 *                             example: 5
 *                           quantity:
 *                             type: number
 *                             example: 10
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-08-09T05:03:14.404Z"
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-08-09T05:03:14.404Z"
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
 *                   example: ["There are duplicate Inventory Items", "One or more ingredients are invalid or not authorized"]
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

import { Router } from "express";
import {
  addItemToInventory,
  getInventoryById,
} from "../controller/inventory.controller.mjs";
import checkRole from "../middleware/authorizationChecker.middleware.mjs";

const router = Router();

router.post("/add", checkRole(["OWNER"]), addItemToInventory);
router.get("/getById/:outletId", checkRole(["OWNER"]), getInventoryById);

export default router;

/**
 * @swagger
 * /api/v1/inventory/add:
 *   post:
 *     tags:
 *       - Inventory
 *     summary: Add items to an inventory
 *     description: Adds items to the specified inventory for the authenticated owner.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               inventoryId:
 *                 type: integer
 *                 example: 1
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     ingredientId:
 *                       type: integer
 *                       example: 1
 *                     quantity:
 *                       type: number
 *                       example: 10
 *     responses:
 *       '201':
 *         description: Successfully added items to the inventory
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
 *                     outletId:
 *                       type: integer
 *                       example: 1
 *                     createdAt:
 *                       type: date-time
 *                       example: "2024-08-03T17:03:17.431Z"
 *                     updatedAt:
 *                       type: date-time
 *                       example: "2024-08-03T17:03:17.431Z"
 *                     inventoryIngredients:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           ingredientId:
 *                             type: integer
 *                             example: 1
 *                           quantity:
 *                             type: number
 *                             example: 10
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-08-03T17:03:17.431Z"
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-08-03T17:03:17.431Z"
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
 *                   example: ["Invalid Inventory ID", "Invalid Ingredient IDs", "Ingredient already in inventory"]
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
 * /api/v1/inventory/{outletId}:
 *   get:
 *     tags:
 *       - Inventory
 *     summary: Get inventory by Outlet ID
 *     description: Retrieves the inventory and its ingredients for a specific outlet owned by the authenticated owner.
 *     parameters:
 *       - in: path
 *         name: outletId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the outlet
 *         example: 1
 *     responses:
 *       '200':
 *         description: Successfully retrieved the inventory and its ingredients
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
 *                       example: "Panadura"
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
 *                       example: "2024-08-10T07:35:14.636Z"
 *                     inventory:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         outletId:
 *                           type: integer
 *                           example: 1
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                           example: "2024-08-10T07:35:14.636Z"
 *                         updatedAt:
 *                           type: string
 *                           format: date-time
 *                           example: "2024-08-10T07:35:14.636Z"
 *                         inventoryIngredients:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: integer
 *                                 example: 1
 *                               inventoryId:
 *                                 type: integer
 *                                 example: 1
 *                               ingredientId:
 *                                 type: integer
 *                                 example: 1
 *                               quantity:
 *                                 type: integer
 *                                 example: 10
 *                               createdAt:
 *                                 type: string
 *                                 format: date-time
 *                                 example: "2024-08-10T16:50:59.853Z"
 *                               updatedAt:
 *                                 type: string
 *                                 format: date-time
 *                                 example: "2024-08-10T16:50:44.448Z"
 *       '400':
 *         description: Invalid Outlet ID
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
 *                   example: ["Invalid Outlet Id"]
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

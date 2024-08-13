import { Router } from "express";
import {
  addInventoryRequest,
  getAllInventoryRequest,
  updateInventoryRequestStatus,
  deleteInventoryRequest,
} from "../controller/inventoryRequest.controller.mjs";
import checkRole from "../middleware/authorizationChecker.middleware.mjs";

const router = Router();

router.post("/add", checkRole(["OWNER", "MANAGER"]), addInventoryRequest);
router.get("/all", checkRole(["OWNER", "MANAGER"]), getAllInventoryRequest);
router.patch(
  "/updateStatus/:id",
  checkRole(["OWNER"]),
  updateInventoryRequestStatus
);
router.delete(
  "/delete/:id",
  checkRole(["OWNER", "MANAGER"]),
  deleteInventoryRequest
);

export default router;

/**
 * @swagger
 * /api/v1/inventoryRequest/add:
 *   post:
 *     tags:
 *       - Inventory Request
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

/**
 * @swagger
 * /api/v1/inventoryRequest/all:
 *   get:
 *     tags:
 *       - Inventory Request
 *     summary: Get all inventory requests
 *     description: Retrieves a list of inventory requests associated with the authenticated owner, with pagination support.
 *     parameters:
 *       - in: query
 *         name: cursor
 *         schema:
 *           type: integer
 *         required: false
 *         description: The cursor for pagination, representing the last inventory request ID from the previous page.
 *         example: 10
 *       - in: query
 *         name: take
 *         schema:
 *           type: integer
 *         required: false
 *         description: The number of inventory requests to retrieve. Defaults to 10 if not provided.
 *         example: 10
 *     responses:
 *       '200':
 *         description: Successfully retrieved the list of inventory requests
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
 *                     inventoryRequest:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           ownerId:
 *                             type: integer
 *                             example: 1
 *                           managerId:
 *                             type: integer
 *                             example: 1
 *                           status:
 *                             type: string
 *                             example: "PENDING"
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-08-10T17:59:07.262Z"
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-08-10T17:58:52.734Z"
 *                           requestIngredients:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 id:
 *                                   type: integer
 *                                   example: 1
 *                                 inventoryRequestId:
 *                                   type: integer
 *                                   example: 1
 *                                 ingredientId:
 *                                   type: integer
 *                                   example: 1
 *                                 quantity:
 *                                   type: integer
 *                                   example: 1000
 *                                 createdAt:
 *                                   type: string
 *                                   format: date-time
 *                                   example: "2024-08-10T17:59:33.696Z"
 *                                 updatedAt:
 *                                   type: string
 *                                   format: date-time
 *                                   example: "2024-08-10T17:59:25.058Z"
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

/**
 * @swagger
 * /api/v1/inventoryRequest/updateStatus/{id}:
 *   patch:
 *     tags:
 *       - Inventory Request
 *     summary: Update inventory request status
 *     description: Updates the status of an inventory request for a specific owner.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the inventory request
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 description: New status of the inventory request
 *                 example: "APPROVED"
 *     responses:
 *       '200':
 *         description: Successfully updated the inventory request status
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
 *                       example: "APPROVED"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-08-10T17:59:07.262Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-08-11T11:59:06.568Z"
 *       '404':
 *         description: Inventory request not found
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
 *                   example: ["Inventory request not found"]
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
 * /api/v1/inventoryRequest/delete/{id}:
 *   delete:
 *     tags:
 *       - Inventory Request
 *     summary: Delete an inventory request
 *     description: Deletes an inventory request by its ID if the requester is authorized.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the inventory request to delete
 *         example: 1
 *     responses:
 *       '200':
 *         description: Successfully deleted the inventory request
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
 *                     ownerId:
 *                       type: integer
 *                       example: 1
 *                     managerId:
 *                       type: integer
 *                       example: 1
 *                     status:
 *                       type: string
 *                       example: "APPROVED"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-08-10T17:59:07.262Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-08-11T11:59:06.568Z"
 *       '403':
 *         description: Unauthorized to delete the inventory request
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
 *                   example: ["Not authorized to delete this inventory request"]
 *       '404':
 *         description: Inventory request not found
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
 *                   example: ["Inventory request not found"]
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

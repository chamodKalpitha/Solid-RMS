import { Router } from "express";
import { addSupplierOrder, deleteSupplierOrder, getAllSupplierOrder, getSupplierOrderById } from "../controller/supplierOrder.controller.mjs";
import checkRole from "../middleware/authorizationChecker.middleware.mjs";

const router = Router();

router.post("/add", checkRole(["OWNER"]), addSupplierOrder);
router.get("/all",checkRole(["OWNER"]),getAllSupplierOrder);
router.get("/ById/:id",checkRole(["OWNER"]),getSupplierOrderById);
router.delete("/delete/:id",checkRole(["OWNER"]),deleteSupplierOrder);

export default router;

/**
 * @swagger
 * /api/v1/supplierOrder/add:
 *   post:
 *     tags:
 *       - Supplier Orders
 *     summary: Create a new supplier order
 *     description: Adds a new supplier order to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               supplierId:
 *                 type: integer
 *                 example: 1
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     ingredientId:
 *                       type: integer
 *                       example: 1
 *                     quantity:
 *                       type: number
 *                       example: 5
 *     responses:
 *       '201':
 *         description: Successfully created a new supplier order
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
 *                     totalValue:
 *                       type: number
 *                       example: 79.95
 *                     supplierId:
 *                       type: integer
 *                       example: 1
 *                     ownerId:
 *                       type: integer
 *                       example: 1
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-08-09T11:45:26.753Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-08-09T11:45:26.753Z"
 *                     supplierOrderIngredient:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           supplierOrderId:
 *                             type: integer
 *                             example: 1
 *                           ingredientId:
 *                             type: integer
 *                             example: 1
 *                           quantity:
 *                             type: number
 *                             example: 5
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-08-09T11:45:26.753Z"
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-08-09T11:45:26.753Z"
 *       '400':
 *         description: Invalid request data
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
 *                     - "Invalid Supplier Id"
 *                     - "There are duplicate Inventory Items"
 *                     - "Invalid Ingredients Id"
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
 * /api/v1/supplierOrder/all:
 *   get:
 *     tags:
 *       - Supplier Orders
 *     summary: Retrieve all supplier orders
 *     description: Get a paginated list of all supplier orders for the authenticated owner.
 *     parameters:
 *       - in: query
 *         name: cursor
 *         schema:
 *           type: integer
 *         description: ID of the last item from the previous page for pagination. If not provided, retrieves from the start.
 *       - in: query
 *         name: take
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of supplier orders to return. Defaults to 10 if not provided.
 *     responses:
 *       '200':
 *         description: Successfully retrieved supplier orders.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     supplierOrders:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           totalValue:
 *                             type: number
 *                             format: float
 *                             example: 150.00
 *                           supplierId:
 *                             type: integer
 *                             example: 1
 *                           ownerId:
 *                             type: integer
 *                             example: 2
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-08-12T22:34:48.406Z"
 *                           supplierOrderIngredient:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 ingredientId:
 *                                   type: integer
 *                                   example: 1
 *                                 quantity:
 *                                   type: number
 *                                   format: float
 *                                   example: 5
 *                                 createdAt:
 *                                   type: string
 *                                   format: date-time
 *                                   example: "2024-08-12T22:34:48.406Z"
 *                                 updatedAt:
 *                                   type: string
 *                                   format: date-time
 *                                   example: "2024-08-12T22:34:48.406Z"
 *                     nextCursor:
 *                       type: integer
 *                       nullable: true
 *                       example: 15
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["Internal server error"]
 */


/**
 * @swagger
 * /api/v1/supplierOrder/ById/{id}:
 *   get:
 *     tags:
 *       - Supplier Orders
 *     summary: Get a supplier order by ID
 *     description: Retrieve a specific supplier order by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: The ID of the supplier order to retrieve.
 *     responses:
 *       '200':
 *         description: Supplier order retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     totalValue:
 *                       type: number
 *                       example: 150.00
 *                     supplierId:
 *                       type: integer
 *                       example: 1
 *                     ownerId:
 *                       type: integer
 *                       example: 2
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-08-12T22:34:48.406Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-08-12T22:34:48.406Z"
 *                     supplierOrderIngredient:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           ingredientId:
 *                             type: integer
 *                             example: 1
 *                           quantity:
 *                             type: number
 *                             example: 5
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-08-12T22:34:48.406Z"
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-08-12T22:34:48.406Z"
 *       '404':
 *         description: Supplier order not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["Supplier order not found"]
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["Internal server error"]
 */


/**
 * @swagger
 * /api/v1/supplierOrder/delete/{id}:
 *   delete:
 *     tags:
 *       - Supplier Orders
 *     summary: Delete a supplier order by ID
 *     description: Delete a specific supplier order by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: The ID of the supplier order to delete.
 *     responses:
 *       '200':
 *         description: Supplier order deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     totalValue:
 *                       type: number
 *                       example: 150.00
 *                     supplierId:
 *                       type: integer
 *                       example: 1
 *                     ownerId:
 *                       type: integer
 *                       example: 2
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-08-12T22:34:48.406Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-08-12T22:34:48.406Z"
 *       '404':
 *         description: Supplier order not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["Supplier order not found"]
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["Internal server error"]
 */

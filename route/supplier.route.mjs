import { Router } from "express";
import { createSupplier, updateSupplier } from "../controller/supplier.controller.mjs";
import checkRole from "../middleware/authorizationChecker.middleware.mjs";

const router = Router();

router.post("/new", checkRole("OWNER"), createSupplier);
router.patch("/edit/:id",checkRole(["OWNER"]),updateSupplier);

export default router;

/**
 * @swagger
 * /api/v1/supplier/new:
 *   post:
 *     tags:
 *       - Supplier
 *     summary: Create a new supplier
 *     description: Adds a new supplier to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Supplier XYZ"
 *               email:
 *                 type: string
 *                 example: "supplier@xyz.com"
 *               contactNo:
 *                 type: string
 *                 example: "+1234567890"
 *               address:
 *                 type: string
 *                 example: "456 Supplier Rd"
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [1, 2, 3]
 *     responses:
 *       '201':
 *         description: Successfully created the supplier
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
 *                       example: "Supplier XYZ"
 *                     email:
 *                       type: string
 *                       example: "supplier@xyz.com"
 *                     address:
 *                       type: string
 *                       example: "456 Supplier Rd"
 *                     contactNo:
 *                       type: string
 *                       example: "+1234567890"
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
 *         description: Invalid request data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "fail"
 *                 message:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example:
 *                     - "Email already exists"
 *                     - "Contact number already exists"
 *                     - "One or more ingredient IDs are invalid."
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
 * /api/v1/supplier/edit/{id}:
 *   patch:
 *     tags:
 *       - Supplier
 *     summary: Update an existing supplier
 *     description: Updates the details of an existing supplier, including name, email, contact number, address, and associated ingredients.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the supplier to update
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Supplier Ravindu"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "supplier@example.com"
 *               contactNo:
 *                 type: string
 *                 example: "+1234567890"
 *               address:
 *                 type: string
 *                 example: "1st Lane, Boralesgamuwa"
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [1, 2, 3]
 *     responses:
 *       '200':
 *         description: Successfully updated the supplier
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
 *                       example: "Supplier Ravindu"
 *                     email:
 *                       type: string
 *                       example: "supplier@example.com"
 *                     contactNo:
 *                       type: string
 *                       example: "+1234567890"
 *                     address:
 *                       type: string
 *                       example: "1st Lane, Boralesgamuwa"
 *                     ownerId:
 *                       type: integer
 *                       example: 2
 *                     supplierIngredients:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           ingredientId:
 *                             type: integer
 *                             example: 2
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-08-06T17:03:17.431Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-08-06T17:03:17.431Z"
 *       '404':
 *         description: Supplier not found
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
 *                     - "Supplier not found"
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


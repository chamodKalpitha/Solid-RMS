import { Router } from "express";
import {
  createIngredient,
  getIngredients,
  deleteIngredient,
  updateIngredient,
} from "../controller/ingredient.controller.mjs";
import checkRole from "../middleware/authorizationChecker.middleware.mjs";

const router = Router();

router.post("/new", checkRole(["OWNER", "MANAGER"]), createIngredient);
router.delete("/delete/:id", checkRole(["OWNER"]), deleteIngredient);
router.get("/all", checkRole(["OWNER", "MANAGER"]), getIngredients);
router.patch("/edit/:id", checkRole(["OWNER", "MANAGER"]), updateIngredient);

export default router;

/**
 * @swagger
 * /api/v1/ingredient/new:
 *   post:
 *     tags:
 *       - Ingredient
 *     summary: Create a new ingredient
 *     description: Creates a new ingredient and associates it with the authenticated owner.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Tomato"
 *               unit:
 *                 type: string
 *                 example: "kg"
 *               price:
 *                 type: number
 *                 example: 1.5
 *               url:
 *                 type: string
 *                 example: "http://example.com/tomato.jpg"
 *     responses:
 *       '201':
 *         description: Successfully created a new ingredient
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
 *                       example: "Tomato"
 *                     unit:
 *                       type: string
 *                       example: "kg"
 *                     price:
 *                       type: number
 *                       example: 1.5
 *                     url:
 *                       type: string
 *                       example: "http://example.com/tomato.jpg"
 *                     ownerId:
 *                       type: integer
 *                       example: 1
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-08-03T17:03:17.431Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-08-03T17:03:17.431Z"
 *       '400':
 *         description: Bad request, validation errors or ingredient already exists
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
 *                   example: ["Ingredient already exists"]
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
 * /api/v1/ingredient/delete/{id}:
 *   delete:
 *     tags:
 *       - Ingredient
 *     summary: Delete an ingredient
 *     description: Deletes an ingredient by ID if it belongs to the authenticated owner.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the ingredient to be deleted
 *     responses:
 *       '200':
 *         description: Successfully deleted the ingredient
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
 *                       example: "Tomato"
 *                     unit:
 *                       type: string
 *                       example: "kg"
 *                     price:
 *                       type: number
 *                       example: 1.5
 *                     url:
 *                       type: string
 *                       example: "http://example.com/tomato.jpg"
 *                     ownerId:
 *                       type: integer
 *                       example: 1
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-08-03T17:03:17.431Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-08-03T17:03:17.431Z"
 *       '404':
 *         description: Ingredient not found
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
 *                   example: ["Ingredient not found"]
 *       '403':
 *         description: Forbidden, the ingredient does not belong to the owner
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
 *                   example: ["You do not have permission to delete this ingredient"]
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
 * /api/v1/ingredient/all:
 *   get:
 *     tags:
 *       - Ingredient
 *     summary: Retrieve all ingredients for the authenticated owner
 *     description: Returns a list of ingredients belonging to the authenticated owner.
 *     responses:
 *       '200':
 *         description: Successfully retrieved the ingredients
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: Int
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "Tomato"
 *                       ingredientName:
 *                         type: string
 *                         example: "Tomato"
 *                       price:
 *                         type: Float
 *                         example: 12.50
 *                       url:
 *                         type: string
 *                         example: "https://www.salonliyo.com/assets/images/our-team.jpg"
 *                       ownerId:
 *                         type: Int
 *                         example: 1
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-08-03T17:03:17.431Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-08-03T17:03:17.431Z"
 *       '404':
 *         description: No ingredients found for the owner
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
 *                   example: ["No ingredients found for this owner"]
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
 * /api/v1/ingredient/edit/{id}:
 *   patch:
 *     tags:
 *       - Ingredient
 *     summary: Update an ingredient
 *     description: Updates the details of an ingredient belonging to the authenticated owner.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the ingredient to update
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
 *                 example: "Updated Ingredient Name"
 *               unit:
 *                 type: string
 *                 example: "kg"
 *               price:
 *                 type: number
 *                 example: 10.99
 *               url:
 *                 type: string
 *                 example: "http://example.com/ingredient.jpg"
 *     responses:
 *       '200':
 *         description: Successfully updated the ingredient
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
 *                       example: "Updated Ingredient Name"
 *                     unit:
 *                       type: string
 *                       example: "kg"
 *                     price:
 *                       type: number
 *                       example: 10.99
 *                     url:
 *                       type: string
 *                       example: "http://example.com/ingredient.jpg"
 *                     ownerId:
 *                       type: integer
 *                       example: 1
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-08-03T17:03:17.431Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-08-03T17:03:17.431Z"
 *       '404':
 *         description: Ingredient not found or permission denied
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
 *                   example: ["Ingredient not found or you do not have permission to edit this ingredient"]
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

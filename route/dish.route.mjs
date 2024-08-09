import { Router } from "express";
import { createDish, getAllDishes } from "../controller/dish.controller.mjs";
import checkRole from "../middleware/authorizationChecker.middleware.mjs";

const router = Router();

router.post("/new", checkRole("OWNER"), createDish);
router.get("/all", getAllDishes);

export default router;

/**
 * @swagger
 * /api/v1/dish/new:
 *   post:
 *     tags:
 *       - Dish
 *     summary: Create a new dish
 *     description: Creates a new dish and links it to the provided ingredients.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Pasta Primavera"
 *               price:
 *                 type: number
 *                 example: 12.99
 *               url:
 *                 type: string
 *                 example: "http://example.com/pasta-primavera"
 *               estimatedCount:
 *                 type: number
 *                 example: 10
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     quantity:
 *                       type: number
 *                       example: 2
 *     responses:
 *       '201':
 *         description: Successfully created a new dish
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
 *                       example: "Pasta Primavera"
 *                     price:
 *                       type: number
 *                       example: 12.99
 *                     url:
 *                       type: string
 *                       example: "http://example.com/pasta-primavera"
 *                     estimatedCount:
 *                       type: number
 *                       example: 10
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
 *         description: Bad request, validation errors or dish already exists
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
 *                   example: ["There are duplicate ingredients", "One or more ingredient IDs are invalid.", "Dish already exists"]
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
 * /api/v1/dish/all:
 *   get:
 *     tags:
 *       - Dish
 *     summary: Retrieve all dishes
 *     description: Retrieves all dishes associated with the authenticated owner.
 *     responses:
 *       '200':
 *         description: Successfully retrieved all dishes
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
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "Pasta Primavera"
 *                       price:
 *                         type: number
 *                         example: 12.99
 *                       url:
 *                         type: string
 *                         example: "http://example.com/pasta-primavera"
 *                       estimatedCount:
 *                         type: number
 *                         example: 10
 *                       ownerId:
 *                         type: integer
 *                         example: 1
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-08-03T17:03:17.431Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-08-03T17:03:17.431Z"
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

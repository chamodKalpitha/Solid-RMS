import { Router } from "express";
import { createMenu, deleteMenu, getAllMenus, updateMenus } from "../controller/menu.controller.mjs";
import checkRole from "../middleware/authorizationChecker.middleware.mjs";

const router = Router();

router.post("/new", checkRole("OWNER"), createMenu);
router.patch("/edit/:id",checkRole(["OWNER"]),updateMenus);
router.get("/all",checkRole(["OWNER"]),getAllMenus);
router.delete("/delete/:id",checkRole(["OWNER"]),deleteMenu);

export default router;

/**
 * @swagger
 * /api/v1/menu/new:
 *   post:
 *     tags:
 *       - Menu
 *     summary: Create a new menu
 *     description: Creates a new menu for the authenticated owner.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Summer Specials"
 *               dishIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [1, 2, 3]
 *             required:
 *               - name
 *               - dishIds
 *     responses:
 *       '201':
 *         description: Successfully created a new menu
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
 *                       example: "summer specials"
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
 *                   example: ["There are duplicate dishes", "Some dish IDs are invalid" , "Dish already exists"]
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
 * /api/v1/menu/edit/{id}:
 *   patch:
 *     tags:
 *       - Menu
 *     summary: Update an existing menu
 *     description: Updates the details of an existing menu, including its name and associated dishes.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: The ID of the menu to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "menu Ravindu"
 *               dishIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [2, 3, 4]
 *             required:
 *               - name
 *               - dishIds
 *     responses:
 *       '200':
 *         description: Successfully updated the menu
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
 *                       example: 6
 *                     name:
 *                       type: string
 *                       example: "menu Ravindu"
 *                     ownerId:
 *                       type: integer
 *                       example: 2
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-08-11T00:10:14.796Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-08-11T14:19:13.284Z"
 *                     menuDishes:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 13
 *                           menuId:
 *                             type: integer
 *                             example: 6
 *                           dishId:
 *                             type: integer
 *                             example: 2
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-08-11T14:19:13.284Z"
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-08-11T14:19:13.284Z"
 *       '404':
 *         description: Menu not found
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
 *                   example: ["Menu not found"]
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
 * /api/v1/menu/all:
 *   get:
 *     tags:
 *       - Menu
 *     summary: Retrieve all menus
 *     description: Retrieves a list of menus for the authenticated owner with pagination support.
 *     parameters:
 *       - name: cursor
 *         in: query
 *         schema:
 *           type: integer
 *           example: 10
 *         description: The ID of the last menu from the previous page (for pagination).
 *       - name: take
 *         in: query
 *         schema:
 *           type: integer
 *           example: 10
 *         description: The number of menus to retrieve per page.
 *     responses:
 *       '200':
 *         description: Successfully retrieved the list of menus
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
 *                     menus:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 6
 *                           name:
 *                             type: string
 *                             example: "menu Ravindu"
 *                           ownerId:
 *                             type: integer
 *                             example: 2
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-08-11T00:10:14.796Z"
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-08-11T14:19:13.284Z"
 *                           menuDishes:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 id:
 *                                   type: integer
 *                                   example: 13
 *                                 menuId:
 *                                   type: integer
 *                                   example: 6
 *                                 dishId:
 *                                   type: integer
 *                                   example: 2
 *                                 createdAt:
 *                                   type: string
 *                                   format: date-time
 *                                   example: "2024-08-11T14:19:13.284Z"
 *                                 updatedAt:
 *                                   type: string
 *                                   format: date-time
 *                                   example: "2024-08-11T14:19:13.284Z"
 *                     nextCursor:
 *                       type: integer
 *                       example: 7
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
 * /api/v1/menu/delete/{id}:
 *   delete:
 *     tags:
 *       - Menu
 *     summary: Delete a menu
 *     description: Deletes a menu by its ID for the authenticated owner.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the menu to delete
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       '200':
 *         description: Successfully deleted the menu
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
 *                       example: "Menu Ravindu"
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
 *       '404':
 *         description: Menu not found
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
 *                   example: ["Menu not found"]
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

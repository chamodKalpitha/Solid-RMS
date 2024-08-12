import { Router } from "express";
import {
  getOwnerById,
  getAllOwners,
  updateOwner,
  deleteOwner,
} from "../controller/owner.controller.mjs";
import checkRole from "../middleware/authorizationChecker.middleware.mjs";

const router = Router();

router.get("/all", checkRole(["ADMIN"]), getAllOwners);
router.get("/getById/:id", checkRole(["ADMIN", "MANAGER"]), getOwnerById);
router.patch("/edit", checkRole(["ADMIN", "OWNER"]), updateOwner);
router.delete("/delete", checkRole(["ADMIN", "OWNER"]), deleteOwner);

export default router;

/**
 * @swagger
 * /api/v1/owner/all:
 *   get:
 *     tags:
 *       - Owner
 *     summary: Get all owners with pagination
 *     description: Retrieves a list of all owners with optional pagination.
 *     parameters:
 *       - in: query
 *         name: cursor
 *         schema:
 *           type: integer
 *         description: Cursor for pagination, indicating the starting point for the next page.
 *         example: 10
 *       - in: query
 *         name: take
 *         schema:
 *           type: integer
 *         description: Number of owners to retrieve per request.
 *         example: 10
 *     responses:
 *       '200':
 *         description: Successfully retrieved the list of owners
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
 *                     clients:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           brNo:
 *                             type: string
 *                             example: "BR12345"
 *                           companyName:
 *                             type: string
 *                             example: "Company ABC"
 *                           userId:
 *                             type: integer
 *                             example: 1
 *                           address:
 *                             type: string
 *                             example: "123 Main St"
 *                           url:
 *                             type: string
 *                             example: "http://companyabc.com"
 *                           contactNo:
 *                             type: string
 *                             example: "+1234567890"
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-08-06T17:03:17.431Z"
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-08-06T17:03:17.431Z"
 *                     nextCursor:
 *                       type: integer
 *                       example: 10
 *       '400':
 *         description: Invalid request parameters
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
 *                     - "Invalid cursor value"
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
 * /api/v1/owner/getById/{id}:
 *   get:
 *     tags:
 *       - Owner
 *     summary: Get an owner by ID
 *     description: Retrieves a specific owner by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the owner to retrieve.
 *         example: 1
 *     responses:
 *       '200':
 *         description: Successfully retrieved the owner
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
 *                     brNo:
 *                       type: string
 *                       example: "BR12345"
 *                     companyName:
 *                       type: string
 *                       example: "Company ABC"
 *                     userId:
 *                       type: integer
 *                       example: 1
 *                     address:
 *                       type: string
 *                       example: "123 Main St"
 *                     url:
 *                       type: string
 *                       example: "http://companyabc.com"
 *                     contactNo:
 *                       type: string
 *                       example: "+1234567890"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-08-06T17:03:17.431Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-08-06T17:03:17.431Z"
 *       '400':
 *         description: Invalid request parameters
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
 *                     - "Invalid ID"
 *       '404':
 *         description: Owner not found
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
 *                     - "Owner not found"
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
 * /api/v1/owner/edit:
 *   patch:
 *     tags:
 *       - Owner
 *     summary: Update owner and associated user details
 *     description: Updates the details of the authenticated owner and/or associated user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               brNo:
 *                 type: string
 *                 example: "BR123456"
 *               companyName:
 *                 type: string
 *                 example: "Solid Restaurant"
 *               address:
 *                 type: string
 *                 example: "330/A Boralesgamuwa, Dehiwala"
 *               contactNo:
 *                 type: string
 *                 example: "+94702375050"
 *               url:
 *                 type: string
 *                 example: "http://example.com/updated-url.jpg"
 *               user:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: "Ravindu Akalanka"
 *                   email:
 *                     type: string
 *                     example: "ravinduakalankazoysa@gmail.com"
 *     responses:
 *       '200':
 *         description: Successfully updated the owner and/or user
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
 *                     updatedOwner:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         brNo:
 *                           type: string
 *                           example: "BR123456"
 *                         companyName:
 *                           type: string
 *                           example: "Solid Restaurant"
 *                         address:
 *                           type: string
 *                           example: "330/A Boralesgamuwa, Dehiwala"
 *                         contactNo:
 *                           type: string
 *                           example: "+94702375050"
 *                         url:
 *                           type: string
 *                           example: "http://example.com/updated-url.jpg"
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                           example: "2024-08-03T17:03:17.431Z"
 *                         updatedAt:
 *                           type: string
 *                           format: date-time
 *                           example: "2024-08-03T17:03:17.431Z"
 *                     updatedUser:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         name:
 *                           type: string
 *                           example: "Ravindu Akalanka"
 *                         email:
 *                           type: string
 *                           example: "ravinduakalankazoysa@gmail.com"
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                           example: "2024-08-03T17:03:17.431Z"
 *                         updatedAt:
 *                           type: string
 *                           format: date-time
 *                           example: "2024-08-03T17:03:17.431Z"
 *       '400':
 *         description: Bad request due to validation errors
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
 *                   example: ["Email is already in use.", "BR Number is already in use."]
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
 * /api/v1/owner/delete:
 *   delete:
 *     tags:
 *       - Owner
 *     summary: Delete the authenticated owner's account
 *     description: Deletes the authenticated owner's account and all related data.
 *     responses:
 *       '200':
 *         description: Successfully deleted the owner account
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
 *                     brNo:
 *                       type: string
 *                       example: "BR987654"
 *                     companyName:
 *                       type: string
 *                       example: "Golden Spoon"
 *                     userId:
 *                       type: integer
 *                       example: 1
 *                     address:
 *                       type: string
 *                       example: "456 Elm Street, Colombo"
 *                     url:
 *                       type: string
 *                       example: "https://www.img.com/b.png"
 *                     contactNo:
 *                       type: string
 *                       example: "+0123456789"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-08-10T07:23:25.196Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-08-10T07:23:25.196Z"
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

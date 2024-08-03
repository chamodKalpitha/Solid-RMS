import { Router } from "express";
import {
  login,
  registerOwner,
  generateRefreshToken,
} from "../controller/auth.controller.mjs";
import { generateCsrfToken } from "../middleware/csrf.middleware.mjs";

const router = Router();

router.post("/register", registerOwner);
router.post("/login", generateCsrfToken, login);
router.post("/refresh-token", generateRefreshToken);

export default router;

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - role
 *       properties:
 *         name:
 *           type: string
 *           description: The user's name
 *           example: John Doe
 *         email:
 *           type: string
 *           description: The user's email
 *           example: johndoe@example.com
 *         password:
 *           type: string
 *           description: The user's password
 *           example: strongpassword123
 *         role:
 *           type: string
 *           description: The user's role
 *           example: owner
 *     Owner:
 *       type: object
 *       required:
 *         - brNo
 *         - companyName
 *         - address
 *         - contactNo
 *         - user
 *       properties:
 *         brNo:
 *           type: string
 *           description: Business registration number
 *           example: BR123456789
 *         companyName:
 *           type: string
 *           description: The company's name
 *           example: Example Company
 *         address:
 *           type: string
 *           description: The company's address
 *           example: 123 Example Street
 *         contactNo:
 *           type: string
 *           description: The company's contact number
 *           example: +1234567890
 *         user:
 *           $ref: '#/components/schemas/User'
 *     OwnerResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The owner ID
 *           example: 1
 *         brNo:
 *           type: string
 *           description: Business registration number
 *           example: BR123456789
 *         companyName:
 *           type: string
 *           description: The company's name
 *           example: Example Company
 *         address:
 *           type: string
 *           description: The company's address
 *           example: 123 Example Street
 *         contactNo:
 *           type: string
 *           description: The company's contact number
 *           example: +1234567890
 *         user:
 *           $ref: '#/components/schemas/User'
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           description: Status of the response
 *           example: error
 *         message:
 *           type: array
 *           items:
 *             type: string
 *           description: Error messages
 *           example: ["Business registration number already exists"]
 */

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new owner
 *     tags: [Owners]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Owner'
 *     responses:
 *       201:
 *         description: Owner created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OwnerResponse'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: string
 *                     description: Status of the response
 *                     example: error
 *                   message:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: Error messages
 *                     example: ["Business registration number already exists"]

 */

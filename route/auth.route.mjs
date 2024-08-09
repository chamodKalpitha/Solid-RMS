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
router.get("/refresh-token", generateRefreshToken);

export default router;

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     tags:
 *      - User
 *     summary: Register a new owner
 *     description: Creates a new owner and associated user in the system.
 *     requestBody:
 *       description: The data required to register a new owner.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               brNo:
 *                 type: string
 *                 example: 'BR123456'
 *               companyName:
 *                 type: string
 *                 example: 'Bika Resurant'
 *               address:
 *                 type: string
 *                 example: '123 Main Street, Panadura'
 *               contactNo:
 *                 type: string
 *                 example: '+0234567890'
 *               url:
 *                 type: string
 *                 example: 'https://www.img.com/a.png'
 *               user:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: 'Chamod Weerasinghe'
 *                   email:
 *                     type: string
 *                     example: 'chamodlive@live.com'
 *                   password:
 *                     type: string
 *                     example: 'SecureP@ssw0rd'
 *                   role:
 *                     type: string
 *                     example: 'OWNER'
 *             required:
 *               - brNo
 *               - companyName
 *               - contactNo
 *               - url
 *               - user
 *     responses:
 *       '201':
 *         description: Owner successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: 'success'
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: 'Chamod Weerasinghe'
 *                     email:
 *                       type: string
 *                       example: 'chamodlive@live.com'
 *                     role:
 *                       type: string
 *                       example: 'OWNER'
 *                     owner:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         brNo:
 *                           type: string
 *                           example: 'BR123456'
 *                         companyName:
 *                           type: string
 *                           example: 'Bike Resturant'
 *                         userId:
 *                           type: integer
 *                           example: 1
 *                         address:
 *                           type: string
 *                           example: '123 Main Street, Panadura'
 *                         url:
 *                           type: string
 *                           example: 'https://www.img.com/a.png'
 *                         contactNo:
 *                           type: string
 *                           example: '+0234567890'
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                           example: '2024-08-03T17:03:17.431Z'
 *                         updatedAt:
 *                           type: string
 *                           format: date-time
 *                           example: '2024-08-03T17:03:17.431Z'
 *       '400':
 *         description: Validation error or duplicate found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: 'error'
 *                 message:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example:
 *                     - 'Business registration number already exists'
 *                     - 'Contact Number already exists'
 *                     - 'Email already exists'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: 'error'
 *                 message:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example:
 *                     - 'Internal server error'
 */

/**
 * @swagger
 *
 * /api/v1/auth/login:
 *   post:
 *     tags:
 *      - User
 *     summary: Login a user and generate tokens
 *     description: Authenticates a user by their email and password, and returns access and refresh tokens if successful. Also returns a CSRF token for secure operations.
 *     requestBody:
 *       description: The login credentials of the user.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: 'chamodlive@live.com'
 *               password:
 *                 type: string
 *                 format: password
 *                 example: 'SecureP@ssw0rd'
 *             required:
 *               - email
 *               - password
 *     responses:
 *       '200':
 *         description: Successful login and token generation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: 'success'
 *                 data:
 *                   type: object
 *                   properties:
 *                     accessToken:
 *                       type: string
 *                       example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzLCJpYXQiOjE2NjY2NzcwMDAsImV4cCI6MTY2NjY3MDAwMH0.8V_Kdrd-9Cm-Xtq4Wz23-RnKtv_v7I95f9V3Rs3RyKo'
 *                     csrfToken:
 *                       type: string
 *                       example: 'CSRF_TOKEN_EXAMPLE'
 *       '400':
 *         description: Validation error for missing or invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: 'error'
 *                 message:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example:
 *                     - 'Email is required'
 *                     - 'Password is required'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: 'error'
 *                 message:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example:
 *                     - 'Internal server error'
 */

/**
 * @swagger
 * /api/v1/auth/refresh-token:
 *   get:
 *     tags:
 *       - User
 *     summary: Generate a new access token using a refresh token
 *     description: Validates the provided refresh token from cookies and generates a new access token. Also returns a new CSRF token for secure operations.
 *     responses:
 *       '200':
 *         description: Successfully generated a new access token and CSRF token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: 'success'
 *                 data:
 *                   type: object
 *                   properties:
 *                     accessToken:
 *                       type: string
 *                       example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxMjMiLCJpYXQiOjE2NjY3NzEwMDAsImV4cCI6MTY2Njc3MTYwMH0.4e4RkP_GjCTbV7KLt4lE2hd5H8DsZUnXZ7A0dxG_GI4'
 *                     csrfToken:
 *                       type: string
 *                       example: 'CSRF_TOKEN_EXAMPLE'
 *       '401':
 *         description: Unauthorized, invalid or missing refresh token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: 'error'
 *                 message:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example:
 *                     - 'Invalid Cookie'
 *
 *       '403':
 *         description: Forbidden, invalid or expired refresh token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: 'error'
 *                 message:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example:
 *                     - 'Forbidden'
 *
 */

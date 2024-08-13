import { Router } from "express";
import { getSignedUrl } from "../controller/s3.controller.mjs";
import checkRole from "../middleware/authorizationChecker.middleware.mjs";

const router = Router();

router.post("/new", checkRole(["OWNER", "ADMIN"]), getSignedUrl);

export default router;

/**
 * @swagger
 * /api/v1/s3SignedUrl/new:
 *   post:
 *     tags:
 *       - S3 - AWS
 *     summary: Get a signed URL for file upload
 *     description: Generates a signed URL for uploading a file to S3. The URL allows temporary access to the S3 bucket for file uploads.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fileName:
 *                 type: string
 *                 description: The name of the file to be uploaded.
 *                 example: "example.jpg"
 *     responses:
 *       '200':
 *         description: Successfully generated signed URL
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
 *                     type: string
 *                     format: uri
 *                     example: "https://solid-rms.s3.amazonaws.com/5c61524b8016d56ae5606d4c06e28018.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQEIP3KNMY53AVPFO%2F20240813%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240813T193504Z&X-Amz-Expires=60&X-Amz-Signature=181cb36028bcdb0d1ccb8fe7940af199c8f41ed6a3dd124e04ee13b0aed0dd79&X-Amz-SignedHeaders=host"
 *       '400':
 *         description: Bad request, invalid file name
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
 *                   example: ["Invalid file name"]
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

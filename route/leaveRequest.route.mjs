import { Router } from "express";
import { addLeaveRequest } from "../controller/leaveRequest.controller.mjs";

const router = Router();

router.post("/add", addLeaveRequest);

export default router;

/**
 * @swagger
 * /api/v1/leaveRequest/add:
 *   post:
 *     tags:
 *       - Leave Requests
 *     summary: Create a new leave request
 *     description: Creates a new leave request for an employee by the authenticated manager or owner.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             oneOf:
 *               - type: object
 *                 required:
 *                   - type
 *                   - from
 *                   - noOfDate
 *                   - reason
 *                   - employeeId
 *                 properties:
 *                   type:
 *                     type: string
 *                     example: "SICK"
 *                   from:
 *                     type: string
 *                     format: date
 *                     example: "2024-08-10"
 *                   noOfDate:
 *                     type: integer
 *                     example: 5
 *                   reason:
 *                     type: string
 *                     example: "Medical reasons"
 *                   employeeId:
 *                     type: integer
 *                     example: 1
 *                   managerId:
 *                     type: integer
 *                     example: 1
 *               - type: object
 *                 required:
 *                   - type
 *                   - from
 *                   - noOfDate
 *                   - reason
 *                   - employeeId
 *                   - managerId
 *                 properties:
 *                   type:
 *                     type: string
 *                     example: "SICK"
 *                   from:
 *                     type: string
 *                     format: date
 *                     example: "2024-08-10"
 *                   noOfDate:
 *                     type: integer
 *                     example: 5
 *                   reason:
 *                     type: string
 *                     example: "Medical reasons"
 *                   employeeId:
 *                     type: integer
 *                     example: 1
 *                   managerId:
 *                     type: integer
 *                     example: 1
 *     responses:
 *       '201':
 *         description: Successfully created a new leave request
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
 *                     type:
 *                       type: string
 *                       example: "SICK"
 *                     from:
 *                       type: string
 *                       format: date
 *                       example: "2024-08-10"
 *                     noOfDate:
 *                       type: integer
 *                       example: 5
 *                     reason:
 *                       type: string
 *                       example: "Medical reasons"
 *                     status:
 *                       type: string
 *                       example: "PENDING"
 *                     employeeId:
 *                       type: integer
 *                       example: 1
 *                     managerId:
 *                       type: integer
 *                       example: 1
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
 *                   example: ["Invalid Employee ID or not authorized"]
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

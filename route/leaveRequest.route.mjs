import { Router } from "express";
import {
  addLeaveRequest,
  getAllLeaveRequest,
  updateLeaveRequest,
  deleteLeaveRequest,
} from "../controller/leaveRequest.controller.mjs";
import checkRole from "../middleware/authorizationChecker.middleware.mjs";

const router = Router();

router.post("/add", checkRole(["OWNER"]), addLeaveRequest);
router.get("/all", checkRole(["OWNER"]), getAllLeaveRequest);
router.patch("/edit/:id", checkRole(["OWNER", "MANAGER"]), updateLeaveRequest);
router.delete(
  "/delete/:id",
  checkRole(["OWNER", "MANAGER"]),
  deleteLeaveRequest
);

export default router;

/**
 * @swagger
 * /api/v1/leaveRequest/add:
 *   post:
 *     tags:
 *       - Leave Request
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

/**
 * @swagger
 * /api/v1/leaveRequest/all:
 *   get:
 *     tags:
 *       - Leave Request
 *     summary: Get all leave requests
 *     description: Retrieves a list of leave requests associated with the authenticated owner, with pagination support.
 *     parameters:
 *       - in: query
 *         name: cursor
 *         schema:
 *           type: integer
 *         required: false
 *         description: The cursor for pagination, representing the last leave request ID from the previous page.
 *         example: 10
 *       - in: query
 *         name: take
 *         schema:
 *           type: integer
 *         required: false
 *         description: The number of leave requests to retrieve. Defaults to 10 if not provided.
 *         example: 10
 *     responses:
 *       '200':
 *         description: Successfully retrieved the list of leave requests
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
 *                     leaveRequest:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           type:
 *                             type: string
 *                             example: "SICK"
 *                           from:
 *                             type: string
 *                             format: date-time
 *                             example: "1970-01-01T00:00:00.000Z"
 *                           noOfDate:
 *                             type: integer
 *                             example: 5
 *                           reason:
 *                             type: string
 *                             example: "Neck hurt"
 *                           status:
 *                             type: string
 *                             example: "PENDING"
 *                           employeeId:
 *                             type: integer
 *                             example: 1
 *                           managerId:
 *                             type: integer
 *                             example: 1
 *                           ownerId:
 *                             type: integer
 *                             example: 1
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-08-10T18:04:03.899Z"
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-08-10T18:04:15.020Z"
 *                           employee:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: integer
 *                                 example: 1
 *                               name:
 *                                 type: string
 *                                 example: "Chamod Weerasinghe"
 *                               nicNo:
 *                                 type: string
 *                                 example: "123456789V"
 *                               address:
 *                                 type: string
 *                                 example: "123 Main St"
 *                               contactNo:
 *                                 type: string
 *                                 example: "0771234567"
 *                               emgConNo:
 *                                 type: string
 *                                 example: "0777654321"
 *                               emgConName:
 *                                 type: string
 *                                 example: "Jane Doe"
 *                               designation:
 *                                 type: string
 *                                 example: "Manager"
 *                               isCritical:
 *                                 type: boolean
 *                                 example: true
 *                               salary:
 *                                 type: number
 *                                 example: 50000
 *                               url:
 *                                 type: string
 *                                 example: "http://example.com/profile-picture.jpg"
 *                               ownerId:
 *                                 type: integer
 *                                 example: 1
 *                               outletId:
 *                                 type: integer
 *                                 example: 1
 *                               createdAt:
 *                                 type: string
 *                                 format: date-time
 *                                 example: "2024-08-10T07:38:21.857Z"
 *                               updatedAt:
 *                                 type: string
 *                                 format: date-time
 *                                 example: "2024-08-10T15:55:58.099Z"
 *                     nextCursor:
 *                       type: integer
 *                       example: null
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
 * /api/v1/leaveRequest/edit/{id}:
 *   patch:
 *     tags:
 *       - Leave Request
 *     summary: Update leave request
 *     description: Updates the details of a leave request for a specific owner, but only if the request status is "PENDING".
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the leave request
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 description: Type of leave request
 *                 example: "SICK"
 *               from:
 *                 type: string
 *                 format: date-time
 *                 description: Start date of the leave
 *                 example: "1970-01-01T00:00:00.000Z"
 *               noOfDate:
 *                 type: integer
 *                 description: Number of leave days
 *                 example: 11
 *               employeeId:
 *                 type: integer
 *                 description: Employee Id
 *                 example: 1
 *               reason:
 *                 type: string
 *                 description: Reason for leave
 *                 example: "Neck hurt"
 *     responses:
 *       '200':
 *         description: Successfully updated the leave request
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
 *                       format: date-time
 *                       example: "1970-01-01T00:00:00.000Z"
 *                     noOfDate:
 *                       type: integer
 *                       example: 11
 *                     reason:
 *                       type: string
 *                       example: "Neck hurt"
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
 *                       example: "2024-08-10T18:04:03.899Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-08-11T13:28:01.138Z"
 *       '400':
 *         description: Validation error or request cannot be updated
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
 *                   example: ["Cannot update leave request because decision already taken"]
 *       '404':
 *         description: Leave request not found
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
 *                   example: ["Leave request not found"]
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
 * /api/v1/leaveRequest/delete/{id}:
 *   delete:
 *     tags:
 *       - Leave Request
 *     summary: Delete a leave request
 *     description: Deletes a leave request by its ID if the requester is authorized.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the leave request to delete
 *         example: 1
 *     responses:
 *       '200':
 *         description: Successfully deleted the leave request
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
 *                     type:
 *                       type: string
 *                       example: "SICK"
 *                     from:
 *                       type: string
 *                       format: date-time
 *                       example: "1970-01-01T00:00:00.000Z"
 *                     noOfDate:
 *                       type: integer
 *                       example: 11
 *                     reason:
 *                       type: string
 *                       example: "Neck hert"
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
 *                       example: "2024-08-10T18:04:03.899Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-08-11T13:28:01.138Z"
 *       '403':
 *         description: Unauthorized to delete the leave request
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
 *                   example: ["Not authorized to delete this leave request"]
 *       '404':
 *         description: Leave request not found
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
 *                   example: ["Leave request not found"]
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

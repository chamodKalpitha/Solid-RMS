import { Router } from "express";
import { addLeaveRequest } from "../controller/leaveRequest.controller.mjs";

const router = Router();

router.post("/add", addLeaveRequest);

export default router;

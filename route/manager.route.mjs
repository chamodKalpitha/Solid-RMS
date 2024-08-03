import { Router } from "express";
import { createManager } from "../controller/manager.controller.mjs";
import checkRole from "../middleware/authorizationChecker.middleware.mjs";

const router = Router();

router.post("/new", checkRole("OWNER"), createManager);

export default router;

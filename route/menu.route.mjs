import { Router } from "express";
import { createMenu } from "../controller/menu.controller.mjs";
import checkRole from "../middleware/authorizationChecker.middleware.mjs";

const router = Router();

router.post("/add", checkRole("OWNER"), createMenu);

export default router;

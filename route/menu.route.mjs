import { Router } from "express";
import { createMenu } from "../controller/menu.controller.mjs";
import checkRole from "../middleware/authorizationChecker.middleware.mjs";

const router = Router();

router.post("/new", checkRole("OWNER"), createMenu);

export default router;

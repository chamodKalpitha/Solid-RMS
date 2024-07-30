import { Router } from "express";
import { createManager } from "../controller/manager.controller.mjs";

const router = Router();

router.post("/new", createManager);

export default router;

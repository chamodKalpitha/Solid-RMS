import { Router } from "express";
import { createMenu } from "../controller/menu.controller.mjs";

const router = Router();

router.post("/new", createMenu);

export default router;

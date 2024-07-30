import { Router } from "express";
import { createDish } from "../controller/dish.controller.mjs";

const router = Router();

router.post("/new", createDish);

export default router;

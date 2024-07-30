import { Router } from "express";
import { createIngredient } from "../controller/ingredient.controller.mjs";

const router = Router();

router.post("/new", createIngredient);

export default router;

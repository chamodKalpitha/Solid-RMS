import { Router } from "express";
import {
  createIngredient,
  getIngredients,
  deleteIngredient,
  updateIngredient,
} from "../controller/ingredient.controller.mjs";
import checkRole from "../middleware/authorizationChecker.middleware.mjs";

const router = Router();

router.post("/new", checkRole(["OWNER", "MANAGER"]), createIngredient);
router.delete("/delete/:id", checkRole(["OWNER"]), deleteIngredient);
router.get("/get", checkRole(["OWNER", "MANAGER"]), getIngredients);
router.patch("/:id", checkRole(["OWNER", "MANAGER"]), updateIngredient);

export default router;

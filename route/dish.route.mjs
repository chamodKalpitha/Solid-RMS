import { Router } from "express";
import { createDish, getAllDishes } from "../controller/dish.controller.mjs";
import checkRole from "../middleware/authorizationChecker.middleware.mjs";

const router = Router();

router.post("/new", checkRole("OWNER"), createDish);
router.get("/all", getAllDishes);

export default router;

import { Router } from "express";
import { addItemToInventory } from "../controller/inventory.controller.mjs";
import checkRole from "../middleware/authorizationChecker.middleware.mjs";

const router = Router();

router.post("/add", checkRole("OWNER"), addItemToInventory);

export default router;

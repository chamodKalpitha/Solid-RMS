import { Router } from "express";
import { createSupplier } from "../controller/supplier.controller.mjs";
import checkRole from "../middleware/authorizationChecker.middleware.mjs";

const router = Router();

router.post("/new", checkRole("OWNER"), createSupplier);

export default router;

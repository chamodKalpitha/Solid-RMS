import { Router } from "express";
import { createSupplier } from "../controller/supplier.controller.mjs";

const router = Router();

router.post("/new", createSupplier);

export default router;

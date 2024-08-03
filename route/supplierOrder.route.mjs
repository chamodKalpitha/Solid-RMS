import { Router } from "express";
import { addSupplierOrder } from "../controller/supplierOrder.controller.mjs";
import checkRole from "../middleware/authorizationChecker.middleware.mjs";

const router = Router();

router.post("/add", checkRole("OWNER"), addSupplierOrder);

export default router;

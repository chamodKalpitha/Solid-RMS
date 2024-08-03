import { Router } from "express";
import { addInventoryRequest } from "../controller/inventoryRequest.controller.mjs";

const router = Router();

router.post("/add", addInventoryRequest);

export default router;

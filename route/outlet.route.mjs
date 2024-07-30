import { Router } from "express";
import { createOutlet } from "../controller/outlet.controller.mjs";

const router = Router();

router.post("/new", createOutlet);

export default router;

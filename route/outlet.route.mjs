import { Router } from "express";
import { createOutlet } from "../controller/outlet.controller.mjs";
import checkRole from "../middleware/authorizationChecker.middleware.mjs";

const router = Router();

router.post("/new", checkRole("OWNER"), createOutlet);

export default router;

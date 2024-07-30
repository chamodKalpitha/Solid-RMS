import { Router } from "express";
import { registerOwner } from "../controller/auth.controller.mjs";

const router = Router();

router.post("/register", registerOwner);

export default router;

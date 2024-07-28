import { Router } from "express";
import { registerOwner } from "../controller/auth.controller.mjs";

const router = Router();

router.get("/register", registerOwner);

export default router;

import { Router } from "express";
import { register } from "../../controller/admin/auth.controller.mjs";

const router = Router();

router.get("/register", register);

export default router;

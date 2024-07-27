import { Router } from "express";
import authRouter from "./admin/auth.route.mjs";

const router = Router();

router.use("/auth", authRouter);

export default router;

import { Router } from "express";
import { getSignedUrl } from "../controller/s3.controller.mjs";
import checkRole from "../middleware/authorizationChecker.middleware.mjs";

const router = Router();

router.post("/new", checkRole("MANAGER"), getSignedUrl);

export default router;

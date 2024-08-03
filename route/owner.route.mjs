import { Router } from "express";
import { getOwnerById, getAllOwners } from "../controller/owner.controller.mjs";
import checkRole from "../middleware/authorizationChecker.middleware.mjs";

const router = Router();

router.get("/all", checkRole(["ADMIN"]), getAllOwners);
router.get("/:id", checkRole(["ADMIN", "MANAGER"]), getOwnerById);

export default router;

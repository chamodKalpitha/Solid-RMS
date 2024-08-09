import { Router } from "express";
import { getOwnerById, getAllOwners, updateOwner } from "../controller/owner.controller.mjs";
import checkRole from "../middleware/authorizationChecker.middleware.mjs";

const router = Router();

router.get("/all", checkRole(["ADMIN"]), getAllOwners);
router.get("/:id", checkRole(["ADMIN", "MANAGER"]), getOwnerById);
router.patch("/edit", checkRole(["ADMIN", "OWNER"]), updateOwner);

export default router;

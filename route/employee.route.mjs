import { Router } from "express";
import { createEmployee } from "../controller/employee.controller.mjs";
import checkRole from "../middleware/authorizationChecker.middleware.mjs";

const router = Router();

router.post("/new", checkRole("OWNER"), createEmployee);

export default router;

import { Router } from "express";
import { createEmployee } from "../controller/employee.controller.mjs";

const router = Router();

router.post("/new", createEmployee);

export default router;

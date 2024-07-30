import { Router } from "express";
import authRouter from "./auth.route.mjs";
import outletRouter from "./outlet.route.mjs";
import employeeRouter from "./employee.route.mjs";
import managerRouter from "./manager.route.mjs";
import ingredientRouter from "./ingredient.route.mjs";
import dishRouter from "./dish.route.mjs";
import menuRouter from "./menu.route.mjs";
import supplierRouter from "./supplier.route.mjs";

const router = Router();

router.use("/auth", authRouter);
router.use("/outlet", outletRouter);
router.use("/employee", employeeRouter);
router.use("/manager", managerRouter);
router.use("/Ingredient", ingredientRouter);
router.use("/dish", dishRouter);
router.use("/menu", menuRouter);
router.use("/supplier", supplierRouter);

export default router;

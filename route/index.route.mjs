import { Router } from "express";
import passport from "passport";
import "../middleware/passport-jwt.middleware.mjs";
import { verifyCsrfToken } from "../middleware/csrf.middleware.mjs";

import authRouter from "./auth.route.mjs";
import ownerRouter from "./owner.route.mjs";
import outletRouter from "./outlet.route.mjs";
import employeeRouter from "./employee.route.mjs";
import managerRouter from "./manager.route.mjs";
import ingredientRouter from "./ingredient.route.mjs";
import dishRouter from "./dish.route.mjs";
import menuRouter from "./menu.route.mjs";
import supplierRouter from "./supplier.route.mjs";
import inventoryRouter from "./inventory.route.mjs";
import leaveRequestRouter from "./leaveRequest.route.mjs";
import inventoryRequestRouter from "./inventoryRequest.route.mjs";
import supplierOrderRouter from "./supplierOrder.route.mjs";
import s3Router from "./s3.route.mjs";

const router = Router();

router.use("/auth", authRouter);

router.use(passport.authenticate("jwt", { session: false }), verifyCsrfToken);

router.use("/owner", ownerRouter);
router.use("/outlet", outletRouter);
router.use("/employee", employeeRouter);
router.use("/manager", managerRouter);
router.use("/Ingredient", ingredientRouter);
router.use("/dish", dishRouter);
router.use("/menu", menuRouter);
router.use("/supplier", supplierRouter);
router.use("/inventory", inventoryRouter);
router.use("/leaveRequest", leaveRequestRouter);
router.use("/inventoryRequest", inventoryRequestRouter);
router.use("/supplierOrder", supplierOrderRouter);
router.use("/s3SignedUrl", s3Router);

export default router;

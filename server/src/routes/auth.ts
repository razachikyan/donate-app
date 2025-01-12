import { Router } from "express";
import authController from "../controllers/auth";
import companyAuthController from "../controllers/companies";

const router = Router();

router.post("/signin", authController.login);
router.post("/logout", authController.logout);
router.post("/signup", authController.signup);
router.post("/refresh", authController.refresh);
router.post("/activate", authController.sendCode);
router.post("/verify-otp", authController.verifyOTP);
router.post("/change-pass", authController.changePass);
router.get("/is-authorized", authController.isAuthorized);

router.post("/company/signin", companyAuthController.login);
router.post("/company/signup", companyAuthController.signup);
router.post("/company/logout", companyAuthController.logout);
router.post("/company/refresh", companyAuthController.refresh);
router.get("/company/is-authorized", companyAuthController.isAuthorized);

export default router;

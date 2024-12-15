import { Router } from "express";
import authController from "../controllers/auth";

const router = Router();

router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.post("/signup", authController.signup);
router.post("/refresh", authController.refresh);
router.post("/activate", authController.sendCode);
router.post("/verify-otp", authController.verifyOTP);
router.post("/change-pass", authController.changePass);

export default router;

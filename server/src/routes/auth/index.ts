import { Router } from "express";
import AuthController from "../../controllers/auth";

const router = Router();

router.post("/login", AuthController.login);
router.post("/login/reset", AuthController.loginWithOnetimeCode);
router.post("/reset", AuthController.sendCode);
router.post("/signup", AuthController.signup);
router.post("/change-pass", AuthController.changePass);

export default router;

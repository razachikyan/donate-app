import { Router } from "express";
import AuthRouter from "./auth";
import ItemsRouter from "./items";

const router = Router();

router.use("/auth", AuthRouter);
router.use("/items", ItemsRouter);

export default router;

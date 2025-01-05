import { Router } from "express";
import AuthRouter from "./auth";
import ItemsRouter from "./items";
import ImagesRouter from "./images";
import CategoriesRouter from "./categories";

const router = Router();

router.use("/auth", AuthRouter);
router.use("/items", ItemsRouter);
router.use("/images", ImagesRouter);
router.use("/categories", CategoriesRouter);

export default router;

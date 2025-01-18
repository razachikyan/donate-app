import { Router } from "express";
import AuthRouter from "./auth";
import ItemsRouter from "./items";
import ImagesRouter from "./images";
import CategoriesRouter from "./categories";
import TransactionsRouter from "./transactions";

const router = Router();

router.use("/auth", AuthRouter);
router.use("/items", ItemsRouter);
router.use("/images", ImagesRouter);
router.use("/categories", CategoriesRouter);
router.use("/transactions", TransactionsRouter);

export default router;

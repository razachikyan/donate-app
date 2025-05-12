import { Router } from "express";
import categoriesController from "../controllers/categories";

const router = Router();

router.get("/", categoriesController.getCategories);
router.post("/", categoriesController.createCategory);
router.delete("/:id", categoriesController.deleteCategory);

export default router;

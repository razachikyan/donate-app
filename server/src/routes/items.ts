import { Router } from "express";
import itemsController from "../controllers/items";

const router = Router();

router.get("/", itemsController.getItems);
router.post("/", itemsController.createItem);
router.get("/variant:variant", itemsController.getItemsByVariant);
router.get("/:id", itemsController.getItemById);
router.put("/status/:id", itemsController.updateItemStatus);
router.put("/variant/:id", itemsController.updateItemVariant);
router.delete("/:id", itemsController.removeItem);
router.get("/user/:id", itemsController.getItemsByUser);
router.get("/category/:id", itemsController.getItemsByCategory);

export default router;

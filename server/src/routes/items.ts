import { Router } from "express";
import itemsController from "../controllers/items";

const router = Router();

router.get("/", () => {});
router.post("/", () => {});
router.get("/:id", () => {});
router.get("/user/:id", () => {});
router.get("/category/:id", () => {});

export default router;

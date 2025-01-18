import { Router } from "express";
import transactionsController from "../controllers/transactions";
const router = Router();

router.get("/", transactionsController.getTransactions);
router.post("/", transactionsController.createTransaction);
router.get("/:id", transactionsController.getTransactionById);
router.delete("/:id", transactionsController.removeTransaction);
router.get("/donor/:id", transactionsController.getTransactionsByDonor);
router.put("/status/:id", transactionsController.updateTransactionStatus);
router.get("/recipient/:id", transactionsController.getTransactionsByRecipient);

export default router;

import { Request, Response } from "express";
import transactionsServices from "../services/transactions";

class transactionsController {
  constructor() {}
  async getTransactions(_: Request, res: Response) {
    try {
      const transactions = await transactionsServices.getTransactions();
      res.status(200).json(transactions);
    } catch (err: any) {
      console.error(err);
      res
        .status(500)
        .json({ message: `Error while getting transactions:: ${err.message}` });
    }
  }

  async getTransactionsByDonor(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ message: "Empty user ID" });
        return;
      }
      const transactions = await transactionsServices.getTransactionsByDonor(
        id
      );
      res.status(200).json(transactions);
    } catch (err: any) {
      console.error(err);
      res
        .status(500)
        .json({ message: `Error while getting transactions:: ${err.message}` });
    }
  }

  async getTransactionsByRecipient(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ message: "Empty user ID" });
        return;
      }
      const transactions =
        await transactionsServices.getTransactionsByRecipient(id);
      res.status(200).json(transactions);
    } catch (err: any) {
      console.error(err);
      res
        .status(500)
        .json({ message: `Error while getting transactions:: ${err.message}` });
    }
  }

  async createTransaction(req: Request, res: Response) {
    try {
      const transaction = req.body;
      const created = await transactionsServices.createTransaction(transaction);
      res.status(201).json(created);
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ err });
    }
  }

  async getTransactionById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ message: "Empty item ID" });
        return;
      }
      const transaction = await transactionsServices.getTransactionById(id);
      if (!transaction) {
        res.status(400).json(`No transactions with id:${id}`);
        return;
      }
      res.status(200).json(transaction);
    } catch (err: any) {
      console.error(err);
      res
        .status(500)
        .json({ message: `Error while getting item:: ${err.message}` });
    }
  }

  async removeTransaction(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ message: "Empty item ID" });
        return;
      }
      await transactionsServices.removeTransaction(id);
      res.status(200).json({ message: "transaction removed successfully" });
    } catch (err: any) {
      console.error(err);
      res
        .status(500)
        .json({ message: `Error while getting item:: ${err.message}` });
    }
  }

  async updateTransactionStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ message: "Empty item ID" });
        return;
      }
      await transactionsServices.updateTransactionStatus(id, req.body.status);
      res
        .status(200)
        .json({ message: "transaction status updated successfully" });
    } catch (err: any) {
      console.error(err);
      res
        .status(500)
        .json({ message: `Error while getting item:: ${err.message}` });
    }
  }
}

export default new transactionsController();

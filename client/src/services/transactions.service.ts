import axiosClient from "../axiosClient";
import { ITransactionResponse } from "../models/responses/TransactionResponse";
import { TransactionDTO } from "../models/dtos/TransactionDTO";
import itemsService from "./items.service";

class TransactionsService {
  public async getTransactions(): Promise<ITransactionResponse[]> {
    try {
      const transactions = await axiosClient.get<ITransactionResponse[]>(
        "/transactions"
      );
      return transactions.data;
    } catch (error) {
      console.error("Error while getting transactions::", error);
      return [];
    }
  }

  public async createTransaction(
    DTO: TransactionDTO
  ): Promise<ITransactionResponse | null> {
    try {
      const response = await axiosClient.post<
        TransactionDTO,
        ITransactionResponse
      >("/transactions", DTO);
      return response.data;
    } catch (err: any) {
      console.error("Error while creating new transaction::", err.message);
      return null;
    }
  }

  public async removeTransaction(transactionId: string): Promise<void> {
    try {
      await axiosClient.delete(`/transactions/${transactionId}`);
    } catch (err: any) {
      console.error("Error while getting item::", err.message);
    }
  }

  public async getTransactionById(
    transactionId: string
  ): Promise<ITransactionResponse | null> {
    try {
      const response = await axiosClient.get<ITransactionResponse>(
        `/transactions/${transactionId}`
      );
      return response.data;
    } catch (err: any) {
      console.error("Error while getting item::", err.message);
      return null;
    }
  }

  public async getTransactionsByDonor(
    donorId: string
  ): Promise<ITransactionResponse[]> {
    try {
      const response = await axiosClient.get<ITransactionResponse[]>(
        `/transactions/donor/${donorId}`
      );
      return response.data;
    } catch (err: any) {
      console.error("Error while getting item::", err.message);
      return [];
    }
  }

  public async getTransactionsByRecipient(
    recipientId: string
  ): Promise<ITransactionResponse[]> {
    try {
      const response = await axiosClient.get<ITransactionResponse[]>(
        `/transactions/recipient/${recipientId}`
      );
      return response.data;
    } catch (err: any) {
      console.error("Error while getting item::", err.message);
      return [];
    }
  }

  public async updateTransactionStatus(
    transactionId: string,
    status: "in_progress" | "completed" | "cancelled"
  ): Promise<ITransactionResponse> {
    try {
      const response = await axiosClient.put<
        Partial<TransactionDTO>,
        ITransactionResponse
        >(`/transactions/status/${transactionId}`, { status });
      if (status === "completed") {
        await itemsService.updateItemStatus(response.data.item_id, 'donated');
      }
      return response.data;
    } catch (err: any) {
      console.error("Error while getting item::", err.message);
      throw err;
    }
  }
}

export default new TransactionsService();

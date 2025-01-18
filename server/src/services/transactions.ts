import DB from "../db";
import { v4 as uuidv4 } from "uuid";
import { ITransactionDTO, ITransactionResponse } from "../models/transaction";

class CategoriesService {
  public async createTransaction(
    DTO: ITransactionDTO
  ): Promise<ITransactionResponse> {
    const items = await DB<ITransactionResponse>("transactions")
      .select("*")
      .where({ item_id: DTO.item_id });
    if (
      items?.some(
        (item) => item.item_id === DTO.item_id && item.status === "accepted"
      )
    ) {
      throw new Error("Item already donated");
    }
    const [created] = await DB<ITransactionResponse>("transactions")
      .insert({
        ...DTO,
        created_at: new Date().toISOString(),
        status: "pending",
        updated_at: new Date().toISOString(),
        transaction_id: uuidv4(),
      })
      .returning("*");
    if (!created) throw new Error("Failed to create transaction");
    return created;
  }

  public async getTransactions(): Promise<Array<ITransactionResponse>> {
    const transactions = await DB<ITransactionResponse>("transactions").select(
      "*"
    );
    return transactions;
  }

  public async getTransactionsByDonor(
    userId: string
  ): Promise<Array<ITransactionResponse>> {
    const transactions = await DB<ITransactionResponse>("transactions")
      .select("*")
      .where({ donor_id: userId });
    return transactions;
  }

  public async getTransactionsByRecipient(
    userId: string
  ): Promise<Array<ITransactionResponse>> {
    const transactions = await DB<ITransactionResponse>("transactions")
      .select("*")
      .where({ recipient_id: userId });
    return transactions;
  }

  public async getTransactionById(
    transactionId: string
  ): Promise<ITransactionResponse | null> {
    const transaction = await DB<ITransactionResponse>("transactions")
      .select("*")
      .where({ transaction_id: transactionId })
      .first();
    return transaction ?? null;
  }

  public async removeTransaction(transactionId: string): Promise<void> {
    const removed = await DB("transactions")
      .where({ transaction_id: transactionId })
      .del();
    if (removed !== 1) throw new Error("Failed to remove transaction");
    }
    
    public async updateTransactionStatus(
      transactionId: string,
      status: string
    ): Promise<void> {
      const updated = await DB("transactions")
        .where({ transaction_id: transactionId })
        .update({ status });
      if (updated !== 1) throw new Error("Failed to update transaction status");
    }
}

export default new CategoriesService();

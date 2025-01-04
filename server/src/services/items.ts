import DB from "../db";
import { IItemDTO, IItemResponse } from "../models/item";
import "dotenv/config";

class ItemsService {
  public constructor() {}

  async getItems() {
    const items = await DB<IItemResponse>("items").select("*");
    return items;
  }

  async getItemsByUser(userId: string) {
    const items = await DB<IItemResponse>("items")
      .select("*")
      .where({ donor_id: userId });
    return items;
  }

  async getItemsByCategory(categoryId: string) {
    const items = await DB<IItemResponse>("items")
      .select("*")
      .where({ category: categoryId });
    return items;
  }

  async getItemById(itemId: string) {
    const item = await DB<IItemResponse>("items")
      .select("*")
      .where({ item_id: itemId })
      .first();

    return item;
  }

  async createItem(item: IItemDTO) {
    const [createdItem] = await DB<IItemResponse>("items")
      .insert({
        ...item,
        recipient_id: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .returning("*");

    return createdItem;
  }
}

export default new ItemsService();

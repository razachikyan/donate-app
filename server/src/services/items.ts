import DB from "../db";
import { IItemDTO, IItemResponse } from "../models/item";
import { v4 as uuidv4 } from "uuid";
import "dotenv/config";
import { ICategoryResponse } from "../models/category";

class ItemsService {
  public constructor() {}

  async getItems() {
    const items = await DB<IItemResponse>("items").select("*");
    return items;
  }
  async getItemsByVariant(variant: "charity" | "announcement") {
    const items = await DB<IItemResponse>("items")
      .select("*")
      .where({ variant });
    return items;
  }

  async updateItemStatus(
    itemId: string,
    status: "available" | "reserved" | "donated"
  ) {
    const item = await DB<IItemResponse>("items")
      .select("*")
      .where({ item_id: itemId })
      .update({ status });
    return item;
  }
  async updateItemVariant(itemId: string, variant: "charity" | "announcement") {
    const item = await DB<IItemResponse>("items")
      .select("*")
      .where({ item_id: itemId })
      .update({ variant });
    return item;
  }

  async getItemsByUser(userId: string) {
    const items = await DB<IItemResponse>("items")
      .select("*")
      .where({ donor_id: userId });
    return items;
  }

  async getItemsByCategory(categoryId: string) {
    const category = await DB<ICategoryResponse>("categories")
      .select("*")
      .where({ category_id: categoryId })
      .first();
    const items = await DB<IItemResponse>("items")
      .select("*")
      .where({ category: category?.name });
    return items;
  }

  async getItemById(itemId: string) {
    const item = await DB<IItemResponse>("items")
      .select("*")
      .where({ item_id: itemId })
      .first();

    return item;
  }

  async removeItem(itemId: string) {
    const item = await DB<IItemResponse>("items")
      .select("*")
      .where({ item_id: itemId })
      .del();

    if (item !== 1) throw new Error("Failed to remove item");

    return item;
  }

  async createItem(item: IItemDTO): Promise<IItemResponse> {
    if (!item.title || !item.description || !item.category || !item.condition) {
      throw new Error("Required fields are missing");
    }
    let createdItem;
    [createdItem] = await DB<IItemResponse>("items")
      .insert({
        ...item,
        recipient_id: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        item_id: uuidv4(),
      })
      .returning("*");
    if (!createdItem) throw new Error("Failed to create item");

    return createdItem;
  }
}

export default new ItemsService();

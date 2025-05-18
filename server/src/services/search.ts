import DB from "../db";
import { IItemResponse } from "../models/item";

class SearchServices {
  public async search(query: string): Promise<Array<IItemResponse>> {
    return await DB<IItemResponse>("items")
      .select("*")
      .where("title", ">=", `${query}`);
  }
}

export default new SearchServices();

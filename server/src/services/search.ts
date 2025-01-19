import DB from "../db";
import { IItemResponse } from "../models/item";

class SearchServices {
    public async search(query: string): Promise<Array<IItemResponse>> {
        const items = await DB<IItemResponse>("items")
            .select("*")
            .where("title", "like", `%${query}%`);
        return items;
    }
}

export default new SearchServices();

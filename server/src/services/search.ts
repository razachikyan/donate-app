import DB from "../db";
import { IItemResponse } from "../models/item";

class SearchServices {
    public async search(query: string): Promise<Array<IItemResponse>> {
        console.log(query);
        
        const items = await DB<IItemResponse>("items")
            .select("*")
            .where("title", ">=", `${query}`);
            console.log(items);
            
        return items;
    }
}

export default new SearchServices();

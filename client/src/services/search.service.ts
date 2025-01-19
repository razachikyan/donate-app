import axiosClient from "../axiosClient";
import { IItemResponse } from "../models/responses/ItemResponse";

class SearchService {
  async searchItems(query: string): Promise<Array<IItemResponse>> {
    try {
      const response = await axiosClient.get<IItemResponse[]>(
        `/search?query=${query}`
      );
      return response.data;
    } catch (err: any) {
      console.error("Error while getting items::", err.message);
      return [];
    }
  }
}

export default new SearchService();

import axiosClient from "../axiosClient";
import { CategoriesDTO } from "../models/dtos/CategoriesDTO";
import { CategoriesResponse } from "../models/responses/CategoriesResponse";

class CategoriesService {
  public async getCategories(): Promise<Array<CategoriesResponse>> {
    try {
      const response = await axiosClient.get<CategoriesResponse[]>(
        "/categories"
      );
      return response.data;
    } catch (err: any) {
      console.error("Error while getting categories::", err.message);
      return [];
    }
  }
  public async createCategory(
    DTO: CategoriesDTO
  ): Promise<CategoriesResponse | null> {
    try {
      const response = await axiosClient.post<
        CategoriesDTO,
        CategoriesResponse
      >("/categories", DTO);
      return response.data;
    } catch (err: any) {
      console.error("Error while creating new category::", err.message);
      return null;
    }
  }
}

export default new CategoriesService();

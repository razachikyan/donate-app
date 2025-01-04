import DB from "../db";
import { ICategoryDTO, ICategoryResponse } from "../models/category";

class CategoriesService {
  public async getAllCategories(): Promise<ICategoryResponse[]> {
    try {
      const categories = await DB<ICategoryResponse>("categories").select("*");
      return categories;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw new Error("Error fetching categories");
    }
  }

  public async createCategory({
    description,
    name,
  }: ICategoryDTO): Promise<ICategoryResponse> {
    try {
      const [newCategory] = await DB<ICategoryResponse>("categories").insert(
        { name, description },
        ["category_id", "name", "description"]
      );
      return newCategory;
    } catch (error) {
      console.error("Error creating category:", error);
      throw new Error("Error creating category");
    }
  }
}

export default new CategoriesService();

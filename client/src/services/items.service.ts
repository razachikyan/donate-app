import axiosClient from "../axiosClient";
import { ItemDTO } from "../models/dtos/ItemTDO";
import { IItemResponse } from "../models/responses/ItemResponse";

class ItemsService {
  public async getItems(): Promise<Array<IItemResponse>> {
    try {
      const response = await axiosClient.get<IItemResponse[]>("/items");
      return response.data;
    } catch (err: any) {
      console.error("Error while getting items::", err.message);
      return [];
    }
  }
  public async getItemsByUser(userId: string): Promise<Array<IItemResponse>> {
    try {
      const response = await axiosClient.get<IItemResponse[]>(
        `/items/user/${userId}`
      );
      return response.data;
    } catch (err: any) {
      console.error("Error while getting items::", err.message);
      return [];
    }
  }
  public async getItemsByCategory(
    categoryId: string
  ): Promise<Array<IItemResponse>> {
    try {
      const response = await axiosClient.get<IItemResponse[]>(
        `/items/category/${categoryId}`
      );
      return response.data;
    } catch (err: any) {
      console.error("Error while getting items::", err.message);
      return [];
    }
  }
  public async getItemsByVariant(
    variant: string
  ): Promise<Array<IItemResponse>> {
    try {
      const response = await axiosClient.get<IItemResponse[]>(
        `/items/variant/${variant}`
      );
      return response.data;
    } catch (err: any) {
      console.error("Error while getting items::", err.message);
      return [];
    }
  }
  public async getItemById(id: string): Promise<IItemResponse | null> {
    try {
      const response = await axiosClient.get<IItemResponse>(`/items/${id}`);
      return response.data;
    } catch (err: any) {
      console.error("Error while getting item::", err.message);
      return null;
    }
  }

  public async removeItem(id: string): Promise<void> {
    try {
      await axiosClient.delete(`/items/${id}`);
    } catch (err: any) {
      console.error("Error while getting item::", err.message);
    }
  }

  public async updateItemStatus(id: string, status: string): Promise<void> {
    try {
      await axiosClient.put(`/items/status/${id}`, { status });
    } catch (err: any) {
      console.error("Error while getting item::", err.message);
    }
  }

  public async createItem(DTO: ItemDTO): Promise<IItemResponse | null> {
    try {
      const response = await axiosClient.post<ItemDTO, IItemResponse>(
        "/items",
        DTO
      );
      return response.data;
    } catch (err: any) {
      console.error("Error while creating new item::", err.message);
      return null;
    }
  }
}

export default new ItemsService();

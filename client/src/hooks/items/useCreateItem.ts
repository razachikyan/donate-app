import { useState } from "react";
import { ItemDTO } from "../../models/dtos/ItemTDO";
import { IItemResponse } from "../../models/responses/ItemResponse";
import itemsService from "../../services/items.service";

export const useCreateItem = () => {
  const [pending, setPending] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<IItemResponse | null>(null);

  const createItem = async (item: ItemDTO) => {
    try {
      setPending(true);
      setError(null);
      const response = await itemsService.createItem(item);
      setData(response);
      return response;
    } catch (error: any) {
      setError(error?.response?.data?.error ?? error.message);
      throw error;
    } finally {
      setPending(false);
    }
  };

  return {
    createItem,
    pending,
    error,
    data,
  };
};

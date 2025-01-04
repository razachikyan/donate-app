import { useEffect, useState } from "react";
import { IItemResponse } from "../../models/responses/ItemResponse";
import itemsService from "../../services/items.service";

export const useGetItems = (
  type: "category" | "item" | "user" | "all",
  id?: string
) => {
  const [data, setData] = useState<IItemResponse[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState<boolean>(false);

  useEffect(() => {
    const loadItems = async () => {
      try {
        setPending(true);
        setError(null);

        let response: IItemResponse[] = [];

        switch (type) {
          case "all":
            response = await itemsService.getItems();
            break;
          case "user":
            if (!id)
              throw new Error(
                "User ID is required for fetching items by user."
              );
            response = await itemsService.getItemsByUser(id);
            break;
          case "category":
            if (!id)
              throw new Error(
                "Category ID is required for fetching items by category."
              );
            response = await itemsService.getItemsByCategory(id);
            break;
          case "item":
            if (!id)
              throw new Error(
                "Item ID is required for fetching a single item."
              );
            const item = await itemsService.getItemById(id);
            response = item ? [item] : [];
            break;
          default:
            throw new Error("Invalid type provided to useGetItems.");
        }

        setData(response);
      } catch (error: any) {
        setError(error?.response?.data?.error ?? error.message);
      } finally {
        setPending(false);
      }
    };

    loadItems();
  }, [type, id]);

  return {
    data,
    error,
    pending,
  };
};

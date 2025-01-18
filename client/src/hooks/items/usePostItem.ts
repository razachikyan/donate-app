import { useState } from "react";
import { ItemDTO } from "../../models/dtos/ItemTDO";
import { IItemResponse } from "../../models/responses/ItemResponse";
import ItemsService from "../../services/items.service";
import { useCheckAuth } from "../auth/useCheckAuth";

export const usePostItem = () => {
  const [formData, setFormData] = useState<ItemDTO>({
    title: "",
    description: "",
    category: "",
    condition: "new",
    status: "available",
    donor_id: "",
    image_url: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useCheckAuth();

  const handleFormChange = (field: keyof ItemDTO, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const response: IItemResponse | null = await ItemsService.createItem(
        formData,
        user && "company_id" in user ? "company" : "user"
      );
      if (response) {
        setFormData({
          title: "",
          description: "",
          category: "",
          condition: "new",
          status: "available",
          donor_id: "",
          image_url: "",
          address: "",
        });
      }
    } catch (err: any) {
      setError("Failed to post item. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    error,
    handleFormChange,
    handleFormSubmit,
  };
};

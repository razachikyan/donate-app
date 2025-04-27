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
    variant: "charity",
    status: "available",
    donor_id: "",
    image_url: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFormChange = (field: keyof ItemDTO, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const missingFields = Object.entries(formData).filter(
        ([_, value]) => value.trim() === ""
      );  
      if (missingFields.length > 0) {
        setLoading(false);
        setError(`Խնդրում ենք լրացնել բոլոր պարտադիր դաշտերը։`);
        return;
      }  
      const response: IItemResponse | null = await ItemsService.createItem(
        formData
      );
      if (response) {
        setFormData({
          title: "",
          description: "",
          variant: "charity",
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

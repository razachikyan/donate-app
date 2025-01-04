import { useEffect, useState } from "react";
import { CategoriesResponse } from "../models/responses/CategoriesResponse";
import categoriesService from "../services/categories.service";

export const useGetCategories = () => {
  const [data, setData] = useState<CategoriesResponse[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState<boolean>(false);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setPending(true);
        setError(null);
        const response = await categoriesService.getCategories();
        setData(response);
      } catch (error: any) {
        setError(error?.response?.data?.error ?? error.message);
      } finally {
        setPending(false);
      }
    };

    loadCategories();
  }, []); // Empty dependency array ensures the effect runs only once on mount.

  return {
    data,
    error,
    pending,
  };
};

import { useEffect, useState } from "react";
import { UserResponse } from "../../models/responses/UserResponse";
import usersService from "../../services/users.service";

export const useGetUserById = (id: string) => {
  const [data, setData] = useState<UserResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState<boolean>(false);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setPending(true);
        setError(null);
        const response = await usersService.getUserById(id);
        setData(response);
      } catch (error: any) {
        setError(error?.response?.data?.error ?? error.message);
      } finally {
        setPending(false);
      }
    };

    loadCategories();
  }, []);

  return {
    data,
    error,
    pending,
  };
};

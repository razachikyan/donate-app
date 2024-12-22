import { useState } from "react";
import authService from "../services/authService";

export const useVerify = () => {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any | null>(null);

  const verify = async (email: string, oneTimeCode: string) => {
    setPending(true);
    setError(null);

    try {
      const response = await authService.verify(email, oneTimeCode);
      setData(response);
      return response;
    } catch (err: any) {
      setError(err?.message || "Something went wrong");
      throw err;
    } finally {
      setPending(false);
    }
  };

  return {
    verify,
    data,
    error,
    pending,
  };
};

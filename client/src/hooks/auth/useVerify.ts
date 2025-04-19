import { useState } from "react";
import authService from "../../services/auth.service";

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
    } catch (error: any) {
      setError(
        error?.response?.data?.message ??
          (error.message || "Something went wrong")
      );
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

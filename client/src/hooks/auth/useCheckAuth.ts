import { useState, useEffect } from "react";
import authService from "../../services/auth.service";
import { AuthResponse } from "../../models/responses/AuthResponse";

export const useCheckAuth = () => {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [user, setUser] = useState<AuthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuthorization = async () => {
      setLoading(true);
      setError(null);

      try {
        const userResponse = await authService.isAuthorized();

        if (userResponse) {
          setIsAuthorized(true);
          setUser(userResponse);
        } else {
          setIsAuthorized(false);
          setUser(null);
        }
      } catch (error: any) {
        setIsAuthorized(false);
        setUser(null);
        setError(
          error?.response?.data?.message ??
            "An error occurred while checking authorization."
        );
      } finally {
        setLoading(false);
      }
    };

    checkAuthorization();
  }, []);

  return {
    isAuthorized,
    user,
    error,
    loading,
  };
};

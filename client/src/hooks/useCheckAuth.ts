import { useState, useEffect } from "react";
import authService from "../services/authService";
import { AuthResponse } from "../models/responses/AuthResponse";

export const useCheckAuth = () => {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [user, setUser] = useState<AuthResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuthorization = async () => {
      setLoading(true);
      try {
        const userResponse = await authService.isAuthorized();
        if (userResponse) {
          setIsAuthorized(true);
          setUser(userResponse);
        } else {
          setIsAuthorized(false);
          setUser(null);
        }
      } catch (error) {
        console.error("Error checking authorization:", error);
        setIsAuthorized(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuthorization();
  }, []);

  return {
    isAuthorized,
    user,
    loading,
  };
};

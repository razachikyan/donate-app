import { useState, useEffect } from "react";
import authService from "../../services/auth.service";
import { AuthResponse } from "../../models/responses/AuthResponse";
import companyService from "../../services/company.service";
import { CompanyResponse } from "../../models/responses/CompanyResponse";

export const useCheckAuth = () => {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [user, setUser] = useState<AuthResponse | CompanyResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuthorization = async () => {
      setLoading(true);
      setError(null);

      try {
        const [userResponse, companyResponse] = await Promise.all([
          authService.isAuthorized() as Promise<AuthResponse | null>,
          companyService.isAuthorized() as Promise<CompanyResponse | null>,
        ]);

        if (userResponse) {
          setIsAuthorized(true);
          setUser(userResponse);
        } else if (companyResponse) {
          setIsAuthorized(true);
          setUser(companyResponse);
        } else {
          setIsAuthorized(false);
          setUser(null);
        }
      } catch (error: any) {
        setIsAuthorized(false);
        setUser(null);
        setError(
          error?.response?.data?.error ??
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
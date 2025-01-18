import axiosClient from "../axiosClient";
import {
  CompanySigninDTO,
  CompanySignupDTO,
} from "../models/dtos/CompaniesDTO";
import { CompanyResponse } from "../models/responses/CompanyResponse";

class CompanyService {
  public async signIn(email: string, password: string): Promise<string> {
    try {
      const response = await axiosClient.post<
        CompanySigninDTO,
        { accessToken: string }
      >("/auth/company/signin", { email, password });

      const { accessToken } = response.data;
      localStorage.setItem("accessToken", accessToken);

      return accessToken;
    } catch (error) {
      console.error("Error signing in:", error);
      throw error;
    }
  }

  public async signUp(
    name: string,
    email: string,
    password: string
  ): Promise<string> {
    try {
      const {
        data: { accessToken },
      } = await axiosClient.post<CompanySignupDTO, { accessToken: string }>(
        "/auth/company/signup",
        {
          name,
          email,
          password,
        }
      );
      localStorage.setItem("accessToken", accessToken);

      return accessToken;
    } catch (error) {
      console.error("Error signing up:", error);
      throw error;
    }
  }

  async isAuthorized(): Promise<CompanyResponse | null> {
    try {
      const response = await axiosClient.get<{company: CompanyResponse}>(
        "/auth/company/is-authorized"
      );
      return response.data.company;
    } catch (error) {
      console.error("Error in authService.isAuthorized:", error);
      return null;
    }
  }

  public async logout() {
    try {
      await axiosClient.post<{}, void>("/auth/company/logout", {});
    } catch (error) {
      console.error("Error while logging out:", error);
      throw error;
    }
  }
}

export default new CompanyService();

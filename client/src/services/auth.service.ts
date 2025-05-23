import axiosClient from "../axiosClient";
import { SigninDTO } from "../models/dtos/SigninDTO";
import { SignupDTO } from "../models/dtos/SignupDTO";
import { VerifyDTO } from "../models/dtos/VerifyDTO";
import { AuthResponse } from "../models/responses/AuthResponse";

class AuthService {
  public async signIn(email: string, password: string): Promise<string> {
    try {
      const response = await axiosClient.post<
        SigninDTO,
        { accessToken: string }
      >("/auth/signin", { email, password });

      const { accessToken } = response.data;
      localStorage.setItem("accessToken", accessToken);

      return accessToken;
    } catch (error) {
      console.error("Error signing in:", error);
      throw error;
    }
  }

  public async signUp(
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    type: string,
    password: string
  ): Promise<AuthResponse> {
    try {
      const response = await axiosClient.post<SignupDTO, AuthResponse>(
        "/auth/signup",
        {
          firstName,
          lastName,
          email,
          phone,
          type,
          password,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error signing up:", error);
      throw error;
    }
  }

  async isAuthorized(): Promise<AuthResponse | null> {
    try {
      const response = await axiosClient.get<{ user: AuthResponse }>(
        "/auth/is-authorized"
      );
      return response.data.user;
    } catch (error) {
      console.error("Error in authService.isAuthorized:", error);
      return null;
    }
  }

  public async verify(email: string, oneTimeCode: string): Promise<boolean> {
    try {
      const response = await axiosClient.post<
        VerifyDTO,
        { accessToken: string }
      >("/auth/verify-otp", {
        email,
        oneTimeCode,
      });

      const { accessToken } = response.data;

      localStorage.setItem("accessToken", accessToken);

      return true;
    } catch (error) {
      console.error("Error while verifying:", error);
      throw error;
    }
  }

  public async logout() {
    try {
      await axiosClient.post<{}, void>("/auth/logout", {});
    } catch (error) {
      console.error("Error while logging out:", error);
      throw error;
    }
  }
}

export default new AuthService();

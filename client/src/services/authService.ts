import axiosClient from "../axiosClient";
import { SigninDTO } from "../models/dtos/SigninDTO";
import { SignupDTO } from "../models/dtos/SignupDTO";
import { AuthResponse } from "../models/responses/AuthResponse";

class AuthService {
  public async signIn(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await axiosClient.post<SigninDTO, AuthResponse>(
        "/signin",
        { email, password }
      );
      return response.data;
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
    password: string
  ): Promise<AuthResponse> {
    try {
      const response = await axiosClient.post<SignupDTO, AuthResponse>(
        "/signup",
        {
          firstName,
          lastName,
          email,
          phone,
          password,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error signing up:", error);
      throw error;
    }
  }
}

export default new AuthService();

import axiosClient from "../axiosClient";
import { UserResponse } from "../models/responses/UserResponse";

class UserService {
  public async getUserById(id: string): Promise<UserResponse | null> {
    try {
      const response = await axiosClient.get<UserResponse>(
        `/users/${id}`
      );
      return response.data;
    } catch (err: any) {
      console.error("Error while getting user::", err.message);
      return null;
    }
  }
}

export default new UserService();

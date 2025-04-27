import "dotenv/config";
import DB from "../db";
import { IUserResponse } from "../models/user";

class ItemsService {
  public constructor() {}

  async getUsers() {
    const users = await DB<IUserResponse>("users").select("*");
    return users;
  }
  async getUserById(userId: string) {
    const user = await DB<IUserResponse>("items")
      .select("*")
      .where({ user_id: userId })
      .first();

    return user;
  }
}

export default new ItemsService();

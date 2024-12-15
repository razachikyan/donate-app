import bcrypt from "bcrypt";
import { nanoid, customAlphabet } from "nanoid";
import { Validation } from "../utils/validation";
import DB from "../db";
import mailer from "../utils/mailer";
import "dotenv/config";
import { IUserDTO, IUserResponse } from "../models/user";

class AuthServices {
  private validator: Validation;

  public constructor() {
    this.validator = new Validation();
  }

  public async login(email: string, password: string): Promise<void> {
    // const user = await DB<IUserDTO>("users").where({ email }).first();
    // if (!user) throw Error("User with this email address doesn't exist");
    // const passwordMatch = await bcrypt.compare(password, user.password);
    // if (!passwordMatch) throw Error("Wrong password");
    // const updatedCount = await DB<IUserResponse>("users")
    //   .where({ email })
    //   .update({ session_id: nanoid() });
    // if (updatedCount !== 1) throw new Error("Can't update user");
    // const newUser = await DB<IUserDTO>("users").where({ email }).first();
    // if (!newUser) throw Error("Database error");
    // return newUser;
  }

  public async logout(): Promise<void> {}

  public async changePass(email: string, password: string): Promise<void> {
    // const user = await DB<IUserDTO>("users").where({ email }).first();
    // if (!user) throw Error("User with this email address doesn't exist");
    // const hashedPassword = await bcrypt.hash(password, 10);
    // const updatedCount = await DB<IUserDTO>("users")
    //   .where({ email })
    //   .update({ password: hashedPassword });
    // if (updatedCount !== 1) throw new Error("Can't update user");
    // const newUser = await DB<IUserDTO>("users").where({ email }).first();
    // if (!newUser) throw Error("Database error");
    // return newUser;
  }

  public async getUserBySession(session_id: string): Promise<void> {
    // const user = await DB<IUserResponse>("users").where({ session_id }).first();
    // if (!user) throw Error("Session id is not valid");
    // return user;
  }

  public async verifyOTP(email: string, one_time_code: string): Promise<void> {
    // const user = await DB<IUserResponse>("users").where({ email }).first();
    // if (!user || user?.one_time_code !== one_time_code)
    //   throw Error("Session id is not valid");
    // return user;
  }

  public async signup(userData: any): Promise<void> {
    // this.validator.validate(userData);
    // const checkUser = await DB<IUserDTO>("users")
    //   .where({ email: userData.email })
    //   .first();
    // if (checkUser) throw Error("USER_EXIST");
    // const hashedPassword = await bcrypt.hash(userData.password, 10);
    // const user_id = nanoid();
    // const session_id = nanoid();
    // await DB<IUserResponse>("users").insert({
    //   password_hash: hashedPassword,
    //   user_id,
    //   session_id,
    //   email: userData.email,
    //   firstname: userData.firstname,
    //   lastname: userData.lastname,
    //   middlename: userData.middlename,
    // });
    // const user = await DB<IUserResponse>("users").where({ user_id }).first();
    // if (!user) throw Error("Couldn't create user");
    // return user;
  }

  public async sendCode(email: string): Promise<void> {
    // const user = await DB<IUserResponse>("users").where({ email }).first();
    // if (!user) throw Error("User with this email address doesn't exist");
    // const code = customAlphabet("0123456789", 6)();
    // await DB<IUserResponse>("users")
    //   .where({ email })
    //   .update({ one_time_code: code });
    // mailer.sendMessage(user.email, code);
  }
}

export default new AuthServices();
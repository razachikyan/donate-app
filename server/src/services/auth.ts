import bcrypt from "bcrypt";
import { Validation } from "../utils/validation";
import DB from "../db";
import mailer from "../utils/mailer";
import JwtUtils from "../utils/JWT";
import { v4 as uuidv4 } from "uuid";
import { IUserDTO, IUserResponse } from "../models/user";
import constants from "../constants/auth";
import "dotenv/config";

class AuthServices {
  private validator: Validation;

  public constructor() {
    this.validator = new Validation();
  }

  public async login(
    email: string,
    password: string
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await DB<IUserResponse>("users").where({ email }).first();
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error(constants.invalid_credentials);
    }

    const accessToken = JwtUtils.generateAccessToken({ userId: user.user_id });
    const refreshToken = JwtUtils.generateRefreshToken({
      userId: user.user_id,
    });

    await DB("refresh_tokens").insert({
      user_id: user.user_id,
      token: refreshToken,
    });

    return { accessToken, refreshToken };
  }

  public async logout(refreshToken: string): Promise<void> {
    await DB("refresh_tokens").where({ token: refreshToken }).del();
  }

  public async changePass(email: string, newPassword: string): Promise<void> {
    const user = await DB<IUserResponse>("users").where({ email }).first();
    if (!user) {
      throw new Error(constants.not_found);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await DB<IUserResponse>("users").where({ email }).update({
      password: hashedPassword,
    });

    mailer.sendMessage(
      email,
      "Your password has been successfully updated. If you did not perform this action, contact support immediately.",
      "Password changed"
    );
  }

  public async getUserByToken(token: string): Promise<IUserResponse | null> {
    try {
      const payload = JwtUtils.verifyToken(token, "access") as {
        userId: string;
      };

      const user = await DB<IUserResponse>("users")
        .where({ user_id: payload.userId })
        .first();

      return user || null;
    } catch (error) {
      console.error("Error verifying token or fetching user:", error);
      return null;
    }
  }

  public async verifyOTP(
    email: string,
    oneTimeCode: string
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await DB<IUserResponse>("users").where({ email }).first();
    if (!user) throw new Error(constants.not_found);

    if (user.one_time_code !== oneTimeCode) {
      throw new Error("Invalid OTP");
    }

    await DB<IUserResponse>("users").where({ email }).update({
      is_active: true,
      one_time_code: null,
    });

    const accessToken = JwtUtils.generateAccessToken({ userId: user.user_id });
    const refreshToken = JwtUtils.generateRefreshToken({
      userId: user.user_id,
    });

    await DB("refresh_tokens").insert({
      user_id: user.user_id,
      token: refreshToken,
    });

    mailer.sendMessage(email, "Your account has been successfully verified.", "Account verified");
    return { accessToken, refreshToken };
  }

  public async signup(userData: IUserDTO): Promise<void> {
    console.log(userData);
    this.validator.validate(userData);
    
    const existingUser = await DB<IUserResponse>("users")
      .where({ email: userData.email })
      .first();
    if (existingUser) throw new Error(constants.already_exist);

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    await DB<IUserResponse>("users").insert({
      ...userData,
      password: hashedPassword,
      is_active: false,
      one_time_code: null,
    });

    await this.sendCode(userData.email);
  }

  public async sendCode(email: string): Promise<void> {
    const user = await DB<IUserResponse>("users").where({ email }).first();
    if (!user) throw new Error(constants.not_found);

    const code = uuidv4().replace(/\D/g, "").slice(0, 6);

    await DB<IUserResponse>("users")
      .where({ email })
      .update({ one_time_code: code });

    mailer.sendMessage(user.email, `Your OTP is: ${code}`, "OTP verification");
  }

  public async refreshTokens(
    refreshToken: string
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const payload = JwtUtils.verifyToken(refreshToken, "refresh") as {
      userId: string;
    };

    const newAccessToken = JwtUtils.generateAccessToken({
      userId: payload.userId,
    });
    const newRefreshToken = JwtUtils.generateRefreshToken({
      userId: payload.userId,
    });

    await DB("refresh_tokens")
      .where({ user_id: payload.userId })
      .update({ token: newRefreshToken });

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }

  public async isAuthorized(
    accessToken: string,
    refreshToken: string | null
  ): Promise<(IUserResponse & { accessToken?: string }) | null> {
    try {
      let payload;
      try {
        payload = JwtUtils.verifyToken(accessToken, "access") as {
          userId: string;
        };
      } catch (error) {
        if (refreshToken) {
          const refreshPayload = JwtUtils.verifyToken(
            refreshToken,
            "refresh"
          ) as { userId: string };
          if (refreshPayload) {
            const newAccessToken = JwtUtils.generateAccessToken({
              userId: refreshPayload.userId,
            });

            const user = await DB<IUserResponse>("users")
              .where({ user_id: refreshPayload.userId })
              .first();
            if (user) return { ...user, accessToken: newAccessToken };
          }
        }
        return null;
      }
      const user = await DB<IUserResponse>("users")
        .where({ user_id: payload.userId })
        .first();
      return user || null;
    } catch (error) {
      console.error("Authorization check failed:", error);
      return null;
    }
  }
}

export default new AuthServices();

import { Request, Response } from "express";
import authServices from "../services/auth";

class AuthController {
  constructor() {}

  async signup(req: Request, res: Response) {
    try {
      await authServices.signup(req.body);
      res.status(201).json({
        message:
          "User created successfully, please check your email for OTP verification.",
      });
    } catch (error: any) {
      console.log("Error creating user:", error);
      res
        .status(500)
        .json({ message: error.message || "Internal server error" });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const { accessToken, refreshToken } = await authServices.login(
        email,
        password
      );

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
      });

      res.status(200).json({ accessToken });
    } catch (error: any) {
      console.error("Error logging in:", error.message);
      res.status(500).json({ message: "Login failed", error: error.message });
    }
  }

  async logout(req: Request, res: Response) {
    try {
      const refreshToken = req.cookies["refreshToken"];
      await authServices.logout(refreshToken);
      res.status(200).send("User logged out successfully!");
    } catch (error) {
      console.log("Error authenticating user:", error);
      res.status(500).json(error);
    }
  }

  async changePass(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await authServices.changePass(email, password);
      res.status(200).json(user);
    } catch (error) {
      console.log("Error authenticating user:", error);
      res.status(500).json(error);
    }
  }

  async verifyOTP(req: Request, res: Response) {
    try {
      const { email, oneTimeCode } = req.body;

      const { accessToken, refreshToken } = await authServices.verifyOTP(
        email,
        oneTimeCode
      );

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
      });

      res.status(200).json({ accessToken });
    } catch (error: any) {
      console.error("Error verifying OTP:", error.message);
      res
        .status(500)
        .json({ message: "Failed to verify OTP", error: error.message });
    }
  }

  async sendCode(req: Request, res: Response) {
    try {
      const { email } = req.body;
      await authServices.sendCode(email);
      res.sendStatus(200);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async refresh(req: Request, res: Response) {
    try {
      res.sendStatus(200);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async isAuthorized(req: Request, res: Response) {
    try {
      const accessToken = req.headers.authorization?.split(" ")[1];
      const { refreshToken } = req.cookies;
      if (!accessToken) throw new Error("Access token is required");

      const user = await authServices.isAuthorized(accessToken, refreshToken);

      if (!user) throw new Error("Unauthorized");
      const { accessToken: newToken } = user;
      if (newToken) res.setHeader("Authorization", `Bearer ${newToken}`);

      res.status(200).json({ user });
    } catch (error: any) {
      console.error("Error during authorization check:", error);
      res.status(401).json({ message: error.message || "Unauthorized" });
    }
  }
}

export default new AuthController();

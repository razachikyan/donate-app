import { Request, Response } from "express";
import authServices from "../services/auth";

class AuthController {
  constructor() {}

  async signup(req: Request, res: Response) {
    try {
      const user = await authServices.signup(req.body);
      res.status(201).json(user);
    } catch (error) {
      console.log("Error creating user:", error);
      res.status(500).json(error);
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await authServices.login(email, password);
      res.status(200).json(user);
    } catch (error) {
      console.log("Error authenticating user:", error);
      res.status(500).json(error);
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
      const { email, password } = req.body;
      const user = await authServices.verifyOTP(email, password);
      res.status(200).json(user);
    } catch (error) {
      console.log("Error authenticating user:", error);
      res.status(500).json(error);
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
}

export default new AuthController();

import { Request, Response } from "express";
import { AuthServices } from "../services/auth";

const authServices = new AuthServices();

export default {
  async signup(req: Request, res: Response) {
    try {
      const user = await authServices.signup(req.body);
      res.status(201).json(user);
    } catch (error) {
      console.log("Error creating user:", error);
      res.status(500).json(error);
    }
  },

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await authServices.login(email, password);
      res.status(200).json(user);
    } catch (error) {
      console.log("Error authenticating user:", error);
      res.status(500).json(error);
    }
  },

  async changePass(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await authServices.changePass(email, password);
      res.status(200).json(user);
    } catch (error) {
      console.log("Error authenticating user:", error);
      res.status(500).json(error);
    }
  },

  async loginWithOnetimeCode(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await authServices.loginWithOnetimeCode(email, password);
      res.status(200).json(user);
    } catch (error) {
      console.log("Error authenticating user:", error);
      res.status(500).json(error);
    }
  },

  async sendCode(req: Request, res: Response) {
    try {
      const { email } = req.body;
      await authServices.sendCode(email);
      res.sendStatus(200);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

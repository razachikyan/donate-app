import { Request, Response } from "express";
import companyAuthServices from "../services/companies";

class CompanyAuthController {
  async signup(req: Request, res: Response) {
    try {
      const { accessToken, refreshToken } = await companyAuthServices.signup(
        req.body
      );

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
      });

      res.status(201).json({
        message: "Company registered successfully.",
        accessToken,
      });
    } catch (error: any) {
      console.log("Error during company signup:", error);
      res
        .status(500)
        .json({ message: error.message || "Internal server error" });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const tokens = await companyAuthServices.login(email, password);

      res.cookie("refreshToken", tokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
      });

      res.status(200).json({ accessToken: tokens.accessToken });
    } catch (error: any) {
      res
        .status(500)
        .json({ message: error.message || "Internal server error" });
    }
  }

  async logout(req: Request, res: Response) {
    try {
      const refreshToken = req.cookies["refreshToken"];
      await companyAuthServices.logout(refreshToken);
      res.status(200).json({ message: "Logged out successfully" });
    } catch (error: any) {
      res
        .status(500)
        .json({ message: error.message || "Internal server error" });
    }
  }

  async isAuthorized(req: Request, res: Response) {
    try {
      const accessToken = req.headers.authorization?.split(" ")[1] ?? '';
      const refreshToken = req.cookies["refreshToken"];
      if (!accessToken) throw new Error("Access token is required");
      const company = await companyAuthServices.isAuthorized(
        accessToken,
        refreshToken
      );
      res.status(200).json({ company });
    } catch (error: any) {
      res.status(401).json({ message: error.message || "Unauthorized" });
    }
  }

  async refresh(req: Request, res: Response) {
    try {
      const refreshToken = req.cookies["refreshToken"];
      const tokens = await companyAuthServices.refreshTokens(refreshToken);
      res.status(200).json(tokens);
    } catch (error: any) {
      res
        .status(500)
        .json({ message: error.message || "Internal server error" });
    }
  }
}

export default new CompanyAuthController();

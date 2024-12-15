import jwt from "jsonwebtoken";

class JwtUtils {
  private accessSecret: string;
  private refreshSecret: string;

  constructor() {
    if (!process.env.ACCESS_TOKEN_SECRET || !process.env.REFRESH_TOKEN_SECRET) {
      throw new Error(
        "JWT secrets are not defined in the environment variables"
      );
    }
    this.accessSecret = process.env.ACCESS_TOKEN_SECRET;
    this.refreshSecret = process.env.REFRESH_TOKEN_SECRET;
  }

  public generateAccessToken(payload: object): string {
    return jwt.sign(payload, this.accessSecret, { expiresIn: "15m" });
  }

  public generateRefreshToken(payload: object): string {
    return jwt.sign(payload, this.refreshSecret, { expiresIn: "7d" });
  }

  public verifyToken(
    token: string,
    type: "access" | "refresh"
  ): object | string {
    try {
      const secret = type === "access" ? this.accessSecret : this.refreshSecret;
      return jwt.verify(token, secret);
    } catch (error) {
      throw new Error("Invalid or expired token");
    }
  }

  public decodeToken(token: string) {
    return jwt.decode(token);
  }
}

export default new JwtUtils();

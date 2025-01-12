import bcrypt from "bcrypt";
import JwtUtils from "../utils/JWT";
import DB from "../db";
import { ICompanyDTO, ICompanyResponse } from "../models/company";

class CompanyAuthServices {
  async signup(
    companyData: ICompanyDTO
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const existingCompany = await DB<ICompanyResponse>("companies")
      .where({ email: companyData.email })
      .first();
    if (existingCompany) throw new Error("Company already exists.");

    const hashedPassword = await bcrypt.hash(companyData.password, 10);
    const [newCompany] = await DB<ICompanyResponse>("companies").insert(
      {
        ...companyData,
        password: hashedPassword,
      },
      ["company_id", "email"]
    );

    const accessToken = JwtUtils.generateAccessToken({
      companyId: newCompany.company_id,
    });
    const refreshToken = JwtUtils.generateRefreshToken({
      companyId: newCompany.company_id,
    });

    // Store the refresh token in the company_refresh_tokens table
    await DB("company_refresh_tokens").insert({
      company_id: newCompany.company_id,
      token: refreshToken,
    });

    return { accessToken, refreshToken };
  }

  async login(
    email: string,
    password: string
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const company = await DB<ICompanyResponse>("companies")
      .where({ email })
      .first();
    if (!company || !(await bcrypt.compare(password, company.password))) {
      throw new Error("Invalid credentials.");
    }

    const accessToken = JwtUtils.generateAccessToken({
      companyId: company.company_id,
    });
    const refreshToken = JwtUtils.generateRefreshToken({
      companyId: company.company_id,
    });

    // Store the refresh token in the company_refresh_tokens table
    await DB("company_refresh_tokens").insert({
      company_id: company.company_id,
      token: refreshToken,
    });

    return { accessToken, refreshToken };
  }

  async logout(refreshToken: string): Promise<void> {
    await DB("company_refresh_tokens").where({ token: refreshToken }).del();
  }

  async isAuthorized(
    accessToken: string | undefined,
    refreshToken: string | null
  ): Promise<ICompanyResponse | null> {
    try {
      if (!accessToken) throw new Error("No access token");
      const payload = JwtUtils.verifyToken(accessToken, "access") as {
        companyId: string;
      };
      const company = await DB<ICompanyResponse>("companies")
        .where({ company_id: payload.companyId })
        .first();
      if (!company) throw new Error("No company found");

      return company;
    } catch {
      if (refreshToken) {
        const payload = JwtUtils.verifyToken(refreshToken, "refresh") as {
          companyId: string;
        };
        const newAccessToken = JwtUtils.generateAccessToken({
          companyId: payload.companyId,
        });
        const company = await DB<ICompanyResponse>("companies")
          .where({ company_id: payload.companyId })
          .first();
        return { ...company, accessToken: newAccessToken } as ICompanyResponse;
      }
      return null;
    }
  }

  async refreshTokens(
    refreshToken: string
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const payload = JwtUtils.verifyToken(refreshToken, "refresh") as {
      companyId: string;
    };
    const newAccessToken = JwtUtils.generateAccessToken({
      companyId: payload.companyId,
    });
    const newRefreshToken = JwtUtils.generateRefreshToken({
      companyId: payload.companyId,
    });

    await DB("company_refresh_tokens")
      .where({ token: refreshToken })
      .update({ token: newRefreshToken });

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }
}

export default new CompanyAuthServices();

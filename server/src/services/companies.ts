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

    await DB("company_refresh_tokens").insert({
      company_id: company.company_id,
      token: refreshToken,
    });

    return { accessToken, refreshToken };
  }

  async logout(refreshToken: string): Promise<void> {
    await DB("company_refresh_tokens").where({ token: refreshToken }).del();
  }

  public async isAuthorized(
    accessToken: string,
    refreshToken: string | null
  ): Promise<(ICompanyResponse & { accessToken?: string }) | null> {
    try {
      let payload;
      try {
        payload = JwtUtils.verifyToken(accessToken, "access") as {
          companyId: string;
        };
      } catch (error) {
        if (refreshToken) {
          const refreshPayload = JwtUtils.verifyToken(
            refreshToken,
            "refresh"
          ) as {
            companyId: string;
          };

          if (refreshPayload) {
            const newAccessToken = JwtUtils.generateAccessToken({
              companyId: refreshPayload.companyId,
            });
            
            const company = await DB<ICompanyResponse>("companies")
              .where({ company_id: refreshPayload.companyId })
              .first();
            if (company) return { ...company, accessToken: newAccessToken };
          }
        }
        return null;
      }
      const company = await DB<ICompanyResponse>("companies")
        .where({ company_id: payload.companyId })
        .first();
      return company || null;
    } catch (error) {
      console.error("Authorization check failed:", error);
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

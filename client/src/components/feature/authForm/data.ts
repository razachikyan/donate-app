import {
  CompanySigninDTO,
  CompanySignupDTO,
} from "../../../models/dtos/CompaniesDTO";
import { SigninDTO } from "../../../models/dtos/SigninDTO";
import { SignupDTO } from "../../../models/dtos/SignupDTO";

type Signup = keyof (SignupDTO & { confirmPassword: string });
type Signin = keyof SigninDTO;

type CompanySignup = keyof (CompanySignupDTO & { confirmPassword: string });
type CompanySignin = keyof CompanySigninDTO;

export const userFields: { signup: Array<Signup>; signin: Array<Signin> } = {
  signup: [
    "firstName",
    "lastName",
    "email",
    "phone",
    "password",
    "confirmPassword",
  ],
  signin: ["email", "password"],
};

export const companyFields: {
  signup: Array<CompanySignup>;
  signin: Array<CompanySignin>;
} = {
  signup: ["name", "email", "password", "confirmPassword"],
  signin: ["email", "password"],
};

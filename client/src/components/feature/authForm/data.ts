import { SigninDTO } from "../../../models/dtos/SigninDTO";
import { SignupDTO } from "../../../models/dtos/SignupDTO";

type Signup = keyof (SignupDTO & { confirmPassword: string });
type Signin = keyof SigninDTO;

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

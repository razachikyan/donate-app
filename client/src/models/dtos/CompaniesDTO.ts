import { BaseDTO } from "./BaseDTO";

export class CompanySignupDTO extends BaseDTO {
  constructor(
    public name: string,
    public password: string,
    public email: string,
  ) {
    super();
  }
}

export class CompanySigninDTO extends BaseDTO {
  constructor(
    public password: string,
    public email: string
  ) {
    super();
  }
}

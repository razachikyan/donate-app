import { BaseDTO } from "./BaseDTO";

export class SignupDTO extends BaseDTO {
  constructor(
    public firstName: string,
    public lastName: string,
    public password: string,
    public email: string,
    public type: string,
    public phone: string
  ) {
    super();
  }
}

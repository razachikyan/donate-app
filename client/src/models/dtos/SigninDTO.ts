import { BaseDTO } from "./BaseDTO";

export class SigninDTO extends BaseDTO {
  constructor(public email: string, public password: string) {
    super();
  }
}

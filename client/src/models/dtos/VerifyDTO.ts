import { BaseDTO } from "./BaseDTO";

export class VerifyDTO extends BaseDTO {
  constructor(public email: string, public oneTimeCode: string) {
    super();
  }
}

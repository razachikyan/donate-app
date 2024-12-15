import { IUserDTO } from "../models/user";

export class Validation {
  private validateUsername(username: string) {
    const reg = /^[\u0531-\u0587\u0561-\u0587\u055A\u055B'-]+$/u;
    return username.length >= 3 && reg.test(username);
  }

  private validateEmail(email: string) {
    return (
      email.length > 0 && email.match(/^[\w]+\.?[\w]+@[A-Za-z]+\.[A-Za-z]+$/)
    );
  }

  private validatePassword(password: string) {
    return password.length >= 10;
  }

  private validatePhone(phone: string) {
    const reg = /^(\+374)(\d{8})$/;
    return reg.test(phone);
  }

  private validateOneTimeCode(one_time_code: string) {
    return /^[0-9]{6}$/.test(one_time_code);
  }

  public validate({
    first_name,
    last_name,
    email,
    password_hash,
    phone,
    one_time_code,
  }: IUserDTO) {
    if (!this.validateUsername(first_name) || !this.validateUsername(last_name)) {
      throw new Error("Invalid username");
    }

    if (!this.validateEmail(email)) {
      throw new Error("Invalid email");
    }

    if (!this.validatePassword(password_hash)) {
      throw new Error("Invalid password");
    }

    if (!this.validatePhone(phone)) {
      throw new Error("Invalid phone number");
    }

    if (one_time_code && !this.validateOneTimeCode(one_time_code)) {
      throw new Error("Invalid one-time code");
    }
  }
}

import { IUserDTO } from "../models/user";

export class Validation {
  private validateUsername(username: string) {
    const reg = /^[A-Za-z0-9_-]+$/;
    return username.length >= 3 && reg.test(username);
  }

  private validateEmail(email: string) {
    return (
      email.length > 0 && email.match(/^[\w]+\.?[\w]+@[A-Za-z]+\.[A-Za-z]+$/)
    );
  }

  private validatePassword(password: string) {
    return password.length >= 6;
  }

  private validatePhone(phone: string) {
    const reg = /^(\+374)(\d{8})$/;
    return reg.test(phone);
  }

  private validateOneTimeCode(one_time_code: string) {
    return /^[0-9]{6}$/.test(one_time_code);
  }

  public validate({
    firstName,
    lastName,
    email,
    password,
    phone,
    one_time_code,
  }: IUserDTO) {
    if (!this.validateUsername(firstName) || !this.validateUsername(lastName)) {
      throw new Error("Invalid username");
    }

    if (!this.validateEmail(email)) {
      throw new Error("Invalid email");
    }

    if (!this.validatePassword(password)) {
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

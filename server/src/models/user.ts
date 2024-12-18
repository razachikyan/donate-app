export interface IUserDTO {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  is_active: boolean;
  one_time_code: string | null;
}

export interface IUserResponse {
  user_id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  is_active: boolean;
  one_time_code: string | null;
}

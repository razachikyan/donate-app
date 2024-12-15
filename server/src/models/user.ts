export interface IUserDTO {
  first_name: string;
  last_name: string;
  email: string;
  password_hash: string;
  phone: string;
  is_active: boolean;
}

export interface IUserResponse {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  password_hash: string;
  phone: string;
  is_active: boolean;
}
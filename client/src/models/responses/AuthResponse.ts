export interface AuthResponse {
  user_id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  is_active: boolean;
  type: 'user' | "company";
  one_time_code: string | null;
}

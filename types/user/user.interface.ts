import { User } from "./user.model";

export interface ISignUpLoginForm {
  name?: string;
  email: string;
  password: string;
}

export interface ISignUpLoginResponse {
  accessToken: string;
  data: User;
}

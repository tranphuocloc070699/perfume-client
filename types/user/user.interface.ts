import { UserDto } from "./user.model";

export interface ISignUpLoginForm {
  name?: string;
  email: string;
  password: string;
}

export interface ISignUpLoginResponse {
  accessToken: string;
  data: UserDto;
}

export interface ISidebarGroup {
  title: string;
  children: ISidebarList[];
}

export interface ISidebarList {
  title: string;
  iconUrl: string;
  link: string;
  type: "image" | "icon";
  danger?: boolean;
  children: ISidebarItem[];
}
export interface ISidebarItem {
  title: string;
  icon: string;
  link: string;
}

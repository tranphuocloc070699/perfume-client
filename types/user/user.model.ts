export type UserDto = {
  id: number;
  name: string;
  email: string;
  avatar: string;
  role: Role;
};

export type Role = "USER" | "ADMIN";

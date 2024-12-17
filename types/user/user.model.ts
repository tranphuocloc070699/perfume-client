export type UserDto = {
  id: number;
  name: string;
  email: string;
  avatar: string;
  role: "USER" | "ADMIN";
};

import { Media } from "../media/media.model";

export type User = {
  id: number;
  name: string;
  avatar: Media;
  role: "USER" | "ADMIN";
};

import { UserDto } from "../user/user.model";

export type CommentDto = {
  id: number;
  content: string;
  user: UserDto;
  createdAt: string;
  updatedAt: string;
};

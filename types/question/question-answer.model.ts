import { UserDto } from "@/types/user/user.model";
import { CommentDto } from "@/types/comment/comment.model";

export interface QuestionDto {
  id?: number;
  title: string;
  description: string;
  user?: UserDto;
  answers?: AnswerDto[];
  createdAt: string;
  updatedAt: string;
}


export interface AnswerDto {
  id?: number;
  content: string[];
  comments?: CommentDto[];
  votes: number[];

}

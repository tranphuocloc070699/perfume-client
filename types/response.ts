export type ResponseDto<T> = {
  status: number;
  data: T;
  errors: string[];
  message: string;
};

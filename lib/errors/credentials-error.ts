import { CredentialsSignin } from "@auth/core/errors"; // import is specific to your framework

export class EmailNotFoundError extends CredentialsSignin {
  code = "Tài khoản không tồn tại";
}

export class EmailOrPasswordIncorrect extends CredentialsSignin {
  code = "Tài khoản hoặc mật khẩu không chính xác";
}

export class EmailAlreadyExists extends CredentialsSignin {
  code = "Tài khoản đã tồn tại";
}

export class FetchError extends CredentialsSignin {
  code = "Không thể kết nối đến máy chủ, vui lòng kiểm tra lại đường truyền hoặc thử lại sau";
}

export class UnknownError extends CredentialsSignin {
  code = "Lỗi không xác định";
}


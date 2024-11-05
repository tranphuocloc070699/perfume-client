import type { ResponseDto } from "@/types/response";
import HttpFactory from "../factory";
import {
  ISignUpLoginForm,
  ISignUpLoginResponse
} from "@/types/user/user.interface";

class UserService extends HttpFactory {
  async signup(requestData: ISignUpLoginForm) {
    return this.call<ResponseDto<ISignUpLoginResponse>>({
      method: "POST",
      url: `/api/user/signup`,
      body: requestData
    });
  }

  async login(requestData: ISignUpLoginForm) {
    return this.call<ResponseDto<ISignUpLoginResponse>>({
      method: "POST",
      url: `/api/user/login`,
      body: requestData
    });
  }

  async authenticate() {
    return this.call<ResponseDto<ISignUpLoginResponse>>({
      method: "GET",
      url: `/api/user`
    });
  }

  async logout() {
    return this.call<ResponseDto<ISignUpLoginResponse>>({
      method: "PUT",
      url: `/api/user/log-out`
    });
  }


}

export default UserService;

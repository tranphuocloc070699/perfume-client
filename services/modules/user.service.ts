import type { ResponseDto } from "@/types/response";
import HttpFactory from "../factory";
import {
  ISignUpLoginForm,
  ISignUpLoginResponse
} from "@/types/user/user.interface";
import { getClientOrServerUrl } from "@/lib/utils";

class UserService extends HttpFactory {
  readonly PREFIX: string = "/user";

  async signup(requestData: ISignUpLoginForm) {
    return this.call<ResponseDto<ISignUpLoginResponse>>({
      method: "POST",
      url: `${getClientOrServerUrl()}${this.PREFIX}/signup`,
      body: requestData
    });
  }

  async login(requestData: ISignUpLoginForm) {
    return this.call<ResponseDto<ISignUpLoginResponse>>({
      method: "POST",
      url: `${getClientOrServerUrl()}${this.PREFIX}/login`,
      body: requestData
    });
  }

  async authenticate(cookie?: string) {
    return this.call<ResponseDto<ISignUpLoginResponse>>({
      method: "GET",
      url: `${getClientOrServerUrl()}${this.PREFIX}`,
      fetchOptions: {
        headers: {
          ...(cookie ? { Cookie: cookie } : {})
        }
      }
    });
  }

  async logout() {
    return this.call<ResponseDto<ISignUpLoginResponse>>({
      method: "PUT",
      url: `${getClientOrServerUrl()}${this.PREFIX}/log-out`
    });
  }


}

export default UserService;

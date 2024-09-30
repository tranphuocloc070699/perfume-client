import type { ResponseDto } from "@/types/response";
import HttpFactory from "../factory";
import { User } from "@/types/user/user.model";
import { ISignUpLoginForm } from "@/types/user/user.interface";

class UserService extends HttpFactory {
  async signup(requestData: ISignUpLoginForm) {
    console.log({ requestData });
    return this.call<ResponseDto<User>>({
      method: "POST",
      url: `/api/user/signup`,
      body: requestData,
    });
  }
}

export default UserService;

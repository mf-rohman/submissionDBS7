import { register } from "../../data/api";

export default class RegisterModel {
  async userRegister(userData) {
    return await register(userData);
    if (response.result && response.result.error) {
      throw new Error(response.result.message);
    }

    return response;
  }
}

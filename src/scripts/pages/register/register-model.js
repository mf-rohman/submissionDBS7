import { register } from "../../data/api";

export default class RegisterModel {
  async userRegister(userData) {
    return await register(userData);
  }
}

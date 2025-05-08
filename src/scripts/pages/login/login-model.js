import { login } from "../../data/api";
export default class LoginModel {
    async loginAPI(credentials) {
        return await login(credentials);
    }
}
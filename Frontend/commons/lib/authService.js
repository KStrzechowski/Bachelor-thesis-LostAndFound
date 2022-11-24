import { ApiLoginResponse } from "./types/apiLogin";
import { ApiRegisterResponse } from "./types/apiRegister";
export function AccountLogin(request) {
    console.log("login");
    console.log(request);
    return new ApiLoginResponse();
}
export function AccountRegister(request) {
    console.log("register");
    console.log(request);
    return new ApiRegisterResponse();
}

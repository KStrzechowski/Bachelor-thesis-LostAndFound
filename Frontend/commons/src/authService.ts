import { ApiLoginRequest, ApiLoginResponse } from "./types/apiLogin";
import { ApiRegisterRequest, ApiRegisterResponse } from "./types/apiRegister";

export function AccountLogin(request: ApiLoginRequest) {
	console.log("login");
	console.log(request);
	return new ApiLoginResponse();
}
export function AccountRegister(request: ApiRegisterRequest) {
	console.log("register");
	console.log(request);
	return new ApiRegisterResponse();
}
export class ApiLoginRequest {
	email: string = "";
	password: string = "";
}

export class ApiLoginResponse {
	accessToken: string = "";
	accessTokenExpirationTime: Date = new Date();
	refreshToken: string = "";
}

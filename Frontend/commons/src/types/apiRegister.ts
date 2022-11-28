export class ApiRegisterRequest {
	email: string = "";
	username: string = "";
	password: string = "";
	confirmPassword: string = "";
}

export class ApiRegisterResponse {
	userIdentifier: string = "";
	email: string = "";
	username: string = "";
}

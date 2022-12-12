export interface RegisterRequestType {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
}
export interface RegisterResponseType {
    userIdentifier: string;
    email: string;
    username: string;
}

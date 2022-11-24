import { AccountLogin, ApiLoginRequest } from "commons";
import { useContext } from "react";
import { Link, Navigate, useFetcher } from "react-router-dom";
import { userContext, UsrCont } from "userContext";

export default function Login() {
	const usrCtx = useContext(userContext);

	function onLogin() {
		var response = AccountLogin(new ApiLoginRequest());
		usrCtx.setUser({
			isLogged: true,
			authToken: response.accessToken,
		} as UsrCont);
	}
	if (usrCtx.user.isLogged)
		return (
			<div>
				Już jesteś zalogowany. Przenoszenie...
				<Navigate to={"/profile"} />
			</div>
		);
	return (
		<div className="d-flex justify-content-evenly align-items-center h-75">
			<div
				className="bg-light border border-dark rounded-5 shadow p-3 pb-0 "
				style={{
					width: "15%",
					minWidth: "500px",
				}}
			>
				<p className="h3">Logowanie</p>
				<div className="m-3">
					<div className="form-label text-start">e-mail:</div>
					<input type="text" className="form-control"></input>
				</div>
				<div className="m-3">
					<div className="form-label text-start">hasło:</div>
					<input type="text" className="form-control"></input>
				</div>
				<div
					className="btn btn-primary rounded-5"
					onClick={() => onLogin()}
				>
					Zaloguj
				</div>
				<p className="mt-3">
					Nie masz konta?{" "}
					<Link className="" to={"/register"}>
						Zarejestruj się
					</Link>
				</p>
			</div>
			<div className="w-25 fs-5">
				<div className="m-2">Masz już konto?</div>
				Dobrze cię znowu widzieć! Mamy nadzieję, że zostaniesz z nami na
				dłużej.
			</div>
		</div>
	);
}

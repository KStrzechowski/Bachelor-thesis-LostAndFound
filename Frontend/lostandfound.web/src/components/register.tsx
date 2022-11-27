import { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { userContext } from "userContext";

export default function Register() {
	const usrCtx = useContext(userContext);
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
				className="bg-light border border-dark rounded-5 shadow p-3 pb-0"
				style={{
					width: "15%",
					minWidth: "500px",
				}}
			>
				<p className="h3">Rejestracja</p>
				<div className="m-3">
					<div className="form-label text-start">
						nazwa użytkownika:
					</div>
					<input type="text" className="form-control"></input>
				</div>
				<div className="m-3">
					<div className="form-label text-start">e-mail:</div>
					<input type="text" className="form-control"></input>
				</div>
				<div className="m-3">
					<div className="form-label text-start">hasło:</div>
					<input type="text" className="form-control"></input>
				</div>
				<div className="m-3">
					<div className="form-label text-start">powtórz hasło:</div>
					<input type="text" className="form-control"></input>
				</div>
				<div className="btn btn-primary rounded-5">Zarejestruj</div>
				<p className="mt-3">
					Masz już konto? <Link to={"/login"}>Zaloguj się</Link>
				</p>
			</div>
			<div className="w-25 fs-5">
				<div className="m-2">
					Chcesz dołączyć do grona użytkowników?
				</div>
				Dziekujemy za zaufanie i mamy nadzieję, że znajdziesz to czego
				szukasz!
			</div>
		</div>
	);
}

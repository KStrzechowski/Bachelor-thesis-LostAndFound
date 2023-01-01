import { useState } from "react";
import { Link } from "react-router-dom";
import { register, RegisterRequestType } from "commons";

export default function Register() {
	const [user, setUser] = useState({
		name: "",
		email: "",
		pwd: "",
		pwd2: "",
	});

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUser({
			...user,
			[event.target.name]: event.target.value,
		});
	};

	function handleregister() {
		if (user.pwd === user.pwd2) {
			let req: RegisterRequestType = {
				email: user.email,
				password: user.pwd,
				confirmPassword: user.pwd2,
				username: user.name,
			};
			register(req).then((x) => console.log(x));
		}
	}

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
					<input
						name="name"
						type="text"
						className="form-control"
						value={user.name}
						placeholder="nazwa"
						onChange={(e) => handleChange(e)}
					></input>
				</div>
				<div className="m-3">
					<div className="form-label text-start">e-mail:</div>
					<input
						name="email"
						type="text"
						className="form-control"
						value={user.email}
						placeholder="e-mail"
						onChange={(e) => handleChange(e)}
					></input>
				</div>
				<div className="m-3">
					<div className="form-label text-start">hasło:</div>
					<input
						name="pwd"
						type="password"
						className="form-control"
						value={user.pwd}
						placeholder="hasło"
						onChange={(e) => handleChange(e)}
					></input>
				</div>
				<div className="m-3">
					<div className="form-label text-start">powtórz hasło:</div>
					<input
						name="pwd2"
						type="password"
						className="form-control"
						value={user.pwd2}
						placeholder="powtórz hasło"
						onChange={(e) => handleChange(e)}
					></input>
				</div>
				<div
					className="btn btn-primary rounded-5"
					onClick={() => handleregister()}
				>
					Zarejestruj
				</div>
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

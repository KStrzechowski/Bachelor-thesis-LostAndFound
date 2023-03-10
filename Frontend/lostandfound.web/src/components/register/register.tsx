import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register, RegisterRequestType } from "commons";

export default function Register() {
	const [user, setUser] = useState({
		name: "",
		email: "",
		pwd: "",
		pwd2: "",
	});
	const [val, setVal] = useState([] as valErrors[]);
	const [msgu, setMsgu] = useState("");
	const [msge, setMsge] = useState("");

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUser({
			...user,
			[event.target.name]: event.target.value,
		});
	};

	const nav = useNavigate();

	function onValidate() {
		var nerr = [] as valErrors[];
		const mailexp: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
		if (user.name.length < 8) nerr.push(valErrors.name);
		if (!mailexp.test(user.email)) nerr.push(valErrors.mail);
		if (user.pwd.length < 8) nerr.push(valErrors.pass1);
		if (user.pwd !== user.pwd2) nerr.push(valErrors.pass2);
		setVal(nerr);
		if (val.length > 0) return false;
		return true;
	}

	function handleregister() {
		if (onValidate()) {
			let req: RegisterRequestType = {
				email: user.email,
				password: user.pwd,
				confirmPassword: user.pwd2,
				username: user.name,
			};
			register(req).then((x) => {
				let newMsgu = "";

				if (x.errors?.Username) {
					x.errors?.Username.forEach((y: string) => {
						newMsgu = newMsgu.concat(y).concat("\n");
					});
				}
				setMsgu(newMsgu);
				let newMsge = "";
				if (x.errors?.Email) {
					x.errors?.Email.forEach(
						(y: string) =>
							(newMsge = newMsge.concat(y).concat("\n"))
					);
				}
				setMsge(newMsge);

				if (!x.errors && newMsge.length < 1 && newMsgu.length < 1)
					nav("/login");
			});
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
						nazwa u??ytkownika:
					</div>
					<input
						name="name"
						type="text"
						className="form-control"
						value={user.name}
						placeholder="nazwa"
						onChange={(e) => handleChange(e)}
					></input>
					{val.includes(valErrors.name) && (
						<div className="ms-1 text-danger text-start">
							nazwa u??ytkownika musi zawiera?? conajmniej 8 znak??w
						</div>
					)}
					{msgu.length > 0 && (
						<div className="ms-1 text-danger text-start">
							{msgu}
						</div>
					)}
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
					{val.includes(valErrors.mail) && (
						<div className="ms-1 text-danger text-start">
							e-mail musi by?? poprawny
						</div>
					)}
					{msge.length > 0 && (
						<div className="ms-1 text-danger text-start">
							{msge}
						</div>
					)}
				</div>

				<div className="m-3">
					<div className="form-label text-start">has??o:</div>
					<input
						name="pwd"
						type="password"
						className="form-control"
						value={user.pwd}
						placeholder="has??o"
						onChange={(e) => handleChange(e)}
					></input>
					{val.includes(valErrors.pass1) && (
						<div className="ms-1 text-danger text-start">
							has??o musi zawiera?? conajmniej 8 znak??w
						</div>
					)}
				</div>

				<div className="m-3">
					<div className="form-label text-start">powt??rz has??o:</div>
					<input
						name="pwd2"
						type="password"
						className="form-control"
						value={user.pwd2}
						placeholder="powt??rz has??o"
						onChange={(e) => handleChange(e)}
					></input>
					{val.includes(valErrors.pass2) && (
						<div className="ms-1 text-danger text-start">
							has??a musz?? by?? takie same
						</div>
					)}
				</div>

				<div
					className="btn btn-primary rounded-5"
					onClick={() => handleregister()}
				>
					Zarejestruj
				</div>
				<p className="mt-3">
					Masz ju?? konto? <Link to={"/login"}>Zaloguj si??</Link>
				</p>
			</div>
			<div className="w-25 fs-5">
				<div className="m-2">
					Chcesz do????czy?? do grona u??ytkownik??w?
				</div>
				Dziekujemy za zaufanie i mamy nadziej??, ??e znajdziesz to czego
				szukasz!
			</div>
		</div>
	);
}
enum valErrors {
	name,
	mail,
	pass1,
	pass2,
}

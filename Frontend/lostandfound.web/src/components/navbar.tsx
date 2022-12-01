import { useContext } from "react";
import { Link } from "react-router-dom";
import { userContext, UsrCont } from "userContext";
import logo from "../logo.png";

export default function Navbar() {
	const userCtx = useContext(userContext);

	function Logout() {
		userCtx.setUser(new UsrCont());
	}

	return (
		<nav className="navbar navbar-expand-lg bg-light border-bottom border-dark mb-2 shadow-sm">
			<div className="container-fluid">
				<Link className="navbar-brand" to={"/"}>
					<img
						style={{ height: "40px" }}
						className="img-fluid"
						src={logo}
					/>
				</Link>

				{userCtx.user.isLogged === false && (
					<div className="me-3">
						<Link
							className="btn btn-primary rounded-5"
							to={"/login"}
						>
							Zaloguj
						</Link>
					</div>
				)}
				{userCtx.user.isLogged && (
					<div className="me-3 conatiner-fluid">
						<Link
							className="btn btn-primary rounded-5 me-3"
							to={"/profile"}
						>
							Profil
						</Link>
						<button
							className="btn btn-outline-primary rounded-5 "
							onClick={() => Logout()}
						>
							Wyloguj
						</button>
					</div>
				)}
			</div>
		</nav>
	);
}
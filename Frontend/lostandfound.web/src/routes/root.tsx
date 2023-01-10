import { refreshToken } from "commons";
import Navbar from "components/navbar";
import Relog from "components/register/relog";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { userContext, UsrCont } from "userContext";

export default function Root() {
	const [user, setUser] = useState(new UsrCont());
	const [loading, setIsLoading] = useState(true);

	useEffect(() => {
		var token = localStorage.getItem("accessToken");
		var reftoken = localStorage.getItem("refreshToken");
		var date = localStorage.getItem("expiration");

		if (token)
			setUser({
				authToken: token,
				isLogged: token && reftoken ? true : false,
				refreshToken: reftoken,
				expirationDate: date ? new Date(date) : null,
			});
		setIsLoading(false);
	}, []);

	useEffect(() => {
		if (user.authToken !== null)
			localStorage.setItem("accessToken", user.authToken);
		else {
			localStorage.removeItem("accessToken");
		}
		if (user.refreshToken !== null)
			localStorage.setItem("refreshToken", user.refreshToken);
		else {
			localStorage.removeItem("refreshToken");
		}
		if (user.expirationDate !== null)
			localStorage.setItem(
				"expiration",
				user.expirationDate.toISOString()
			);
		else {
			localStorage.removeItem("expiration");
		}
	}, [user]);

	useEffect(() => {
		if (user.refreshToken) {
			if (
				!user.isLogged ||
				(user.expirationDate?.getTime() ?? Number.MIN_SAFE_INTEGER) <
					Date.now()
			)
				refreshToken(user.refreshToken).then((x) => {
					if (x)
						setUser({
							authToken: x?.accessToken,
							expirationDate: x?.accessTokenExpirationTime,
							isLogged: true,
							refreshToken: x.refreshToken,
						});
					else {
						setUser({
							authToken: null,
							expirationDate: null,
							isLogged: false,
							refreshToken: null,
						});
					}
				});
		}
	}, [user]);

	if (loading === true) return <div>...</div>;

	return (
		<userContext.Provider
			value={{ user: user, setUser: (arg: UsrCont) => setUser(arg) }}
		>
			<Navbar></Navbar>
			<Outlet></Outlet>
		</userContext.Provider>
	);
}

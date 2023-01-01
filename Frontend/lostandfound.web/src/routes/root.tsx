import Navbar from "components/navbar";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { userContext, UsrCont } from "userContext";

export default function Root() {
	const [user, setUser] = useState(new UsrCont());
	const [loading, setIsLoading] = useState(true);

	useEffect(() => {
		var token = localStorage.getItem("accessToken");
		if (token !== null) setUser({ authToken: token, isLogged: true });
		setIsLoading(false);
	}, []);

	useEffect(() => {
		if (user.authToken !== null)
			localStorage.setItem("accessToken", user.authToken);
		else {
			localStorage.removeItem("accessToken");
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

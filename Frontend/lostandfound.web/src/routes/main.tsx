import Landing from "components/landing";
import Login from "components/login";
import Profile from "components/profile";
import Register from "components/register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Root from "./root";

export default function MainRouter() {
	return (
		<Routes>
			<Route path="" element={<Root></Root>}>
				<Route path="login" element={<Login />} />
				<Route path="register" element={<Register />} />
				<Route path="profile" element={<Profile />}></Route>
				<Route path="" element={<Landing></Landing>}></Route>
			</Route>
		</Routes>
	);
}

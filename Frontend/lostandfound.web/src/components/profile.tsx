import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserProfile } from "types/profile";
import { userContext } from "userContext";

export default function Profile() {
	const profile = new UserProfile();
	const usrCtx = useContext(userContext);
	if (usrCtx.user.isLogged === false) return <Navigate to="/" />;
	return (
		<div className="w-50 border border-1 border-dark m-auto rounded-4 bg-light p-3 container shadow-lg">
			<div className="row">
				<img
					className="img-fluid"
					style={{ width: "350px" }}
					src={profile.profileUrl}
				></img>
				<div className="col text-start p-2">
					<div className="h1 d-flex">
						<h1>{profile.username}</h1>
						<h3 className="align-self-center ms-auto me-4">
							{profile.averageProfileRating}
						</h3>
					</div>
					<div className="p-2">
						{profile.name} {profile.surname}
					</div>
					<span className="p-2">{profile.city}</span>
					<div className="p-2">{profile.description}</div>
				</div>
			</div>
		</div>
	);
}

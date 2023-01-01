import { editProfile, getProfile } from "commons";
import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { userContext } from "userContext";
import { UserProfile } from "./profile";

export default function ProfileEdit() {
	const usrCtx = useContext(userContext);

	const [prof, setProf] = useState(undefined as UserProfile | undefined);
	const [svd, setSvd] = useState(false);

	useEffect(() => {
		if (usrCtx.user.authToken !== null)
			getProfile(usrCtx.user.authToken).then((x) => {
				if (x !== undefined) {
					setProf({
						uId: x.userId,
						username: x.username,
						name: x.name,
						surname: x.surname,
						email: x.email,
						description: x.description,
						city: x.city,
						averageProfileRating: x.averageProfileRating,
						pictureUrl: x.pictureUrl,
						me: true,
					});
				} else {
					usrCtx.setUser({ authToken: "", isLogged: false });
				}
			});
	}, []);

	function handeSave() {
		if (usrCtx.user.authToken !== null)
			editProfile(
				{
					name: prof?.name,
					surname: prof?.surname,
					city: prof?.city,
					description: prof?.description,
				},
				usrCtx.user.authToken
			).then((x) => setSvd(true));
	}

	if (svd === true) return <Navigate to="/profile"></Navigate>;
	if (prof === undefined) return <div>...</div>;
	return (
		<ProfileEditInner
			profile={prof}
			setProfile={setProf}
			handleSave={() => handeSave()}
		/>
	);
}

export function ProfileEditInner({
	profile,
	setProfile,
	handleSave,
}: {
	profile: UserProfile;
	setProfile: (x: UserProfile) => void;
	handleSave: () => void;
}) {
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setProfile({
			...profile,
			[event.target.name]: event.target.value,
		});
	};
	const handleChangeArea = (
		event: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		setProfile({
			...profile,
			[event.target.name]: event.target.value,
		});
	};

	return (
		<div
			data-testid="profileInner"
			className="w-50 border border-1 border-dark m-auto rounded-4 bg-light p-3 container shadow-lg text-end"
		>
			<div className="text-start h2 ms-5 ">
				Edycja:{" "}
				<div className="d-inline ms-3 h4">{profile.username}</div>
			</div>
			<div className="p-3 w-75 ">
				<span className="form-label  me-3 ">Imię:</span>
				<input
					className="w-75"
					name="name"
					type="text"
					placeholder="Imię"
					value={profile.name}
					onChange={(e) => handleChange(e)}
				/>
			</div>
			<div className="p-3 w-75">
				<span className="form-label me-3 ">Nazwisko:</span>

				<input
					className="w-75"
					name="surname"
					type="text"
					placeholder="Nazwisko"
					value={profile.surname}
					onChange={(e) => handleChange(e)}
				/>
			</div>
			<div className="p-3 w-75">
				<span className="form-label me-3">Miasto:</span>

				<input
					className="w-75"
					name="city"
					type="text"
					placeholder="Miasto"
					value={profile.city}
					onChange={(e) => handleChange(e)}
				/>
			</div>
			<div className="p-3 w-75">
				<span className="form-label me-3 align-top">Opis:</span>

				<textarea
					rows={5}
					className="w-75"
					name="description"
					value={profile.description}
					placeholder="Opis"
					onChange={(e) => handleChangeArea(e)}
				></textarea>
			</div>
			<button
				className="btn btn-primary m-auto text-center"
				onClick={() => handleSave()}
			>
				Zapisz
			</button>
		</div>
	);
}

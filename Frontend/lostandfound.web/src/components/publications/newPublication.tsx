import { addPublication, CategoryType, getCategories, PublicationState, PublicationType } from "commons";
import { useContext, useEffect, useState } from "react";
import { userContext } from "userContext";
import { Publication } from "./publicationsList";

export function NewPublication() {
	const [exp, setExp] = useState(false);
	if (exp)
		return (
			<>
				<button
					className="btn btn-primary px-5"
					onClick={() => setExp(!exp)}
				>
					-
				</button>

				<NewPublicationInner></NewPublicationInner>
			</>
		);
	return (
		<button className="btn btn-primary px-5" onClick={() => setExp(!exp)}>
			+
		</button>
	);
}
export function NewPublicationInner() {
	const usrCtx = useContext(userContext);
	const [pub, setPub] = useState(new Publication());
	const [cats, setCats] = useState([] as CategoryType[]);
	useEffect(() => {
		if (usrCtx.user.authToken !== null)
			getCategories(usrCtx.user.authToken).then((x) => {
				setCats(x);
			});
	}, [usrCtx]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPub({
			...pub,
			[event.target.name]: event.target.value,
		});
	};

	const handleChangeArea = (
		event: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		setPub({
			...pub,
			[event.target.name]: event.target.value,
		});
	};

	function add() {
		console.log(pub.incidentDate);
		addPublication(
			{
				incidentDate: new Date(pub.incidentDate),
				publicationType: pub.lostorfnd
					? PublicationType.LostSubject
					: PublicationType.FoundSubject,
				description: pub.description,
				incidentAddress: pub.incidentAddress,
				publicationState: PublicationState.Open,
				title: pub.title,
				subjectCategoryId: pub.cat,
			},
			usrCtx.user.authToken ?? ""
		);
	}

	return (
		<div className="mt-4 p-3 w-25 m-auto border border-dark rounded-4 bg-light text-start">
			<div className="text-left p-2 h5">Tworzenie nowego ogłoszenia:</div>

			<div className="text-end">
				<div className="btn-group w-75 d-block">
					<button
						className={
							"btn text-dark " +
							(pub.lostorfnd === true
								? "btn-primary"
								: "btn-outline-primary ")
						}
						onClick={() => setPub({ ...pub, lostorfnd: true })}
					>
						Znalezione
					</button>
					<button
						className={
							"btn text-dark " +
							(pub.lostorfnd === false
								? "btn-primary"
								: "btn-outline-primary ")
						}
						onClick={() => setPub({ ...pub, lostorfnd: false })}
					>
						Zgubione
					</button>
				</div>
				<div className="p-1 w-100 ">
					<span className="form-label  me-3 ">Tytuł:</span>
					<input
						className="w-75 form-control d-inline"
						name="title"
						type="text"
						placeholder="Tytuł"
						onChange={(e) => handleChange(e)}
					/>
				</div>
				<div className="p-1 w-100 ">
					<span className="form-label  me-3 align-top">Opis:</span>
					<textarea
						rows={5}
						className="w-75 form-control d-inline"
						name="description"
						placeholder="Opis"
						onChange={(e) => handleChangeArea(e)}
					></textarea>
				</div>
				<div className="p-1 w-100 ">
					<span className="form-label  me-3 ">Miejsce:</span>
					<input
						className="form-control w-75 d-inline"
						name="incidentAddress"
						type="text"
						placeholder="Miejsce"
						onChange={(e) => handleChange(e)}
					/>
				</div>
				<div className="p-1 w-100 ">
					<span className="form-label  me-3 ">Data:</span>
					<input
						className="w-75 form-control d-inline"
						name="incidentDate"
						type="date"
						placeholder="Data"
						onChange={(e) => {
							handleChange(e);
						}}
					/>
				</div>
				<div className="p-1 w-100 ">
					<span className="form-label  me-3 ">Kategoria:</span>
					<select
						className="form-select w-75 d-inline"
						onChange={(e) => {
							setPub({ ...pub, cat: e.target.value });
						}}
					>
						<option selected value="none"></option>
						{cats.map((x, i) => (
							<option key={i} value={x.id}>
								{x.displayName}
							</option>
						))}
					</select>
				</div>
				<button className="btn btn-primary mt-3" onClick={() => add()}>
					Utwórz
				</button>
			</div>
		</div>
	);
}

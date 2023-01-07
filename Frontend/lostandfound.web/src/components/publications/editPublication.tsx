import {
	addPublication,
	CategoryType,
	editPublication,
	getCategories,
	getPublication,
	PublicationResponseType,
	PublicationState,
	PublicationType,
} from "commons";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigate, useParams } from "react-router-dom";
import { userContext } from "userContext";
import { Publication } from "./publicationsList";

export function EditPublication() {
	const usrCtx = useContext(userContext);
	const nav = useNavigate();
	const { pubId } = useParams();
	const [pub, setPub] = useState(
		undefined as PublicationResponseType | undefined
	);
	function save() {
		if (pub)
			editPublication(
				pub?.publicationId ?? "",
				pub,
				usrCtx.user.authToken ?? ""
			).then((x) => nav("/posts/mine"));
	}
	useEffect(() => {
		if (pubId)
			getPublication(pubId, usrCtx.user.authToken ?? "").then((x) =>
				setPub(x)
			);
	}, [pubId]);
	if (!pub) return <div>...</div>;
	return (
		<EditPublicationInner
			pub={pub}
			setPub={(pub) => setPub(pub)}
			save={() => save()}
		/>
	);
}
export function EditPublicationInner({
	pub,
	setPub,
	save,
}: {
	pub: PublicationResponseType;
	setPub: (newPub: PublicationResponseType) => void;
	save: () => void;
}) {
	const usrCtx = useContext(userContext);
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
	const handleChangeDate = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPub({
			...pub,
			[event.target.name]: event.target.valueAsDate,
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

	return (
		<div className="mt-4 p-3 w-50 m-auto border border-dark rounded-4 bg-light text-start">
			<div className="text-left p-2 h5">
				Edycja ogłoszenia: <span>{pub.title}</span>
			</div>

			<div className="text-end">
				<div className="p-1 w-100 ">
					<span className="form-label  me-3 ">Typ ogłoszenia:</span>
					<div className="btn-group w-75">
						<button
							className={
								"btn text-dark " +
								(pub.publicationType ===
								PublicationType.LostSubject
									? "btn-primary"
									: "btn-outline-primary ")
							}
							onClick={() =>
								setPub({
									...pub,
									publicationType:
										PublicationType.LostSubject,
								})
							}
						>
							Znalezione
						</button>
						<button
							className={
								"btn text-dark " +
								(pub.publicationType ===
								PublicationType.FoundSubject
									? "btn-primary"
									: "btn-outline-primary ")
							}
							onClick={() =>
								setPub({
									...pub,
									publicationType:
										PublicationType.FoundSubject,
								})
							}
						>
							Zgubione
						</button>
					</div>
				</div>
				<div className="p-1 w-100 ">
					<span className="form-label  me-3 ">Tytuł:</span>
					<input
						className="w-75 form-control d-inline"
						name="title"
						type="text"
						value={pub.title}
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
						value={pub.description}
						placeholder="Opis"
						onChange={(e) => handleChangeArea(e)}
					></textarea>
				</div>
				<div className="p-1 w-100 ">
					<span className="form-label  me-3 ">Miejsce:</span>
					<input
						className="form-control w-75 d-inline"
						name="incidentAddress"
						value={pub.incidentAddress}
						type="text"
						placeholder="Miejsce"
						onChange={(e) => handleChange(e)}
					/>
				</div>
				<div className="p-1 w-100 ">
					<span className="form-label  me-3 ">Data:</span>
					<input
						value={pub.incidentDate.toISOString().substring(0, 10)}
						className="w-75 form-control d-inline"
						name="incidentDate"
						type="date"
						placeholder="Data"
						onChange={(e) => {
							handleChangeDate(e);
						}}
					/>
				</div>
				<div className="p-1 w-100 ">
					<span className="form-label  me-3 ">Kategoria:</span>
					<select
						value={pub.subjectCategoryId}
						className="form-select w-75 d-inline"
						onChange={(e) => {
							setPub({
								...pub,
								subjectCategoryId: e.target.value,
							});
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
				<div className="p-1 w-100 d-block">
					<span className="form-label  me-3 ">Stan:</span>
					<div className="btn-group w-75">
						<button
							className={
								"btn text-dark " +
								(pub.publicationState === PublicationState.Open
									? "btn-primary"
									: "btn-outline-primary ")
							}
							onClick={() =>
								setPub({
									...pub,
									publicationState: PublicationState.Open,
								})
							}
						>
							Otwarte
						</button>
						<button
							className={
								"btn text-dark " +
								(pub.publicationState ===
								PublicationState.Closed
									? "btn-danger"
									: "btn-outline-danger ")
							}
							onClick={() =>
								setPub({
									...pub,
									publicationState: PublicationState.Closed,
								})
							}
						>
							Zamknięte
						</button>
					</div>

					<button
						className="btn btn-primary mt-3 d-block"
						onClick={() => save()}
					>
						Zapisz
					</button>
				</div>
			</div>
		</div>
	);
}

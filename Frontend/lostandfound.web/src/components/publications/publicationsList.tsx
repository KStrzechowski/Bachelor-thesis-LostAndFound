import {
	CategoryType,
	editPublicationRating,
	getCategories,
	getPublicationsUndef,
	PublicationResponseType,
	PublicationSearchRequestType,
	PublicationSortType,
	SinglePublicationVote,
	UserType,
} from "commons";
import { useContext, useEffect, useState } from "react";
import { userContext } from "userContext";
import { NewPublication } from "./newPublication";
import Pagination from "../pagination";
import PublicationModal from "./publicationDetails";
import { Link, useParams } from "react-router-dom";
import { FiEdit } from "react-icons/fi";

export default function PublicationsList() {
	const usrCtx = useContext(userContext);
	const { pubId } = useParams();
	const [pub, setPub] = useState([] as Publication[]);

	const [page, setPage] = useState(1 as number);
	const [filter, setFilter] = useState(
		undefined as PublicationSearchRequestType | undefined
	);

	const [ldg, setLdg] = useState(true);

	const [details, setDetails] = useState(undefined as string | undefined);

	useEffect(() => {
		if (ldg) {
			setLdg(false);
			getPublicationsUndef(
				page,
				usrCtx.user.authToken ?? "",
				filter
			).then((x) => {
				console.log(x);
				if (x === undefined)
					usrCtx.setUser({ authToken: "", isLogged: false });
				else setPub(x.map((y) => new Publication(y)));
			});
		}
	}, [page, usrCtx.user, usrCtx, filter, ldg]);

	function like(pubId: string) {
		setPubVote(pubId, 1);
	}
	function dislike(pubId: string) {
		setPubVote(pubId, -1);
	}
	function setPubVote(pubId: string, newVote: number) {
		let pubs = [...pub];
		let p = pubs.find((x) => x.publicationIdentifier == pubId);
		if (p == undefined) return;
		if (p.userVote === newVote) {
			p.rating -= p.userVote;
			p.userVote = 0;
		} else {
			p.rating += newVote - p.userVote;
			p.userVote = newVote;
		}
		setPub(pubs);
		return editPublicationRating(
			pubId,
			p.userVote === 1
				? SinglePublicationVote.Up
				: p.userVote === 0
				? SinglePublicationVote.NoVote
				: SinglePublicationVote.Down,
			usrCtx.user.authToken ?? ""
		);
	}

	const [sort, setSort] = useState(
		undefined as PublicationSortType | undefined
	);

	return (
		<>
			{<PublicationModal pubId={details} />}
			<NewPublication refresh={() => setLdg(true)}></NewPublication>
			<SortForm setSort={(x) => setSort(x)} sort={sort} />
			<div className="container">
				<div className="w-25 float-start">
					<FiltersForm setFilter={(x) => setFilter(x)}></FiltersForm>
				</div>
				<div className=" m-auto w-50 ">
					{pub.map((x, i) => (
						<PublicationCom
							pub={x}
							key={i}
							like={() => like(x.publicationIdentifier)}
							dislike={() => dislike(x.publicationIdentifier)}
							select={(x: string) => setDetails(x)}
						/>
					))}
				</div>
			</div>
			<Pagination
				page={page}
				setPage={(p: number) => {
					setPage(p);
					setLdg(true);
				}}
				maxPages={15}
			/>
		</>
	);
}

export function PublicationCom({
	pub,
	like,
	dislike,
	select,
	edit,
}: {
	pub: Publication;
	like?: () => Promise<any> | void;
	dislike?: () => Promise<any> | void;
	select?: (pubId: string) => void;
	edit?: boolean;
}) {
	return (
		<div className="border border-dark bg-light shadow-lg m-3 p-3 pe-1 rounded-4 container row">
			<img
				className="img-fluid"
				style={{ width: "300px" }}
				src={pub.subjectPicture}
				data-bs-toggle="modal"
				data-bs-target="#staticBackdrop"
				onClick={() => {
					if (select) select(pub.publicationIdentifier);
				}}
			></img>
			<div
				className="col text-start p-2"
				data-bs-toggle="modal"
				data-bs-target="#staticBackdrop"
				onClick={() => {
					if (select) select(pub.publicationIdentifier);
				}}
			>
				<h4>
					{pub.title}{" "}
					{edit && (
						<Link
							className="text-black"
							to={`/posts/edit/${pub.publicationIdentifier}`}
						>
							<FiEdit size="20" />
						</Link>
					)}
				</h4>

				<span className="p-2 fst-italic">{pub.incidentAddress}</span>

				<div className="p-2"> {pub.description}</div>
			</div>

			<div className="col-1 text-center  p-0">
				{like !== undefined && (
					<button
						className={
							"btn p-1 " +
							(pub.userVote === 1 ? "bg-success" : "")
						}
						onClick={() => like()}
					>
						🖒
					</button>
				)}
				<div
					className={
						"text-center h5 m-1 " +
						(pub.rating > 0 ? "text-success" : "") +
						(pub.rating < 0 ? "text-danger" : "")
					}
				>
					{pub.rating}
				</div>
				{dislike !== undefined && (
					<h3
						className={
							"btn p-1 " +
							(pub.userVote === -1 ? "bg-danger" : "")
						}
						onClick={() => dislike()}
					>
						🖓
					</h3>
				)}
			</div>
		</div>
	);
}

function SortForm({
	sort,
	setSort,
}: {
	sort: PublicationSortType | undefined;
	setSort: (newSort: PublicationSortType | undefined) => void;
}) {
	return (
		<div>
			sortuj:{" "}
			<select>
				<option>a </option>
			</select>
		</div>
	);
}

function FiltersForm({
	setFilter,
}: {
	setFilter: (arg: PublicationSearchRequestType | undefined) => void;
}) {
	const usrCtx = useContext(userContext);
	const [cats, setCats] = useState([] as (CategoryType | undefined)[]);
	const [filt, setFiltLoc] = useState(
		undefined as PublicationSearchRequestType | undefined
	);
	useEffect(() => {
		if (usrCtx.user.authToken !== null)
			getCategories(usrCtx.user.authToken).then((x) => {
				setCats(x);
			});
	}, [usrCtx]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFiltLoc({
			...filt,
			[event.target.name]: event.target.value,
		});
	};

	function filter() {
		setFilter(filt);
		console.log(filt);
	}

	return (
		<div className="border border-dark rounded-5 ps-3 pe-3 p-1 bg-light">
			<div className="text-start pt-2 h5">Filtrowanie:</div>
			<div className="pt-2">
				<div className="form-label text-start">Tekst:</div>
				<input
					type="text"
					className="form-control"
					name="title"
					onChange={(e) => handleChange(e)}
				></input>
			</div>
			<div className="pt-2">
				<div className="form-label text-start">Lokalizacja:</div>
				<input
					type="text"
					className="form-control"
					name="incidentAddress"
					onChange={(e) => handleChange(e)}
				></input>
			</div>
			<div className="form-label text-start pt-2">Zakres dat:</div>
			<div className="pb-1 w-100 ">
				<span className="form-label  me-3 ">Od:</span>
				<input
					className="w-75 form-control d-inline"
					name="incidentFromDate"
					type="date"
					placeholder="Data"
					onChange={(e) => handleChange(e)}
				/>
			</div>
			<div className="pb-1 w-100 ">
				<span className="form-label  me-3 ">Do:</span>
				<input
					className="w-75 form-control d-inline"
					name="incidentToDate"
					type="date"
					placeholder="Data"
					onChange={(e) => handleChange(e)}
				/>
			</div>
			<div className="pt-2">
				<div className="form-label text-start">Kategoria:</div>
				<select
					className="form-select w-100"
					onChange={(e) =>
						setFiltLoc({
							...filt,
							subjectCategoryId: e.target.value,
						})
					}
				>
					<option selected></option>
					{cats.map((x, i) => (
						<option key={i} value={x?.id}>
							{x?.displayName}
						</option>
					))}
				</select>
			</div>
			<div>
				<button
					className="btn btn-primary rounded-5 mt-3"
					onClick={() => filter()}
				>
					Filtruj
				</button>
			</div>
		</div>
	);
}

export class Publication {
	constructor(pub?: PublicationResponseType) {
		this.publicationIdentifier = pub?.publicationId ?? "";
		this.cat = pub?.subjectCategoryId;
		this.description = pub?.description ?? "";
		this.title = pub?.title ?? "";
		this.incidentAddress = pub?.incidentAddress ?? "";
		this.rating = pub?.aggregateRating ?? 0;
		this.incidentDate = pub?.incidentDate ?? new Date();
		this.cat = pub?.subjectCategoryId;
		this.userVote =
			pub?.userVote === SinglePublicationVote.Up
				? 1
				: pub?.userVote === SinglePublicationVote.Down
				? -1
				: 0;
		this.user = pub?.author;
	}
	publicationIdentifier: string;
	title: string = "";
	description: string = "";
	subjectPicture: string = "https://picsum.photos/200";
	incidentAddress: string = "";
	incidentDate: Date = new Date();
	rating: number = 0;
	userVote: number = 0;
	lostorfnd: boolean | undefined;
	cat: string | undefined;
	user: UserType | undefined;
}

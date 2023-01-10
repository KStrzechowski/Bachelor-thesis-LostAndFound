import {
	deletePublication,
	getPublicationsUndef,
	PublicationSearchRequestType,
} from "commons";
import Pagination from "components/pagination";
import { useContext, useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { userContext } from "userContext";
import { Publication, PublicationCom } from "./publicationsList";

export default function MyPublications() {
	const usrCtx = useContext(userContext);
	const [pub, setPub] = useState([] as Publication[]);

	const [page, setPage] = useState(1 as number);
	const [filter, setFilter] = useState(
		undefined as PublicationSearchRequestType | undefined
	);
	const [ldg, setldg] = useState(true);

	useEffect(() => {
		if (ldg) {
			setldg(false);
			getPublicationsUndef(page, usrCtx.user.authToken ?? "", {
				onlyUserPublications: true,
			}).then((x) => {
				if (x === undefined)
					usrCtx.setUser({ ...usrCtx.user, isLogged: false });
				else setPub(x.map((y) => new Publication(y)));
			});
		}
	}, [page, usrCtx.user, usrCtx, filter, ldg]);

	function rem(pubId: string) {
		if (pubId)
			return deletePublication(pubId, usrCtx.user.authToken ?? "").then(
				(x) => setldg(true)
			);
		return Promise.resolve();
	}

	return (
		<>
			<div className="container">
				<div className=" m-auto w-75">
					{pub.map((x, i) => (
						<PublicationCom
							pub={x}
							key={i}
							like={undefined}
							dislike={undefined}
							edit={true}
							del={() => rem(x.publicationIdentifier)}
						/>
					))}
				</div>
			</div>
			<Pagination
				page={page}
				setPage={(p: number) => setPage(p)}
				maxPages={200}
			/>
		</>
	);
}

import { getPublicationsUndef, PublicationSearchRequestType } from "commons";
import Pagination from "components/pagination";
import { useContext, useEffect, useState } from "react";
import { userContext } from "userContext";
import { Publication, PublicationCom } from "./publicationsList";

export default function MyPublications() {
	const usrCtx = useContext(userContext);
	const [pub, setPub] = useState([] as Publication[]);

	const [page, setPage] = useState(1 as number);
	const [filter, setFilter] = useState(
		undefined as PublicationSearchRequestType | undefined
	);

	useEffect(() => {
		getPublicationsUndef(page, usrCtx.user.authToken ?? "", {
			onlyUserPublications: true,
		}).then((x) => {
			console.log(x);
			if (x === undefined)
				usrCtx.setUser({ authToken: "", isLogged: false });
			else setPub(x.map((y) => new Publication(y)));
		});
	}, [page, usrCtx.user, usrCtx, filter]);

	return (
		<>
			<div className="container">
				<div className=" m-auto w-50 ">
					{pub.map((x, i) => (
						<PublicationCom pub={x} key={i} like={undefined} dislike={undefined} />
					))}
				</div>
			</div>
			<Pagination
				page={page}
				setPage={(p: number) => setPage(p)}
				maxPages={15}
			/>
		</>
	);
}

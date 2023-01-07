import { getPublication, PublicationResponseType } from "commons";
import { useContext, useEffect, useState } from "react";
import { findDOMNode } from "react-dom";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "userContext";

export default function PublicationModal({ pubId }: { pubId?: string }) {
	const navigate = useNavigate();
	const [pubDet, setPubDet] = useState(
		undefined as PublicationResponseType | undefined
	);
	const usrCtx = useContext(userContext);
	useEffect(() => {
		if (pubId !== undefined)
			getPublication(pubId, usrCtx.user.authToken ?? "").then((x) =>
				setPubDet(x)
			);
	}, [pubId]);
	return (
		<>
			<div
				className="modal fade"
				id="staticBackdrop"
				data-bs-backdrop="static"
				data-bs-keyboard="false"
				tabIndex={-1}
				aria-labelledby="staticBackdropLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog">
					<div className="modal-content bg-light rounded-5 border-3 border-dark shadow-lg">
						<div className="modal-header">
							<h1
								className="modal-title fs-5"
								id="staticBackdropLabel"
							>
								{pubDet?.title}
							</h1>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
							></button>
						</div>
						<div className="modal-body">
							<img
								className="img-fluid"
								style={{ width: "300px" }}
								src={
									pubDet?.subjectPhotoUrl ??
									"https://xsgames.co/randomusers/avatar.php?g=pixel"
								}
							></img>
							<div className="col-1 text-center  p-0">
								<div
									className={
										"text-center h5 m-1 " +
										((pubDet?.aggregateRating ?? 0) > 0
											? "text-success"
											: "") +
										((pubDet?.aggregateRating ?? 0) < 0
											? "text-danger"
											: "")
									}
								>
									{pubDet?.aggregateRating ?? 0}
								</div>
							</div>

							<div className="col text-start p-2">
								<div
									onClick={() => {
										document
											?.getElementById("myModal")
											?.classList.remove(
												"show",
												"d-block"
											);
										document
											?.querySelectorAll(
												".modal-backdrop"
											)
											?.forEach((el) =>
												el.classList.remove(
													"modal-backdrop"
												)
											);
										navigate(
											`/profile/${pubDet?.author.id}`,
											{ replace: false }
										);
									}}
								>
									{pubDet?.author.username}
								</div>
								<div className="p-2 fst-italic">
									{pubDet?.incidentAddress}
								</div>

								<div className="p-2">{pubDet?.description}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

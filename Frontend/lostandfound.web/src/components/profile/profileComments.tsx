import {
	addProfileComment,
	deleteProfileComment,
	editProfileComment,
	getProfileComments,
	ProfileCommentResponseType,
} from "commons";
import { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { start } from "repl";
import { userContext } from "userContext";

export default function ProfileComments({
	profId,
	me,
}: {
	profId: string;
	me: boolean;
}) {
	const usrCtx = useContext(userContext);
	const [comments, setComments] = useState(
		[] as ProfileCommentResponseType[]
	);
	const [myCom, setMyCom] = useState(
		undefined as ProfileCommentResponseType | undefined
	);
	const [ldg, setLdg] = useState(true);

	useEffect(() => {
		if (ldg === true) {
			if (usrCtx.user.authToken != null)
				getProfileComments(profId, usrCtx.user.authToken).then((x) => {
					if (x?.comments !== undefined) {
						setComments(x?.comments);
					}
					setMyCom(x?.myComment);
					setLdg(false);
				});
		}
	}, [profId, ldg]);

	const addCom = () => {
		if (!me && myCom?.content === undefined)
			return (
				<>
					<h5 className="text-start">Mój komentarz:</h5>
					<CommentAdder
						userId={profId}
						initRating={0}
						initText=""
						accFunc={(text, rating) =>
							addProfileComment(
								profId,
								{ profileRating: rating, content: text },
								usrCtx.user.authToken ?? ""
							).then((x) => setLdg(true))
						}
						clsFunc={() => {}}
						edit={false}
					/>
				</>
			);
		else if (myCom?.content !== undefined) {
			return (
				<>
					<h5 className="text-start">Mój komentarz:</h5>
					<ProfileMyComment
						com={myCom}
						profId={profId}
						refresh={() => setLdg(true)}
					></ProfileMyComment>
				</>
			);
		} else return <></>;
	};

	return (
		<div className="m-3">
			{addCom()}
			{comments.length > 0 && <h5 className="text-start">Komentarze:</h5>}
			{comments.map((x) => (
				<ProfileComment com={x}></ProfileComment>
			))}
		</div>
	);
}

export function ProfileComment({ com }: { com: ProfileCommentResponseType }) {
	return (
		<div className="border border-1 border-dark rounded-4 p-1 px-4 text-start">
			{com.content}
		</div>
	);
}
export function ProfileMyComment({
	com,
	profId,
	refresh,
}: {
	com: ProfileCommentResponseType;
	profId: string;
	refresh: () => void;
}) {
	const [ed, setEd] = useState(false);
	const usrCtx = useContext(userContext);
	if (ed === true)
		return (
			<div className="border border-1 border-primary rounded-4 p-1 px-4 text-start">
				<CommentAdder
					userId={profId}
					initRating={com.profileRating}
					initText={com.content ?? ""}
					accFunc={(text: string, rating: number) =>
						editProfileComment(
							profId,
							{ profileRating: rating, content: text },
							usrCtx.user.authToken ?? ""
						).then((x) => refresh())
					}
					clsFunc={() => {
						setEd(false);
					}}
					edit={true}
				/>
			</div>
		);
	return (
		<div className="border border-1 border-primary rounded-4 p-1 px-4 text-start">
			<div className="fst-italic d-inline">{com.author.username}</div>
			<button
				className="btn btn-danger m-auto float-end"
				onClick={() => {
					deleteProfileComment(profId, usrCtx.user.authToken ?? "");
					refresh();
				}}
			>
				K
			</button>
			<button
				className="btn btn-warning m-auto float-end"
				onClick={() => setEd(!ed)}
			>
				E
			</button>

			<div className="d-block">{com.content}</div>
		</div>
	);
}

export function CommentAdder({
	userId,
	initText,
	initRating,
	accFunc,
	clsFunc,
	edit,
}: {
	userId: string;
	initText: string;
	initRating: number;
	accFunc: (text: string, rating: number) => void;
	clsFunc: () => void;
	edit: boolean;
}) {
	const usrCtx = useContext(userContext);

	const [text, setText] = useState(initText);
	const [stars, setStars] = useState(initRating);
	const [exp, setExp] = useState(edit);

	if (exp === false)
		return (
			<button
				className="btn btn-primary rounded-5"
				onClick={() => setExp(true)}
			>
				+
			</button>
		);

	function close() {
		clsFunc();
		setExp(false);
		setText("");
		setStars(0);
	}

	function add() {
		accFunc(text, stars);
	}

	return (
		<div>
			Zostaw komentarz:
			<textarea
				rows={2}
				className="w-100 d-block m-auto mb-2"
				name="description"
				value={text}
				placeholder="Opis"
				onChange={(e) => setText(e.currentTarget.value)}
            ></textarea>
            <select></select>
			<button
				className="me-4 d-inline m-auto btn btn-primary rounded-5"
				onClick={() => add()}
			>
				{edit && "Zapisz"}
				{!edit && "Dodaj"}
			</button>
			<button
				className="ms-4 d-inline m-auto btn btn-danger rounded-5"
				onClick={() => close()}
			>
				Anuluj
			</button>
		</div>
	);
}

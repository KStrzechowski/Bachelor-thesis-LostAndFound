import { ChatBaseResponseType, getChats } from "commons";
import { useContext, useEffect, useState } from "react";
import { userContext } from "userContext";

export default function Chats() {
	return (
		<div className="d-flex m-3">
			<ChatsList />
			<div className="w-50 border border-dark"> Test Chats</div>
		</div>
	);
}

function ChatsList() {
	const usrCtx = useContext(userContext);
	const [chats, setChats] = useState(
		undefined as ChatBaseResponseType[] | undefined
	);

	useEffect(() => {
		getChats(usrCtx.user.authToken ?? "", 1).then((x) => setChats(x));
	}, []);

	return (
		<div className="w-25 border border-dark bg-light  p-3 rounded-4">
			<span className="h5">Czaty:</span>{" "}
		</div>
	);
}

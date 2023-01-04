import { http } from "../../../http";
import { mapMessageFromServer, } from "../messageTypes";
export const getChatMessages = async (recipentId, accessToken, pageNumber) => {
    const result = await http({
        path: `/chat/message/${recipentId}${pageNumber ? `?pageNumber=${pageNumber}` : ""}`,
        method: "get",
        accessToken,
    });
    if (result.ok && result.body) {
        return result.body.map(mapMessageFromServer);
    }
    else {
        return [];
    }
};

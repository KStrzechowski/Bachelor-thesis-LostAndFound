import { http } from "../../../http";
export const getChats = async (accessToken, pageNumber) => {
    const result = await http({
        path: `/chat${pageNumber ? `?pageNumber=${pageNumber}` : ""}`,
        method: "get",
        accessToken,
    });
    if (result.ok && result.body) {
        return result.body;
    }
    else {
        return [];
    }
};

import { http } from "../../../http";
import { mapProfileCommentsSectionFromServer, } from "../profileCommentTypes";
export const getProfileComments = async (userId, accessToken, pageNumber = 1) => {
    const result = await http({
        path: `/profile/${userId}/comments?pageNumber=${pageNumber}`,
        method: "get",
        accessToken,
    });
    if (result.ok && result.body) {
        return mapProfileCommentsSectionFromServer(result.body);
    }
    else {
        return undefined;
    }
};

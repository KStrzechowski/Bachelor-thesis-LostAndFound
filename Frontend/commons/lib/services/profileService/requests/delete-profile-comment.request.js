import { http } from "../../../http";
import { mapProfileCommentFromServer, } from "../profileCommentTypes";
export const deleteProfileComment = async (userId, accessToken) => {
    const result = await http({
        path: `/profile/${userId}/comments`,
        method: "delete",
        accessToken,
    });
    if (result.ok && result.body) {
        return mapProfileCommentFromServer(result.body);
    }
    else {
        return undefined;
    }
};

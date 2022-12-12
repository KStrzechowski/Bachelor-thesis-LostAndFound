import { http } from "../../../http";
import { mapPublicationFromServer, } from "../publicationTypes";
export const editPublicationRating = async (publicationId, rating, accessToken) => {
    const result = await http({
        path: `/pulication/${publicationId}/rating`,
        method: "patch",
        body: { newPublicationVote: rating },
        accessToken,
    });
    if (result.ok && result.body) {
        return mapPublicationFromServer(result.body);
    }
    else {
        return undefined;
    }
};

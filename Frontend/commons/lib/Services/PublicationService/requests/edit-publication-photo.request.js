import { http } from "../../../http";
import { mapPublicationFromServer, } from "../publicationTypes";
export const editPublicationPhoto = async (publicationId, photo, accessToken) => {
    const result = await http({
        path: `/pulication/${publicationId}/photo`,
        method: "patch",
        body: photo,
        accessToken,
    });
    if (result.ok && result.body) {
        return mapPublicationFromServer(result.body);
    }
    else {
        return undefined;
    }
};

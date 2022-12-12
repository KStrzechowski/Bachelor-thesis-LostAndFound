import { http } from "../../../http";
import { mapPublicationFromServer, } from "../publicationTypes";
export const getPublications = async (pageNumber, accessToken) => {
    const result = await http({
        path: `/publication?pageNumber=${pageNumber}`,
        method: "get",
        accessToken,
    });
    if (result.ok && result.body) {
        return result.body.map(mapPublicationFromServer);
    }
    else {
        return [];
    }
};

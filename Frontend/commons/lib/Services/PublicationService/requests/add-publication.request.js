import { http } from "../../../http";
import { mapPublicationFromServer, } from "../publicationTypes";
export const addPublication = async (publication, accessToken) => {
    const result = await http({
        path: "/publication",
        method: "post",
        body: publication,
        accessToken,
    });
    if (result.ok && result.body) {
        return mapPublicationFromServer(result.body);
    }
    else {
        return undefined;
    }
};

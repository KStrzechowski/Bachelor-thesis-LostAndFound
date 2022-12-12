import { http } from "../../../http";
export const deletePublicationPhoto = async (publicationId, accessToken) => {
    const result = await http({
        path: `/pulication/${publicationId}/photo`,
        method: "delete",
        accessToken,
    });
    if (result.ok && result.body) {
        return true;
    }
    else {
        return undefined;
    }
};

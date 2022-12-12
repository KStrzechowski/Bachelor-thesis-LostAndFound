import { http } from "../../../http";
export const deletePublication = async (publicationId, accessToken) => {
    const result = await http({
        path: `/pulication/${publicationId}`,
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

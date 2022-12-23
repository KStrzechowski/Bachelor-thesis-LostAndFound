import { http } from "../../../http";
export const deleteProfilePhoto = async (accessToken) => {
    const result = await http({
        path: `/profile/photo`,
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

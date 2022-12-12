import { http } from "../../../http";
export const editProfilePhoto = async (photo, accessToken) => {
    const result = await http({
        path: "/profile/picture",
        method: "patch",
        body: photo,
        accessToken,
    });
    if (result.ok && result.body) {
        return result.body;
    }
    else {
        return undefined;
    }
};

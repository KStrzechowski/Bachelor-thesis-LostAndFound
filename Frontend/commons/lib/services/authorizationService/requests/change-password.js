import { http } from "../../../http";
export const changePassword = async (passwords, accessToken) => {
    const result = await http({
        path: `/account/password`,
        method: "put",
        body: passwords,
        accessToken,
    });
    if (result.ok) {
        return true;
    }
    else {
        return false;
    }
};

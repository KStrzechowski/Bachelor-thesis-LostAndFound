import { http } from "../../../http";
export const register = async (user) => {
    const result = await http({
        path: "/account/register",
        method: "post",
        body: user,
    });
    if (result.ok && result.body) {
        return result.body;
    }
    else {
        return undefined;
    }
};

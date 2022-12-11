import { http } from "../../../http";
import { CategoryType } from "../publicationTypes";

export const getCategories = async (): Promise<CategoryType[] | undefined> => {
  const result = await http<CategoryType[]>({
    path: "/publication/categories",
    method: "get",
  });

  if (result.ok && result.body) {
    return result.body;
  } else {
    return undefined;
  }
};

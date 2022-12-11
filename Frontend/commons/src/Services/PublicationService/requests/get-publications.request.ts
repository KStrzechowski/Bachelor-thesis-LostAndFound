import { http } from "../../../http";
import {
  PublicationResponseType,
  PublicationFromServerType,
  mapPublicationFromServer,
} from "../publicationTypes";

export const getPublications = async (
  pageNumber: number
): Promise<PublicationResponseType[]> => {
  const result = await http<PublicationFromServerType[]>({
    path: `/publication?pageNumber=${pageNumber}`,
    method: "get",
  });

  if (result.ok && result.body) {
    return result.body.map(mapPublicationFromServer);
  } else {
    return [];
  }
};

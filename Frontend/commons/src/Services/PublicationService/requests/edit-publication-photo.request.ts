import { http } from "../../../http";
import {
  PublicationResponseType,
  PublicationFromServerType,
  mapPublicationFromServer,
} from "../publicationTypes";

export const editPublicationPhoto = async (
  publicationId: string,
  photo: string
): Promise<PublicationResponseType | undefined> => {
  const result = await http<PublicationFromServerType, string>({
    path: `/pulication/${publicationId}/photo`,
    method: "patch",
    body: photo,
  });

  if (result.ok && result.body) {
    return mapPublicationFromServer(result.body);
  } else {
    return undefined;
  }
};

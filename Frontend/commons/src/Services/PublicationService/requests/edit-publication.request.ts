import { http } from "../../../http";
import {
  PublicationRequestType,
  PublicationResponseType,
  PublicationFromServerType,
  mapPublicationFromServer,
} from "../publicationTypes";

export const editPublication = async (
  publicationId: string,
  publication: PublicationRequestType
): Promise<PublicationResponseType | undefined> => {
  const result = await http<PublicationFromServerType, PublicationRequestType>({
    path: `/publication/${publicationId}`,
    method: "put",
    body: publication,
  });

  if (result.ok && result.body) {
    return mapPublicationFromServer(result.body);
  } else {
    return undefined;
  }
};

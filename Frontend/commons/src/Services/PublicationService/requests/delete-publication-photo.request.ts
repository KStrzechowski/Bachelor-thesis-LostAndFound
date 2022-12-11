import { http } from "../../../http";
import { PublicationFromServerType } from "../publicationTypes";

export const deletePublicationPhoto = async (
  publicationId: string
): Promise<boolean | undefined> => {
  const result = await http<PublicationFromServerType>({
    path: `/pulication/${publicationId}/photo`,
    method: "delete",
  });

  if (result.ok && result.body) {
    return true;
  } else {
    return undefined;
  }
};

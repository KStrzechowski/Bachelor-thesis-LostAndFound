import { http } from "../../../http";
import { mapPublicationFromServer, Order, } from "../publicationTypes";
export const getPublications = async (pageNumber, accessToken, publication, orderBy) => {
    let path = `/publication?pageNumber=${pageNumber}`;
    if (publication) {
        if (publication.title) {
            path = path.concat(`&SearchQuery=${publication.title}`);
        }
        if (publication.incidentAddress) {
            path = path.concat(`&IncidentAddress=${publication.incidentAddress}`);
            if (publication.incidentDistance) {
                path = path.concat(`&SearchRadius=${publication.incidentDistance}`);
            }
        }
        if (publication.incidentFromDate) {
            path = path.concat(`&FromDate=${publication.incidentFromDate.toDateString()}`);
        }
        if (publication.incidentToDate) {
            path = path.concat(`&ToDate=${publication.incidentToDate.toDateString()}`);
        }
        if (publication.publicationState) {
            path = path.concat(`&PublicationState=${publication.publicationState}`);
        }
        if (publication.publicationType) {
            path = path.concat(`&PublicationType=${publication.publicationType}`);
        }
        if (publication.subjectCategoryId) {
            path = path.concat(`&SubjectCategoryId=${publication.subjectCategoryId}`);
        }
        if (publication.onlyUserPublications) {
            path = path.concat(`&OnlyUserPublications=${publication.onlyUserPublications}`);
        }
    }
    if (orderBy && orderBy.firstArgumentSort) {
        const firstSortOrder = orderBy.firstArgumentSort.order === Order.Descending ? " desc" : "";
        if (orderBy.secondArgumentSort) {
            const secondSortOrder = orderBy.secondArgumentSort.order === Order.Descending ? " desc" : "";
            path = path.concat(`&orderBy=${orderBy.firstArgumentSort.type}${firstSortOrder}, ${orderBy.secondArgumentSort.type}${secondSortOrder}`);
        }
        else {
            path = path.concat(`&orderBy=${orderBy.firstArgumentSort.type}${firstSortOrder}`);
        }
    }
    const result = await http({
        path,
        method: "get",
        accessToken,
    });
    if (result.ok && result.body) {
        return result.body.map(mapPublicationFromServer);
    }
    else {
        return [];
    }
};

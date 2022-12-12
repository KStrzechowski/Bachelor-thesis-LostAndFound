export const mapProfileCommentFromServer = (comment) => ({
    ...comment,
    creationDate: new Date(comment.creationDate),
});
export const mapProfileCommentsSectionFromServer = (data) => ({
    myComment: mapProfileCommentFromServer(data.myComment),
    comments: data.comments.map(mapProfileCommentFromServer),
});

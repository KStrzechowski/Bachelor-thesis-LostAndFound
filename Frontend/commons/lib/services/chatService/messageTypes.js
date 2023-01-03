export const mapMessageFromServer = (message) => ({
    ...message,
    creationTime: new Date(message === null || message === void 0 ? void 0 : message.creationTime),
});

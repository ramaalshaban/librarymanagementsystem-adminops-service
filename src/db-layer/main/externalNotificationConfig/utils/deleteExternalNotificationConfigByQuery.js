const { HttpServerError, BadRequestError } = require("common");

const { ExternalNotificationConfig } = require("models");

const deleteExternalNotificationConfigByQuery = async (query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }
    // sholuld i match the resul returned with sequlize?

    const docs = await ExternalNotificationConfig.find({
      ...query,
      isActive: true,
    });
    if (!docs || docs.length === 0) return [];

    await ExternalNotificationConfig.updateMany(
      { ...query, isActive: true },
      { isActive: false, updatedAt: new Date() },
    );
    return docs.map((doc) => doc.getData());
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenDeletingExternalNotificationConfigByQuery",
      err,
    );
  }
};

module.exports = deleteExternalNotificationConfigByQuery;

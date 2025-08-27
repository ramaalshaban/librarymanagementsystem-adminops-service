const { HttpServerError, BadRequestError } = require("common");

const { ExternalNotificationConfig } = require("models");

const getExternalNotificationConfigByQuery = async (query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }

    const externalNotificationConfig = await ExternalNotificationConfig.findOne(
      {
        ...query,
        isActive: true,
      },
    );

    if (!externalNotificationConfig) return null;

    return externalNotificationConfig.getData();
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingExternalNotificationConfigByQuery",
      err,
    );
  }
};

module.exports = getExternalNotificationConfigByQuery;

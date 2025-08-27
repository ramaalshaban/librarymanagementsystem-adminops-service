const { HttpServerError, BadRequestError, NotFoundError } = require("common");
const { ExternalNotificationConfig } = require("models");

const getExternalNotificationConfigListByQuery = async (query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }

    const externalNotificationConfig =
      await ExternalNotificationConfig.find(query);

    if (!externalNotificationConfig || externalNotificationConfig.length === 0)
      return [];

    //should i add not found error or only return empty array?
    //      if (!externalNotificationConfig || externalNotificationConfig.length === 0) {
    //      throw new NotFoundError(
    //      `ExternalNotificationConfig with the specified criteria not found`
    //  );
    //}

    return externalNotificationConfig.map((item) => item.getData());
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingExternalNotificationConfigListByQuery",
      err,
    );
  }
};

module.exports = getExternalNotificationConfigListByQuery;

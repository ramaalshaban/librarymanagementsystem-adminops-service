const { HttpServerError } = require("common");

const { ExternalNotificationConfig } = require("models");

const getExternalNotificationConfigById = async (
  externalNotificationConfigId,
) => {
  try {
    let externalNotificationConfig;

    if (Array.isArray(externalNotificationConfigId)) {
      externalNotificationConfig = await ExternalNotificationConfig.find({
        _id: { $in: externalNotificationConfigId },
        isActive: true,
      });
    } else {
      externalNotificationConfig = await ExternalNotificationConfig.findOne({
        _id: externalNotificationConfigId,
        isActive: true,
      });
    }

    if (!externalNotificationConfig) {
      return null;
    }

    return Array.isArray(externalNotificationConfigId)
      ? externalNotificationConfig.map((item) => item.getData())
      : externalNotificationConfig.getData();
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingExternalNotificationConfigById",
      err,
    );
  }
};

module.exports = getExternalNotificationConfigById;

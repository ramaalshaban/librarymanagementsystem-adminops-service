const { HttpServerError } = require("common");

const { ExternalNotificationConfig } = require("models");

const updateExternalNotificationConfigByIdList = async (idList, dataClause) => {
  try {
    await ExternalNotificationConfig.updateMany(
      { _id: { $in: idList }, isActive: true },
      dataClause,
    );

    const updatedDocs = await ExternalNotificationConfig.find(
      { _id: { $in: idList }, isActive: true },
      { _id: 1 },
    );

    const externalNotificationConfigIdList = updatedDocs.map((doc) => doc._id);

    return externalNotificationConfigIdList;
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenUpdatingExternalNotificationConfigByIdList",
      err,
    );
  }
};

module.exports = updateExternalNotificationConfigByIdList;

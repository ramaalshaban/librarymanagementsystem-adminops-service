const { HttpServerError, BadRequestError, newUUID } = require("common");
//should i add the elastic for mongodb?
const { ElasticIndexer } = require("serviceCommon");

const { ExternalNotificationConfig } = require("models");

const indexDataToElastic = async (data) => {
  const elasticIndexer = new ElasticIndexer("externalNotificationConfig");
  await elasticIndexer.indexData(data);
};

const validateData = (data) => {
  const requiredFields = [
    "providerType",
    "name",
    "settings",
    "status",
    "isActive",
  ];

  requiredFields.forEach((field) => {
    if (data[field] === null || data[field] === undefined) {
      throw new BadRequestError(
        `Field "${field}" is required and cannot be null or undefined.`,
      );
    }
  });

  if (!data._id && !data.id) {
    data._id = newUUID();
  }
};

const createExternalNotificationConfig = async (data) => {
  try {
    if (!data || Object.keys(data).length === 0) {
      throw new BadRequestError(
        `errMsg_invalidInputDataForExternalNotificationConfig`,
      );
    }

    validateData(data);

    const newexternalNotificationConfig = new ExternalNotificationConfig(data);
    const createdexternalNotificationConfig =
      await newexternalNotificationConfig.save();

    //shoul i use model's getData method for consistency with Sequelize
    const _data = createdexternalNotificationConfig.getData();

    await indexDataToElastic(_data);

    return _data;
  } catch (err) {
    throw new HttpServerError(
      `errMsg_dbErrorWhenCreatingExternalNotificationConfig`,
      err,
    );
  }
};

module.exports = createExternalNotificationConfig;

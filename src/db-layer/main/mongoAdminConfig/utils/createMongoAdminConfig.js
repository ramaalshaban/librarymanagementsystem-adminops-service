const { HttpServerError, BadRequestError, newUUID } = require("common");
//should i add the elastic for mongodb?
const { ElasticIndexer } = require("serviceCommon");

const { MongoAdminConfig } = require("models");

const indexDataToElastic = async (data) => {
  const elasticIndexer = new ElasticIndexer("mongoAdminConfig");
  await elasticIndexer.indexData(data);
};

const validateData = (data) => {
  const requiredFields = [
    "configType",
    "targetObject",
    "configDetails",
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

const createMongoAdminConfig = async (data) => {
  try {
    if (!data || Object.keys(data).length === 0) {
      throw new BadRequestError(`errMsg_invalidInputDataForMongoAdminConfig`);
    }

    validateData(data);

    const newmongoAdminConfig = new MongoAdminConfig(data);
    const createdmongoAdminConfig = await newmongoAdminConfig.save();

    //shoul i use model's getData method for consistency with Sequelize
    const _data = createdmongoAdminConfig.getData();

    await indexDataToElastic(_data);

    return _data;
  } catch (err) {
    throw new HttpServerError(
      `errMsg_dbErrorWhenCreatingMongoAdminConfig`,
      err,
    );
  }
};

module.exports = createMongoAdminConfig;

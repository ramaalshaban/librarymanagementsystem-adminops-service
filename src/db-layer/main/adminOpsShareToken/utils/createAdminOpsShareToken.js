const { HttpServerError, BadRequestError, newUUID } = require("common");
//should i add the elastic for mongodb?
const { ElasticIndexer } = require("serviceCommon");

const { AdminOpsShareToken } = require("models");

const indexDataToElastic = async (data) => {
  const elasticIndexer = new ElasticIndexer("adminOpsShareToken");
  await elasticIndexer.indexData(data);
};

const validateData = (data) => {
  const requiredFields = [
    "configName",
    "objectName",
    "objectId",
    "ownerId",
    "peopleOption",
    "tokenPermissions",
    "allowedEmails",
    "expireDate",
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

const createAdminOpsShareToken = async (data) => {
  try {
    if (!data || Object.keys(data).length === 0) {
      throw new BadRequestError(`errMsg_invalidInputDataForAdminOpsShareToken`);
    }

    validateData(data);

    const newadminOpsShareToken = new AdminOpsShareToken(data);
    const createdadminOpsShareToken = await newadminOpsShareToken.save();

    //shoul i use model's getData method for consistency with Sequelize
    const _data = createdadminOpsShareToken.getData();

    await indexDataToElastic(_data);

    return _data;
  } catch (err) {
    throw new HttpServerError(
      `errMsg_dbErrorWhenCreatingAdminOpsShareToken`,
      err,
    );
  }
};

module.exports = createAdminOpsShareToken;

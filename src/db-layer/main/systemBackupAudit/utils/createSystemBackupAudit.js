const { HttpServerError, BadRequestError, newUUID } = require("common");
//should i add the elastic for mongodb?
const { ElasticIndexer } = require("serviceCommon");

const { SystemBackupAudit } = require("models");

const indexDataToElastic = async (data) => {
  const elasticIndexer = new ElasticIndexer("systemBackupAudit");
  await elasticIndexer.indexData(data);
};

const validateData = (data) => {
  const requiredFields = [
    "type",
    "config",
    "initiatedByUserId",
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

const createSystemBackupAudit = async (data) => {
  try {
    if (!data || Object.keys(data).length === 0) {
      throw new BadRequestError(`errMsg_invalidInputDataForSystemBackupAudit`);
    }

    validateData(data);

    const newsystemBackupAudit = new SystemBackupAudit(data);
    const createdsystemBackupAudit = await newsystemBackupAudit.save();

    //shoul i use model's getData method for consistency with Sequelize
    const _data = createdsystemBackupAudit.getData();

    await indexDataToElastic(_data);

    return _data;
  } catch (err) {
    throw new HttpServerError(
      `errMsg_dbErrorWhenCreatingSystemBackupAudit`,
      err,
    );
  }
};

module.exports = createSystemBackupAudit;

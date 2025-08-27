const { HttpServerError, BadRequestError, newUUID } = require("common");
//should i add the elastic for mongodb?
const { ElasticIndexer } = require("serviceCommon");

const { IssueEscalation } = require("models");

const indexDataToElastic = async (data) => {
  const elasticIndexer = new ElasticIndexer("issueEscalation");
  await elasticIndexer.indexData(data);
};

const validateData = (data) => {
  const requiredFields = [
    "branchId",
    "raisedByUserId",
    "status",
    "escalationType",
    "description",
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

const createIssueEscalation = async (data) => {
  try {
    if (!data || Object.keys(data).length === 0) {
      throw new BadRequestError(`errMsg_invalidInputDataForIssueEscalation`);
    }

    validateData(data);

    const newissueEscalation = new IssueEscalation(data);
    const createdissueEscalation = await newissueEscalation.save();

    //shoul i use model's getData method for consistency with Sequelize
    const _data = createdissueEscalation.getData();

    await indexDataToElastic(_data);

    return _data;
  } catch (err) {
    throw new HttpServerError(`errMsg_dbErrorWhenCreatingIssueEscalation`, err);
  }
};

module.exports = createIssueEscalation;

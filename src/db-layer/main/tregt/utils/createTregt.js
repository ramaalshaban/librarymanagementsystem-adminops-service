const { HttpServerError, BadRequestError, newUUID } = require("common");
//should i add the elastic for mongodb?
const { ElasticIndexer } = require("serviceCommon");

const { Tregt } = require("models");

const indexDataToElastic = async (data) => {
  const elasticIndexer = new ElasticIndexer("tregt");
  await elasticIndexer.indexData(data);
};

const validateData = (data) => {
  const requiredFields = [, "isActive"];

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

const createTregt = async (data) => {
  try {
    if (!data || Object.keys(data).length === 0) {
      throw new BadRequestError(`errMsg_invalidInputDataForTregt`);
    }

    validateData(data);

    const newtregt = new Tregt(data);
    const createdtregt = await newtregt.save();

    //shoul i use model's getData method for consistency with Sequelize
    const _data = createdtregt.getData();

    await indexDataToElastic(_data);

    return _data;
  } catch (err) {
    throw new HttpServerError(`errMsg_dbErrorWhenCreatingTregt`, err);
  }
};

module.exports = createTregt;

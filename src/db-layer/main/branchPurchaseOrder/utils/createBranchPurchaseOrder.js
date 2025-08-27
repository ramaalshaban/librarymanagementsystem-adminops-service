const { HttpServerError, BadRequestError, newUUID } = require("common");
//should i add the elastic for mongodb?
const { ElasticIndexer } = require("serviceCommon");

const { BranchPurchaseOrder } = require("models");

const indexDataToElastic = async (data) => {
  const elasticIndexer = new ElasticIndexer("branchPurchaseOrder");
  await elasticIndexer.indexData(data);
};

const validateData = (data) => {
  const requiredFields = [
    "branchId",
    "requestedByUserId",
    "items",
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

const createBranchPurchaseOrder = async (data) => {
  try {
    if (!data || Object.keys(data).length === 0) {
      throw new BadRequestError(
        `errMsg_invalidInputDataForBranchPurchaseOrder`,
      );
    }

    validateData(data);

    const newbranchPurchaseOrder = new BranchPurchaseOrder(data);
    const createdbranchPurchaseOrder = await newbranchPurchaseOrder.save();

    //shoul i use model's getData method for consistency with Sequelize
    const _data = createdbranchPurchaseOrder.getData();

    await indexDataToElastic(_data);

    return _data;
  } catch (err) {
    throw new HttpServerError(
      `errMsg_dbErrorWhenCreatingBranchPurchaseOrder`,
      err,
    );
  }
};

module.exports = createBranchPurchaseOrder;

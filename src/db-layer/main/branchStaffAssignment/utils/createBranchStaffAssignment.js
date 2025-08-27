const { HttpServerError, BadRequestError, newUUID } = require("common");
//should i add the elastic for mongodb?
const { ElasticIndexer } = require("serviceCommon");

const { BranchStaffAssignment } = require("models");

const indexDataToElastic = async (data) => {
  const elasticIndexer = new ElasticIndexer("branchStaffAssignment");
  await elasticIndexer.indexData(data);
};

const validateData = (data) => {
  const requiredFields = [
    "branchId",
    "userId",
    "role",
    "assignedByUserId",
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

const createBranchStaffAssignment = async (data) => {
  try {
    if (!data || Object.keys(data).length === 0) {
      throw new BadRequestError(
        `errMsg_invalidInputDataForBranchStaffAssignment`,
      );
    }

    validateData(data);

    const newbranchStaffAssignment = new BranchStaffAssignment(data);
    const createdbranchStaffAssignment = await newbranchStaffAssignment.save();

    //shoul i use model's getData method for consistency with Sequelize
    const _data = createdbranchStaffAssignment.getData();

    await indexDataToElastic(_data);

    return _data;
  } catch (err) {
    throw new HttpServerError(
      `errMsg_dbErrorWhenCreatingBranchStaffAssignment`,
      err,
    );
  }
};

module.exports = createBranchStaffAssignment;

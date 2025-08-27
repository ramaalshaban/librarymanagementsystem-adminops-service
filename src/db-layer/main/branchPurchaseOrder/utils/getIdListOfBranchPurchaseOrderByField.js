const { HttpServerError, BadRequestError, NotFoundError } = require("common");

const { BranchPurchaseOrder } = require("models");

const getIdListOfBranchPurchaseOrderByField = async (
  fieldName,
  fieldValue,
  isArray,
) => {
  try {
    const branchPurchaseOrderProperties = [
      "id",
      "branchId",
      "requestedByUserId",
      "items",
      "status",
      "approvedByUserId",
      "approvalDate",
      "note",
    ];

    if (!branchPurchaseOrderProperties.includes(fieldName)) {
      throw new BadRequestError(`Invalid field name: ${fieldName}.`);
    }

    // type validation different from sequelize for mongodb
    const schemaPath = BranchPurchaseOrder.schema.paths[fieldName];
    if (schemaPath && fieldValue !== undefined && fieldValue !== null) {
      const expectedType = schemaPath.instance.toLowerCase();
      const actualType = typeof fieldValue;

      const typeMapping = {
        string: "string",
        number: "number",
        boolean: "boolean",
        objectid: "string", // ObjectIds are typically passed as strings
      };

      const expectedJSType = typeMapping[expectedType];
      if (expectedJSType && actualType !== expectedJSType) {
        throw new BadRequestError(
          `Invalid field value type for ${fieldName}. Expected ${expectedJSType}, got ${actualType}.`,
        );
      }
    }

    let query = isArray
      ? {
          [fieldName]: {
            $in: Array.isArray(fieldValue) ? fieldValue : [fieldValue],
          },
        }
      : { [fieldName]: fieldValue };

    query.isActive = true;

    let branchPurchaseOrderIdList = await BranchPurchaseOrder.find(query, {
      _id: 1,
    })
      .lean()
      .exec();

    if (!branchPurchaseOrderIdList || branchPurchaseOrderIdList.length === 0) {
      throw new NotFoundError(
        `BranchPurchaseOrder with the specified criteria not found`,
      );
    }

    branchPurchaseOrderIdList = branchPurchaseOrderIdList.map((item) =>
      item._id.toString(),
    );

    return branchPurchaseOrderIdList;
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingBranchPurchaseOrderIdListByField",
      err,
    );
  }
};

module.exports = getIdListOfBranchPurchaseOrderByField;

const { HttpServerError, BadRequestError, NotFoundError } = require("common");

const { IssueEscalation } = require("models");

const getIdListOfIssueEscalationByField = async (
  fieldName,
  fieldValue,
  isArray,
) => {
  try {
    const issueEscalationProperties = [
      "id",
      "branchId",
      "raisedByUserId",
      "assignedToUserId",
      "status",
      "escalationType",
      "description",
      "log",
    ];

    if (!issueEscalationProperties.includes(fieldName)) {
      throw new BadRequestError(`Invalid field name: ${fieldName}.`);
    }

    // type validation different from sequelize for mongodb
    const schemaPath = IssueEscalation.schema.paths[fieldName];
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

    let issueEscalationIdList = await IssueEscalation.find(query, { _id: 1 })
      .lean()
      .exec();

    if (!issueEscalationIdList || issueEscalationIdList.length === 0) {
      throw new NotFoundError(
        `IssueEscalation with the specified criteria not found`,
      );
    }

    issueEscalationIdList = issueEscalationIdList.map((item) =>
      item._id.toString(),
    );

    return issueEscalationIdList;
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingIssueEscalationIdListByField",
      err,
    );
  }
};

module.exports = getIdListOfIssueEscalationByField;

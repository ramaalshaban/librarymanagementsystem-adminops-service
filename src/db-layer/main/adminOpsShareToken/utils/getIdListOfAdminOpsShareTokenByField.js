const { HttpServerError, BadRequestError, NotFoundError } = require("common");

const { AdminOpsShareToken } = require("models");

const getIdListOfAdminOpsShareTokenByField = async (
  fieldName,
  fieldValue,
  isArray,
) => {
  try {
    const adminOpsShareTokenProperties = [
      "id",
      "configName",
      "objectName",
      "objectId",
      "ownerId",
      "peopleOption",
      "tokenPermissions",
      "allowedEmails",
      "expireDate",
    ];

    if (!adminOpsShareTokenProperties.includes(fieldName)) {
      throw new BadRequestError(`Invalid field name: ${fieldName}.`);
    }

    // type validation different from sequelize for mongodb
    const schemaPath = AdminOpsShareToken.schema.paths[fieldName];
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

    let adminOpsShareTokenIdList = await AdminOpsShareToken.find(query, {
      _id: 1,
    })
      .lean()
      .exec();

    if (!adminOpsShareTokenIdList || adminOpsShareTokenIdList.length === 0) {
      throw new NotFoundError(
        `AdminOpsShareToken with the specified criteria not found`,
      );
    }

    adminOpsShareTokenIdList = adminOpsShareTokenIdList.map((item) =>
      item._id.toString(),
    );

    return adminOpsShareTokenIdList;
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingAdminOpsShareTokenIdListByField",
      err,
    );
  }
};

module.exports = getIdListOfAdminOpsShareTokenByField;

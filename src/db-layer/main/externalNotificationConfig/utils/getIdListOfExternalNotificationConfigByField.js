const { HttpServerError, BadRequestError, NotFoundError } = require("common");

const { ExternalNotificationConfig } = require("models");

const getIdListOfExternalNotificationConfigByField = async (
  fieldName,
  fieldValue,
  isArray,
) => {
  try {
    const externalNotificationConfigProperties = [
      "id",
      "providerType",
      "name",
      "settings",
      "status",
    ];

    if (!externalNotificationConfigProperties.includes(fieldName)) {
      throw new BadRequestError(`Invalid field name: ${fieldName}.`);
    }

    // type validation different from sequelize for mongodb
    const schemaPath = ExternalNotificationConfig.schema.paths[fieldName];
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

    let externalNotificationConfigIdList =
      await ExternalNotificationConfig.find(query, { _id: 1 }).lean().exec();

    if (
      !externalNotificationConfigIdList ||
      externalNotificationConfigIdList.length === 0
    ) {
      throw new NotFoundError(
        `ExternalNotificationConfig with the specified criteria not found`,
      );
    }

    externalNotificationConfigIdList = externalNotificationConfigIdList.map(
      (item) => item._id.toString(),
    );

    return externalNotificationConfigIdList;
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingExternalNotificationConfigIdListByField",
      err,
    );
  }
};

module.exports = getIdListOfExternalNotificationConfigByField;

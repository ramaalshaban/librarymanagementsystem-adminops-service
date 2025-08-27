const { HttpServerError, BadRequestError, NotFoundError } = require("common");

const { MongoAdminConfig } = require("models");

const getIdListOfMongoAdminConfigByField = async (
  fieldName,
  fieldValue,
  isArray,
) => {
  try {
    const mongoAdminConfigProperties = [
      "id",
      "configType",
      "targetObject",
      "configDetails",
      "status",
    ];

    if (!mongoAdminConfigProperties.includes(fieldName)) {
      throw new BadRequestError(`Invalid field name: ${fieldName}.`);
    }

    // type validation different from sequelize for mongodb
    const schemaPath = MongoAdminConfig.schema.paths[fieldName];
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

    let mongoAdminConfigIdList = await MongoAdminConfig.find(query, { _id: 1 })
      .lean()
      .exec();

    if (!mongoAdminConfigIdList || mongoAdminConfigIdList.length === 0) {
      throw new NotFoundError(
        `MongoAdminConfig with the specified criteria not found`,
      );
    }

    mongoAdminConfigIdList = mongoAdminConfigIdList.map((item) =>
      item._id.toString(),
    );

    return mongoAdminConfigIdList;
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingMongoAdminConfigIdListByField",
      err,
    );
  }
};

module.exports = getIdListOfMongoAdminConfigByField;

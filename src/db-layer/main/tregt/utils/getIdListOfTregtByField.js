const { HttpServerError, BadRequestError, NotFoundError } = require("common");

const { Tregt } = require("models");

const getIdListOfTregtByField = async (fieldName, fieldValue, isArray) => {
  try {
    const tregtProperties = ["id"];

    if (!tregtProperties.includes(fieldName)) {
      throw new BadRequestError(`Invalid field name: ${fieldName}.`);
    }

    // type validation different from sequelize for mongodb
    const schemaPath = Tregt.schema.paths[fieldName];
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

    let tregtIdList = await Tregt.find(query, { _id: 1 }).lean().exec();

    if (!tregtIdList || tregtIdList.length === 0) {
      throw new NotFoundError(`Tregt with the specified criteria not found`);
    }

    tregtIdList = tregtIdList.map((item) => item._id.toString());

    return tregtIdList;
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingTregtIdListByField",
      err,
    );
  }
};

module.exports = getIdListOfTregtByField;

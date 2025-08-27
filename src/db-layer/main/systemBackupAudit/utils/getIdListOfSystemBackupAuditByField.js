const { HttpServerError, BadRequestError, NotFoundError } = require("common");

const { SystemBackupAudit } = require("models");

const getIdListOfSystemBackupAuditByField = async (
  fieldName,
  fieldValue,
  isArray,
) => {
  try {
    const systemBackupAuditProperties = [
      "id",
      "type",
      "config",
      "initiatedByUserId",
      "status",
      "resultDetails",
    ];

    if (!systemBackupAuditProperties.includes(fieldName)) {
      throw new BadRequestError(`Invalid field name: ${fieldName}.`);
    }

    // type validation different from sequelize for mongodb
    const schemaPath = SystemBackupAudit.schema.paths[fieldName];
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

    let systemBackupAuditIdList = await SystemBackupAudit.find(query, {
      _id: 1,
    })
      .lean()
      .exec();

    if (!systemBackupAuditIdList || systemBackupAuditIdList.length === 0) {
      throw new NotFoundError(
        `SystemBackupAudit with the specified criteria not found`,
      );
    }

    systemBackupAuditIdList = systemBackupAuditIdList.map((item) =>
      item._id.toString(),
    );

    return systemBackupAuditIdList;
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingSystemBackupAuditIdListByField",
      err,
    );
  }
};

module.exports = getIdListOfSystemBackupAuditByField;

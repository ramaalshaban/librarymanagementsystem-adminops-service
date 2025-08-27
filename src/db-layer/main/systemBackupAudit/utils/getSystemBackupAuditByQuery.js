const { HttpServerError, BadRequestError } = require("common");

const { SystemBackupAudit } = require("models");

const getSystemBackupAuditByQuery = async (query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }

    const systemBackupAudit = await SystemBackupAudit.findOne({
      ...query,
      isActive: true,
    });

    if (!systemBackupAudit) return null;

    return systemBackupAudit.getData();
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingSystemBackupAuditByQuery",
      err,
    );
  }
};

module.exports = getSystemBackupAuditByQuery;

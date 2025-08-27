const { HttpServerError, BadRequestError, NotFoundError } = require("common");
const { SystemBackupAudit } = require("models");

const getSystemBackupAuditListByQuery = async (query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }

    const systemBackupAudit = await SystemBackupAudit.find(query);

    if (!systemBackupAudit || systemBackupAudit.length === 0) return [];

    //should i add not found error or only return empty array?
    //      if (!systemBackupAudit || systemBackupAudit.length === 0) {
    //      throw new NotFoundError(
    //      `SystemBackupAudit with the specified criteria not found`
    //  );
    //}

    return systemBackupAudit.map((item) => item.getData());
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingSystemBackupAuditListByQuery",
      err,
    );
  }
};

module.exports = getSystemBackupAuditListByQuery;

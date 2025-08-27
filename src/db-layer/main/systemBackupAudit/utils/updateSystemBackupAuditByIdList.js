const { HttpServerError } = require("common");

const { SystemBackupAudit } = require("models");

const updateSystemBackupAuditByIdList = async (idList, dataClause) => {
  try {
    await SystemBackupAudit.updateMany(
      { _id: { $in: idList }, isActive: true },
      dataClause,
    );

    const updatedDocs = await SystemBackupAudit.find(
      { _id: { $in: idList }, isActive: true },
      { _id: 1 },
    );

    const systemBackupAuditIdList = updatedDocs.map((doc) => doc._id);

    return systemBackupAuditIdList;
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenUpdatingSystemBackupAuditByIdList",
      err,
    );
  }
};

module.exports = updateSystemBackupAuditByIdList;

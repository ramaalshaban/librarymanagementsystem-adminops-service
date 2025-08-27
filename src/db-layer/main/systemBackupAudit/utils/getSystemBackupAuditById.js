const { HttpServerError } = require("common");

const { SystemBackupAudit } = require("models");

const getSystemBackupAuditById = async (systemBackupAuditId) => {
  try {
    let systemBackupAudit;

    if (Array.isArray(systemBackupAuditId)) {
      systemBackupAudit = await SystemBackupAudit.find({
        _id: { $in: systemBackupAuditId },
        isActive: true,
      });
    } else {
      systemBackupAudit = await SystemBackupAudit.findOne({
        _id: systemBackupAuditId,
        isActive: true,
      });
    }

    if (!systemBackupAudit) {
      return null;
    }

    return Array.isArray(systemBackupAuditId)
      ? systemBackupAudit.map((item) => item.getData())
      : systemBackupAudit.getData();
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingSystemBackupAuditById",
      err,
    );
  }
};

module.exports = getSystemBackupAuditById;

const utils = require("./utils");
const dbApiScripts = require("./dbApiScripts");

module.exports = {
  dbGetSystembackupaudit: require("./dbGetSystembackupaudit"),
  dbCreateSystembackupaudit: require("./dbCreateSystembackupaudit"),
  dbUpdateSystembackupaudit: require("./dbUpdateSystembackupaudit"),
  dbDeleteSystembackupaudit: require("./dbDeleteSystembackupaudit"),
  dbListSystembackupaudits: require("./dbListSystembackupaudits"),
  createSystemBackupAudit: utils.createSystemBackupAudit,
  getIdListOfSystemBackupAuditByField:
    utils.getIdListOfSystemBackupAuditByField,
  getSystemBackupAuditById: utils.getSystemBackupAuditById,
  getSystemBackupAuditAggById: utils.getSystemBackupAuditAggById,
  getSystemBackupAuditListByQuery: utils.getSystemBackupAuditListByQuery,
  getSystemBackupAuditStatsByQuery: utils.getSystemBackupAuditStatsByQuery,
  getSystemBackupAuditByQuery: utils.getSystemBackupAuditByQuery,
  updateSystemBackupAuditById: utils.updateSystemBackupAuditById,
  updateSystemBackupAuditByIdList: utils.updateSystemBackupAuditByIdList,
  updateSystemBackupAuditByQuery: utils.updateSystemBackupAuditByQuery,
  deleteSystemBackupAuditById: utils.deleteSystemBackupAuditById,
  deleteSystemBackupAuditByQuery: utils.deleteSystemBackupAuditByQuery,
};

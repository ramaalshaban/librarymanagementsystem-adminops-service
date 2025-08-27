const branchStaffAssignmentFunctions = require("./branchStaffAssignment");
const issueEscalationFunctions = require("./issueEscalation");
const mongoAdminConfigFunctions = require("./mongoAdminConfig");
const externalNotificationConfigFunctions = require("./externalNotificationConfig");
const systemBackupAuditFunctions = require("./systemBackupAudit");
const branchPurchaseOrderFunctions = require("./branchPurchaseOrder");
const tregtFunctions = require("./tregt");
const adminOpsShareTokenFunctions = require("./adminOpsShareToken");

module.exports = {
  // main Database
  // BranchStaffAssignment Db Object
  dbGetBranchstaffassignment:
    branchStaffAssignmentFunctions.dbGetBranchstaffassignment,
  dbCreateBranchstaffassignment:
    branchStaffAssignmentFunctions.dbCreateBranchstaffassignment,
  dbUpdateBranchstaffassignment:
    branchStaffAssignmentFunctions.dbUpdateBranchstaffassignment,
  dbDeleteBranchstaffassignment:
    branchStaffAssignmentFunctions.dbDeleteBranchstaffassignment,
  dbListBranchstaffassignments:
    branchStaffAssignmentFunctions.dbListBranchstaffassignments,
  createBranchStaffAssignment:
    branchStaffAssignmentFunctions.createBranchStaffAssignment,
  getIdListOfBranchStaffAssignmentByField:
    branchStaffAssignmentFunctions.getIdListOfBranchStaffAssignmentByField,
  getBranchStaffAssignmentById:
    branchStaffAssignmentFunctions.getBranchStaffAssignmentById,
  getBranchStaffAssignmentAggById:
    branchStaffAssignmentFunctions.getBranchStaffAssignmentAggById,
  getBranchStaffAssignmentListByQuery:
    branchStaffAssignmentFunctions.getBranchStaffAssignmentListByQuery,
  getBranchStaffAssignmentStatsByQuery:
    branchStaffAssignmentFunctions.getBranchStaffAssignmentStatsByQuery,
  getBranchStaffAssignmentByQuery:
    branchStaffAssignmentFunctions.getBranchStaffAssignmentByQuery,
  updateBranchStaffAssignmentById:
    branchStaffAssignmentFunctions.updateBranchStaffAssignmentById,
  updateBranchStaffAssignmentByIdList:
    branchStaffAssignmentFunctions.updateBranchStaffAssignmentByIdList,
  updateBranchStaffAssignmentByQuery:
    branchStaffAssignmentFunctions.updateBranchStaffAssignmentByQuery,
  deleteBranchStaffAssignmentById:
    branchStaffAssignmentFunctions.deleteBranchStaffAssignmentById,
  deleteBranchStaffAssignmentByQuery:
    branchStaffAssignmentFunctions.deleteBranchStaffAssignmentByQuery,

  // IssueEscalation Db Object
  dbGetIssueescalation: issueEscalationFunctions.dbGetIssueescalation,
  dbCreateIssueescalation: issueEscalationFunctions.dbCreateIssueescalation,
  dbUpdateIssueescalation: issueEscalationFunctions.dbUpdateIssueescalation,
  dbDeleteIssueescalation: issueEscalationFunctions.dbDeleteIssueescalation,
  dbListIssueescalations: issueEscalationFunctions.dbListIssueescalations,
  createIssueEscalation: issueEscalationFunctions.createIssueEscalation,
  getIdListOfIssueEscalationByField:
    issueEscalationFunctions.getIdListOfIssueEscalationByField,
  getIssueEscalationById: issueEscalationFunctions.getIssueEscalationById,
  getIssueEscalationAggById: issueEscalationFunctions.getIssueEscalationAggById,
  getIssueEscalationListByQuery:
    issueEscalationFunctions.getIssueEscalationListByQuery,
  getIssueEscalationStatsByQuery:
    issueEscalationFunctions.getIssueEscalationStatsByQuery,
  getIssueEscalationByQuery: issueEscalationFunctions.getIssueEscalationByQuery,
  updateIssueEscalationById: issueEscalationFunctions.updateIssueEscalationById,
  updateIssueEscalationByIdList:
    issueEscalationFunctions.updateIssueEscalationByIdList,
  updateIssueEscalationByQuery:
    issueEscalationFunctions.updateIssueEscalationByQuery,
  deleteIssueEscalationById: issueEscalationFunctions.deleteIssueEscalationById,
  deleteIssueEscalationByQuery:
    issueEscalationFunctions.deleteIssueEscalationByQuery,

  // MongoAdminConfig Db Object
  dbGetMongoadminconfig: mongoAdminConfigFunctions.dbGetMongoadminconfig,
  dbCreateMongoadminconfig: mongoAdminConfigFunctions.dbCreateMongoadminconfig,
  dbUpdateMongoadminconfig: mongoAdminConfigFunctions.dbUpdateMongoadminconfig,
  dbDeleteMongoadminconfig: mongoAdminConfigFunctions.dbDeleteMongoadminconfig,
  dbListMongoadminconfigs: mongoAdminConfigFunctions.dbListMongoadminconfigs,
  createMongoAdminConfig: mongoAdminConfigFunctions.createMongoAdminConfig,
  getIdListOfMongoAdminConfigByField:
    mongoAdminConfigFunctions.getIdListOfMongoAdminConfigByField,
  getMongoAdminConfigById: mongoAdminConfigFunctions.getMongoAdminConfigById,
  getMongoAdminConfigAggById:
    mongoAdminConfigFunctions.getMongoAdminConfigAggById,
  getMongoAdminConfigListByQuery:
    mongoAdminConfigFunctions.getMongoAdminConfigListByQuery,
  getMongoAdminConfigStatsByQuery:
    mongoAdminConfigFunctions.getMongoAdminConfigStatsByQuery,
  getMongoAdminConfigByQuery:
    mongoAdminConfigFunctions.getMongoAdminConfigByQuery,
  updateMongoAdminConfigById:
    mongoAdminConfigFunctions.updateMongoAdminConfigById,
  updateMongoAdminConfigByIdList:
    mongoAdminConfigFunctions.updateMongoAdminConfigByIdList,
  updateMongoAdminConfigByQuery:
    mongoAdminConfigFunctions.updateMongoAdminConfigByQuery,
  deleteMongoAdminConfigById:
    mongoAdminConfigFunctions.deleteMongoAdminConfigById,
  deleteMongoAdminConfigByQuery:
    mongoAdminConfigFunctions.deleteMongoAdminConfigByQuery,

  // ExternalNotificationConfig Db Object
  dbGetExternalnotificationconfig:
    externalNotificationConfigFunctions.dbGetExternalnotificationconfig,
  dbCreateExternalnotificationconfig:
    externalNotificationConfigFunctions.dbCreateExternalnotificationconfig,
  dbUpdateExternalnotificationconfig:
    externalNotificationConfigFunctions.dbUpdateExternalnotificationconfig,
  dbDeleteExternalnotificationconfig:
    externalNotificationConfigFunctions.dbDeleteExternalnotificationconfig,
  dbListExternalnotificationconfigs:
    externalNotificationConfigFunctions.dbListExternalnotificationconfigs,
  createExternalNotificationConfig:
    externalNotificationConfigFunctions.createExternalNotificationConfig,
  getIdListOfExternalNotificationConfigByField:
    externalNotificationConfigFunctions.getIdListOfExternalNotificationConfigByField,
  getExternalNotificationConfigById:
    externalNotificationConfigFunctions.getExternalNotificationConfigById,
  getExternalNotificationConfigAggById:
    externalNotificationConfigFunctions.getExternalNotificationConfigAggById,
  getExternalNotificationConfigListByQuery:
    externalNotificationConfigFunctions.getExternalNotificationConfigListByQuery,
  getExternalNotificationConfigStatsByQuery:
    externalNotificationConfigFunctions.getExternalNotificationConfigStatsByQuery,
  getExternalNotificationConfigByQuery:
    externalNotificationConfigFunctions.getExternalNotificationConfigByQuery,
  updateExternalNotificationConfigById:
    externalNotificationConfigFunctions.updateExternalNotificationConfigById,
  updateExternalNotificationConfigByIdList:
    externalNotificationConfigFunctions.updateExternalNotificationConfigByIdList,
  updateExternalNotificationConfigByQuery:
    externalNotificationConfigFunctions.updateExternalNotificationConfigByQuery,
  deleteExternalNotificationConfigById:
    externalNotificationConfigFunctions.deleteExternalNotificationConfigById,
  deleteExternalNotificationConfigByQuery:
    externalNotificationConfigFunctions.deleteExternalNotificationConfigByQuery,

  // SystemBackupAudit Db Object
  dbGetSystembackupaudit: systemBackupAuditFunctions.dbGetSystembackupaudit,
  dbCreateSystembackupaudit:
    systemBackupAuditFunctions.dbCreateSystembackupaudit,
  dbUpdateSystembackupaudit:
    systemBackupAuditFunctions.dbUpdateSystembackupaudit,
  dbDeleteSystembackupaudit:
    systemBackupAuditFunctions.dbDeleteSystembackupaudit,
  dbListSystembackupaudits: systemBackupAuditFunctions.dbListSystembackupaudits,
  createSystemBackupAudit: systemBackupAuditFunctions.createSystemBackupAudit,
  getIdListOfSystemBackupAuditByField:
    systemBackupAuditFunctions.getIdListOfSystemBackupAuditByField,
  getSystemBackupAuditById: systemBackupAuditFunctions.getSystemBackupAuditById,
  getSystemBackupAuditAggById:
    systemBackupAuditFunctions.getSystemBackupAuditAggById,
  getSystemBackupAuditListByQuery:
    systemBackupAuditFunctions.getSystemBackupAuditListByQuery,
  getSystemBackupAuditStatsByQuery:
    systemBackupAuditFunctions.getSystemBackupAuditStatsByQuery,
  getSystemBackupAuditByQuery:
    systemBackupAuditFunctions.getSystemBackupAuditByQuery,
  updateSystemBackupAuditById:
    systemBackupAuditFunctions.updateSystemBackupAuditById,
  updateSystemBackupAuditByIdList:
    systemBackupAuditFunctions.updateSystemBackupAuditByIdList,
  updateSystemBackupAuditByQuery:
    systemBackupAuditFunctions.updateSystemBackupAuditByQuery,
  deleteSystemBackupAuditById:
    systemBackupAuditFunctions.deleteSystemBackupAuditById,
  deleteSystemBackupAuditByQuery:
    systemBackupAuditFunctions.deleteSystemBackupAuditByQuery,

  // BranchPurchaseOrder Db Object
  dbGetBranchpurchaseorder:
    branchPurchaseOrderFunctions.dbGetBranchpurchaseorder,
  dbCreateBranchpurchaseorder:
    branchPurchaseOrderFunctions.dbCreateBranchpurchaseorder,
  dbUpdateBranchpurchaseorder:
    branchPurchaseOrderFunctions.dbUpdateBranchpurchaseorder,
  dbDeleteBranchpurchaseorder:
    branchPurchaseOrderFunctions.dbDeleteBranchpurchaseorder,
  dbListBranchpurchaseorders:
    branchPurchaseOrderFunctions.dbListBranchpurchaseorders,
  createBranchPurchaseOrder:
    branchPurchaseOrderFunctions.createBranchPurchaseOrder,
  getIdListOfBranchPurchaseOrderByField:
    branchPurchaseOrderFunctions.getIdListOfBranchPurchaseOrderByField,
  getBranchPurchaseOrderById:
    branchPurchaseOrderFunctions.getBranchPurchaseOrderById,
  getBranchPurchaseOrderAggById:
    branchPurchaseOrderFunctions.getBranchPurchaseOrderAggById,
  getBranchPurchaseOrderListByQuery:
    branchPurchaseOrderFunctions.getBranchPurchaseOrderListByQuery,
  getBranchPurchaseOrderStatsByQuery:
    branchPurchaseOrderFunctions.getBranchPurchaseOrderStatsByQuery,
  getBranchPurchaseOrderByQuery:
    branchPurchaseOrderFunctions.getBranchPurchaseOrderByQuery,
  updateBranchPurchaseOrderById:
    branchPurchaseOrderFunctions.updateBranchPurchaseOrderById,
  updateBranchPurchaseOrderByIdList:
    branchPurchaseOrderFunctions.updateBranchPurchaseOrderByIdList,
  updateBranchPurchaseOrderByQuery:
    branchPurchaseOrderFunctions.updateBranchPurchaseOrderByQuery,
  deleteBranchPurchaseOrderById:
    branchPurchaseOrderFunctions.deleteBranchPurchaseOrderById,
  deleteBranchPurchaseOrderByQuery:
    branchPurchaseOrderFunctions.deleteBranchPurchaseOrderByQuery,

  // Tregt Db Object
  createTregt: tregtFunctions.createTregt,
  getIdListOfTregtByField: tregtFunctions.getIdListOfTregtByField,
  getTregtById: tregtFunctions.getTregtById,
  getTregtAggById: tregtFunctions.getTregtAggById,
  getTregtListByQuery: tregtFunctions.getTregtListByQuery,
  getTregtStatsByQuery: tregtFunctions.getTregtStatsByQuery,
  getTregtByQuery: tregtFunctions.getTregtByQuery,
  updateTregtById: tregtFunctions.updateTregtById,
  updateTregtByIdList: tregtFunctions.updateTregtByIdList,
  updateTregtByQuery: tregtFunctions.updateTregtByQuery,
  deleteTregtById: tregtFunctions.deleteTregtById,
  deleteTregtByQuery: tregtFunctions.deleteTregtByQuery,

  // AdminOpsShareToken Db Object
  createAdminOpsShareToken:
    adminOpsShareTokenFunctions.createAdminOpsShareToken,
  getIdListOfAdminOpsShareTokenByField:
    adminOpsShareTokenFunctions.getIdListOfAdminOpsShareTokenByField,
  getAdminOpsShareTokenById:
    adminOpsShareTokenFunctions.getAdminOpsShareTokenById,
  getAdminOpsShareTokenAggById:
    adminOpsShareTokenFunctions.getAdminOpsShareTokenAggById,
  getAdminOpsShareTokenListByQuery:
    adminOpsShareTokenFunctions.getAdminOpsShareTokenListByQuery,
  getAdminOpsShareTokenStatsByQuery:
    adminOpsShareTokenFunctions.getAdminOpsShareTokenStatsByQuery,
  getAdminOpsShareTokenByQuery:
    adminOpsShareTokenFunctions.getAdminOpsShareTokenByQuery,
  updateAdminOpsShareTokenById:
    adminOpsShareTokenFunctions.updateAdminOpsShareTokenById,
  updateAdminOpsShareTokenByIdList:
    adminOpsShareTokenFunctions.updateAdminOpsShareTokenByIdList,
  updateAdminOpsShareTokenByQuery:
    adminOpsShareTokenFunctions.updateAdminOpsShareTokenByQuery,
  deleteAdminOpsShareTokenById:
    adminOpsShareTokenFunctions.deleteAdminOpsShareTokenById,
  deleteAdminOpsShareTokenByQuery:
    adminOpsShareTokenFunctions.deleteAdminOpsShareTokenByQuery,
};

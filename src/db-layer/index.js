const mainFunctions = require("./main");

module.exports = {
  // main Database
  // BranchStaffAssignment Db Object
  dbGetBranchstaffassignment: mainFunctions.dbGetBranchstaffassignment,
  dbCreateBranchstaffassignment: mainFunctions.dbCreateBranchstaffassignment,
  dbUpdateBranchstaffassignment: mainFunctions.dbUpdateBranchstaffassignment,
  dbDeleteBranchstaffassignment: mainFunctions.dbDeleteBranchstaffassignment,
  dbListBranchstaffassignments: mainFunctions.dbListBranchstaffassignments,
  createBranchStaffAssignment: mainFunctions.createBranchStaffAssignment,
  getIdListOfBranchStaffAssignmentByField:
    mainFunctions.getIdListOfBranchStaffAssignmentByField,
  getBranchStaffAssignmentById: mainFunctions.getBranchStaffAssignmentById,
  getBranchStaffAssignmentAggById:
    mainFunctions.getBranchStaffAssignmentAggById,
  getBranchStaffAssignmentListByQuery:
    mainFunctions.getBranchStaffAssignmentListByQuery,
  getBranchStaffAssignmentStatsByQuery:
    mainFunctions.getBranchStaffAssignmentStatsByQuery,
  getBranchStaffAssignmentByQuery:
    mainFunctions.getBranchStaffAssignmentByQuery,
  updateBranchStaffAssignmentById:
    mainFunctions.updateBranchStaffAssignmentById,
  updateBranchStaffAssignmentByIdList:
    mainFunctions.updateBranchStaffAssignmentByIdList,
  updateBranchStaffAssignmentByQuery:
    mainFunctions.updateBranchStaffAssignmentByQuery,
  deleteBranchStaffAssignmentById:
    mainFunctions.deleteBranchStaffAssignmentById,
  deleteBranchStaffAssignmentByQuery:
    mainFunctions.deleteBranchStaffAssignmentByQuery,

  // IssueEscalation Db Object
  dbGetIssueescalation: mainFunctions.dbGetIssueescalation,
  dbCreateIssueescalation: mainFunctions.dbCreateIssueescalation,
  dbUpdateIssueescalation: mainFunctions.dbUpdateIssueescalation,
  dbDeleteIssueescalation: mainFunctions.dbDeleteIssueescalation,
  dbListIssueescalations: mainFunctions.dbListIssueescalations,
  createIssueEscalation: mainFunctions.createIssueEscalation,
  getIdListOfIssueEscalationByField:
    mainFunctions.getIdListOfIssueEscalationByField,
  getIssueEscalationById: mainFunctions.getIssueEscalationById,
  getIssueEscalationAggById: mainFunctions.getIssueEscalationAggById,
  getIssueEscalationListByQuery: mainFunctions.getIssueEscalationListByQuery,
  getIssueEscalationStatsByQuery: mainFunctions.getIssueEscalationStatsByQuery,
  getIssueEscalationByQuery: mainFunctions.getIssueEscalationByQuery,
  updateIssueEscalationById: mainFunctions.updateIssueEscalationById,
  updateIssueEscalationByIdList: mainFunctions.updateIssueEscalationByIdList,
  updateIssueEscalationByQuery: mainFunctions.updateIssueEscalationByQuery,
  deleteIssueEscalationById: mainFunctions.deleteIssueEscalationById,
  deleteIssueEscalationByQuery: mainFunctions.deleteIssueEscalationByQuery,

  // MongoAdminConfig Db Object
  dbGetMongoadminconfig: mainFunctions.dbGetMongoadminconfig,
  dbCreateMongoadminconfig: mainFunctions.dbCreateMongoadminconfig,
  dbUpdateMongoadminconfig: mainFunctions.dbUpdateMongoadminconfig,
  dbDeleteMongoadminconfig: mainFunctions.dbDeleteMongoadminconfig,
  dbListMongoadminconfigs: mainFunctions.dbListMongoadminconfigs,
  createMongoAdminConfig: mainFunctions.createMongoAdminConfig,
  getIdListOfMongoAdminConfigByField:
    mainFunctions.getIdListOfMongoAdminConfigByField,
  getMongoAdminConfigById: mainFunctions.getMongoAdminConfigById,
  getMongoAdminConfigAggById: mainFunctions.getMongoAdminConfigAggById,
  getMongoAdminConfigListByQuery: mainFunctions.getMongoAdminConfigListByQuery,
  getMongoAdminConfigStatsByQuery:
    mainFunctions.getMongoAdminConfigStatsByQuery,
  getMongoAdminConfigByQuery: mainFunctions.getMongoAdminConfigByQuery,
  updateMongoAdminConfigById: mainFunctions.updateMongoAdminConfigById,
  updateMongoAdminConfigByIdList: mainFunctions.updateMongoAdminConfigByIdList,
  updateMongoAdminConfigByQuery: mainFunctions.updateMongoAdminConfigByQuery,
  deleteMongoAdminConfigById: mainFunctions.deleteMongoAdminConfigById,
  deleteMongoAdminConfigByQuery: mainFunctions.deleteMongoAdminConfigByQuery,

  // ExternalNotificationConfig Db Object
  dbGetExternalnotificationconfig:
    mainFunctions.dbGetExternalnotificationconfig,
  dbCreateExternalnotificationconfig:
    mainFunctions.dbCreateExternalnotificationconfig,
  dbUpdateExternalnotificationconfig:
    mainFunctions.dbUpdateExternalnotificationconfig,
  dbDeleteExternalnotificationconfig:
    mainFunctions.dbDeleteExternalnotificationconfig,
  dbListExternalnotificationconfigs:
    mainFunctions.dbListExternalnotificationconfigs,
  createExternalNotificationConfig:
    mainFunctions.createExternalNotificationConfig,
  getIdListOfExternalNotificationConfigByField:
    mainFunctions.getIdListOfExternalNotificationConfigByField,
  getExternalNotificationConfigById:
    mainFunctions.getExternalNotificationConfigById,
  getExternalNotificationConfigAggById:
    mainFunctions.getExternalNotificationConfigAggById,
  getExternalNotificationConfigListByQuery:
    mainFunctions.getExternalNotificationConfigListByQuery,
  getExternalNotificationConfigStatsByQuery:
    mainFunctions.getExternalNotificationConfigStatsByQuery,
  getExternalNotificationConfigByQuery:
    mainFunctions.getExternalNotificationConfigByQuery,
  updateExternalNotificationConfigById:
    mainFunctions.updateExternalNotificationConfigById,
  updateExternalNotificationConfigByIdList:
    mainFunctions.updateExternalNotificationConfigByIdList,
  updateExternalNotificationConfigByQuery:
    mainFunctions.updateExternalNotificationConfigByQuery,
  deleteExternalNotificationConfigById:
    mainFunctions.deleteExternalNotificationConfigById,
  deleteExternalNotificationConfigByQuery:
    mainFunctions.deleteExternalNotificationConfigByQuery,

  // SystemBackupAudit Db Object
  dbGetSystembackupaudit: mainFunctions.dbGetSystembackupaudit,
  dbCreateSystembackupaudit: mainFunctions.dbCreateSystembackupaudit,
  dbUpdateSystembackupaudit: mainFunctions.dbUpdateSystembackupaudit,
  dbDeleteSystembackupaudit: mainFunctions.dbDeleteSystembackupaudit,
  dbListSystembackupaudits: mainFunctions.dbListSystembackupaudits,
  createSystemBackupAudit: mainFunctions.createSystemBackupAudit,
  getIdListOfSystemBackupAuditByField:
    mainFunctions.getIdListOfSystemBackupAuditByField,
  getSystemBackupAuditById: mainFunctions.getSystemBackupAuditById,
  getSystemBackupAuditAggById: mainFunctions.getSystemBackupAuditAggById,
  getSystemBackupAuditListByQuery:
    mainFunctions.getSystemBackupAuditListByQuery,
  getSystemBackupAuditStatsByQuery:
    mainFunctions.getSystemBackupAuditStatsByQuery,
  getSystemBackupAuditByQuery: mainFunctions.getSystemBackupAuditByQuery,
  updateSystemBackupAuditById: mainFunctions.updateSystemBackupAuditById,
  updateSystemBackupAuditByIdList:
    mainFunctions.updateSystemBackupAuditByIdList,
  updateSystemBackupAuditByQuery: mainFunctions.updateSystemBackupAuditByQuery,
  deleteSystemBackupAuditById: mainFunctions.deleteSystemBackupAuditById,
  deleteSystemBackupAuditByQuery: mainFunctions.deleteSystemBackupAuditByQuery,

  // BranchPurchaseOrder Db Object
  dbGetBranchpurchaseorder: mainFunctions.dbGetBranchpurchaseorder,
  dbCreateBranchpurchaseorder: mainFunctions.dbCreateBranchpurchaseorder,
  dbUpdateBranchpurchaseorder: mainFunctions.dbUpdateBranchpurchaseorder,
  dbDeleteBranchpurchaseorder: mainFunctions.dbDeleteBranchpurchaseorder,
  dbListBranchpurchaseorders: mainFunctions.dbListBranchpurchaseorders,
  createBranchPurchaseOrder: mainFunctions.createBranchPurchaseOrder,
  getIdListOfBranchPurchaseOrderByField:
    mainFunctions.getIdListOfBranchPurchaseOrderByField,
  getBranchPurchaseOrderById: mainFunctions.getBranchPurchaseOrderById,
  getBranchPurchaseOrderAggById: mainFunctions.getBranchPurchaseOrderAggById,
  getBranchPurchaseOrderListByQuery:
    mainFunctions.getBranchPurchaseOrderListByQuery,
  getBranchPurchaseOrderStatsByQuery:
    mainFunctions.getBranchPurchaseOrderStatsByQuery,
  getBranchPurchaseOrderByQuery: mainFunctions.getBranchPurchaseOrderByQuery,
  updateBranchPurchaseOrderById: mainFunctions.updateBranchPurchaseOrderById,
  updateBranchPurchaseOrderByIdList:
    mainFunctions.updateBranchPurchaseOrderByIdList,
  updateBranchPurchaseOrderByQuery:
    mainFunctions.updateBranchPurchaseOrderByQuery,
  deleteBranchPurchaseOrderById: mainFunctions.deleteBranchPurchaseOrderById,
  deleteBranchPurchaseOrderByQuery:
    mainFunctions.deleteBranchPurchaseOrderByQuery,

  // Tregt Db Object
  createTregt: mainFunctions.createTregt,
  getIdListOfTregtByField: mainFunctions.getIdListOfTregtByField,
  getTregtById: mainFunctions.getTregtById,
  getTregtAggById: mainFunctions.getTregtAggById,
  getTregtListByQuery: mainFunctions.getTregtListByQuery,
  getTregtStatsByQuery: mainFunctions.getTregtStatsByQuery,
  getTregtByQuery: mainFunctions.getTregtByQuery,
  updateTregtById: mainFunctions.updateTregtById,
  updateTregtByIdList: mainFunctions.updateTregtByIdList,
  updateTregtByQuery: mainFunctions.updateTregtByQuery,
  deleteTregtById: mainFunctions.deleteTregtById,
  deleteTregtByQuery: mainFunctions.deleteTregtByQuery,

  // AdminOpsShareToken Db Object
  createAdminOpsShareToken: mainFunctions.createAdminOpsShareToken,
  getIdListOfAdminOpsShareTokenByField:
    mainFunctions.getIdListOfAdminOpsShareTokenByField,
  getAdminOpsShareTokenById: mainFunctions.getAdminOpsShareTokenById,
  getAdminOpsShareTokenAggById: mainFunctions.getAdminOpsShareTokenAggById,
  getAdminOpsShareTokenListByQuery:
    mainFunctions.getAdminOpsShareTokenListByQuery,
  getAdminOpsShareTokenStatsByQuery:
    mainFunctions.getAdminOpsShareTokenStatsByQuery,
  getAdminOpsShareTokenByQuery: mainFunctions.getAdminOpsShareTokenByQuery,
  updateAdminOpsShareTokenById: mainFunctions.updateAdminOpsShareTokenById,
  updateAdminOpsShareTokenByIdList:
    mainFunctions.updateAdminOpsShareTokenByIdList,
  updateAdminOpsShareTokenByQuery:
    mainFunctions.updateAdminOpsShareTokenByQuery,
  deleteAdminOpsShareTokenById: mainFunctions.deleteAdminOpsShareTokenById,
  deleteAdminOpsShareTokenByQuery:
    mainFunctions.deleteAdminOpsShareTokenByQuery,
};

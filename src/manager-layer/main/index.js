module.exports = {
  // main Database Crud Object Routes Manager Layer Classes
  // BranchStaffAssignment Db Object
  GetBranchStaffAssignmentManager: require("./branchStaffAssignment/get-branchstaffassignment"),
  CreateBranchStaffAssignmentManager: require("./branchStaffAssignment/create-branchstaffassignment"),
  UpdateBranchStaffAssignmentManager: require("./branchStaffAssignment/update-branchstaffassignment"),
  DeleteBranchStaffAssignmentManager: require("./branchStaffAssignment/delete-branchstaffassignment"),
  ListBranchStaffAssignmentsManager: require("./branchStaffAssignment/list-branchstaffassignments"),
  // IssueEscalation Db Object
  GetIssueEscalationManager: require("./issueEscalation/get-issueescalation"),
  CreateIssueEscalationManager: require("./issueEscalation/create-issueescalation"),
  UpdateIssueEscalationManager: require("./issueEscalation/update-issueescalation"),
  DeleteIssueEscalationManager: require("./issueEscalation/delete-issueescalation"),
  ListIssueEscalationsManager: require("./issueEscalation/list-issueescalations"),
  // MongoAdminConfig Db Object
  GetMongoAdminConfigManager: require("./mongoAdminConfig/get-mongoadminconfig"),
  CreateMongoAdminConfigManager: require("./mongoAdminConfig/create-mongoadminconfig"),
  UpdateMongoAdminConfigManager: require("./mongoAdminConfig/update-mongoadminconfig"),
  DeleteMongoAdminConfigManager: require("./mongoAdminConfig/delete-mongoadminconfig"),
  ListMongoAdminConfigsManager: require("./mongoAdminConfig/list-mongoadminconfigs"),
  // ExternalNotificationConfig Db Object
  GetExternalNotificationConfigManager: require("./externalNotificationConfig/get-externalnotificationconfig"),
  CreateExternalNotificationConfigManager: require("./externalNotificationConfig/create-externalnotificationconfig"),
  UpdateExternalNotificationConfigManager: require("./externalNotificationConfig/update-externalnotificationconfig"),
  DeleteExternalNotificationConfigManager: require("./externalNotificationConfig/delete-externalnotificationconfig"),
  ListExternalNotificationConfigsManager: require("./externalNotificationConfig/list-externalnotificationconfigs"),
  // SystemBackupAudit Db Object
  GetSystemBackupAuditManager: require("./systemBackupAudit/get-systembackupaudit"),
  CreateSystemBackupAuditManager: require("./systemBackupAudit/create-systembackupaudit"),
  UpdateSystemBackupAuditManager: require("./systemBackupAudit/update-systembackupaudit"),
  DeleteSystemBackupAuditManager: require("./systemBackupAudit/delete-systembackupaudit"),
  ListSystemBackupAuditsManager: require("./systemBackupAudit/list-systembackupaudits"),
  // BranchPurchaseOrder Db Object
  GetBranchPurchaseOrderManager: require("./branchPurchaseOrder/get-branchpurchaseorder"),
  CreateBranchPurchaseOrderManager: require("./branchPurchaseOrder/create-branchpurchaseorder"),
  UpdateBranchPurchaseOrderManager: require("./branchPurchaseOrder/update-branchpurchaseorder"),
  DeleteBranchPurchaseOrderManager: require("./branchPurchaseOrder/delete-branchpurchaseorder"),
  ListBranchPurchaseOrdersManager: require("./branchPurchaseOrder/list-branchpurchaseorders"),
  // Tregt Db Object
  // AdminOpsShareToken Db Object
};

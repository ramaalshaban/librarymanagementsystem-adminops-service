module.exports = {
  AdminOpsServiceManager: require("./service-manager/AdminOpsServiceManager"),
  // main Database Crud Object Routes Manager Layer Classes
  // BranchStaffAssignment Db Object
  GetBranchStaffAssignmentManager: require("./main/branchStaffAssignment/get-branchstaffassignment"),
  CreateBranchStaffAssignmentManager: require("./main/branchStaffAssignment/create-branchstaffassignment"),
  UpdateBranchStaffAssignmentManager: require("./main/branchStaffAssignment/update-branchstaffassignment"),
  DeleteBranchStaffAssignmentManager: require("./main/branchStaffAssignment/delete-branchstaffassignment"),
  ListBranchStaffAssignmentsManager: require("./main/branchStaffAssignment/list-branchstaffassignments"),
  // IssueEscalation Db Object
  GetIssueEscalationManager: require("./main/issueEscalation/get-issueescalation"),
  CreateIssueEscalationManager: require("./main/issueEscalation/create-issueescalation"),
  UpdateIssueEscalationManager: require("./main/issueEscalation/update-issueescalation"),
  DeleteIssueEscalationManager: require("./main/issueEscalation/delete-issueescalation"),
  ListIssueEscalationsManager: require("./main/issueEscalation/list-issueescalations"),
  // MongoAdminConfig Db Object
  GetMongoAdminConfigManager: require("./main/mongoAdminConfig/get-mongoadminconfig"),
  CreateMongoAdminConfigManager: require("./main/mongoAdminConfig/create-mongoadminconfig"),
  UpdateMongoAdminConfigManager: require("./main/mongoAdminConfig/update-mongoadminconfig"),
  DeleteMongoAdminConfigManager: require("./main/mongoAdminConfig/delete-mongoadminconfig"),
  ListMongoAdminConfigsManager: require("./main/mongoAdminConfig/list-mongoadminconfigs"),
  // ExternalNotificationConfig Db Object
  GetExternalNotificationConfigManager: require("./main/externalNotificationConfig/get-externalnotificationconfig"),
  CreateExternalNotificationConfigManager: require("./main/externalNotificationConfig/create-externalnotificationconfig"),
  UpdateExternalNotificationConfigManager: require("./main/externalNotificationConfig/update-externalnotificationconfig"),
  DeleteExternalNotificationConfigManager: require("./main/externalNotificationConfig/delete-externalnotificationconfig"),
  ListExternalNotificationConfigsManager: require("./main/externalNotificationConfig/list-externalnotificationconfigs"),
  // SystemBackupAudit Db Object
  GetSystemBackupAuditManager: require("./main/systemBackupAudit/get-systembackupaudit"),
  CreateSystemBackupAuditManager: require("./main/systemBackupAudit/create-systembackupaudit"),
  UpdateSystemBackupAuditManager: require("./main/systemBackupAudit/update-systembackupaudit"),
  DeleteSystemBackupAuditManager: require("./main/systemBackupAudit/delete-systembackupaudit"),
  ListSystemBackupAuditsManager: require("./main/systemBackupAudit/list-systembackupaudits"),
  // BranchPurchaseOrder Db Object
  GetBranchPurchaseOrderManager: require("./main/branchPurchaseOrder/get-branchpurchaseorder"),
  CreateBranchPurchaseOrderManager: require("./main/branchPurchaseOrder/create-branchpurchaseorder"),
  UpdateBranchPurchaseOrderManager: require("./main/branchPurchaseOrder/update-branchpurchaseorder"),
  DeleteBranchPurchaseOrderManager: require("./main/branchPurchaseOrder/delete-branchpurchaseorder"),
  ListBranchPurchaseOrdersManager: require("./main/branchPurchaseOrder/list-branchpurchaseorders"),
  // Tregt Db Object
  // AdminOpsShareToken Db Object
};

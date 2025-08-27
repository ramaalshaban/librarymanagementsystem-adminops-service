module.exports = {
  // main Database Crud Object Rest Api Routers
  branchStaffAssignmentRouter: require("./branchStaffAssignment"),
  issueEscalationRouter: require("./issueEscalation"),
  mongoAdminConfigRouter: require("./mongoAdminConfig"),
  externalNotificationConfigRouter: require("./externalNotificationConfig"),
  systemBackupAuditRouter: require("./systemBackupAudit"),
  branchPurchaseOrderRouter: require("./branchPurchaseOrder"),
  tregtRouter: require("./tregt"),
  adminOpsShareTokenRouter: require("./adminOpsShareToken"),
};

module.exports = (headers) => {
  // main Database Crud Object Mcp Api Routers
  return {
    branchStaffAssignmentMcpRouter: require("./branchStaffAssignment")(headers),
    issueEscalationMcpRouter: require("./issueEscalation")(headers),
    mongoAdminConfigMcpRouter: require("./mongoAdminConfig")(headers),
    externalNotificationConfigMcpRouter:
      require("./externalNotificationConfig")(headers),
    systemBackupAuditMcpRouter: require("./systemBackupAudit")(headers),
    branchPurchaseOrderMcpRouter: require("./branchPurchaseOrder")(headers),
    tregtMcpRouter: require("./tregt")(headers),
    adminOpsShareTokenMcpRouter: require("./adminOpsShareToken")(headers),
  };
};

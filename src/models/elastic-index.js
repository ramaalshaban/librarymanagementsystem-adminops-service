const { ElasticIndexer } = require("serviceCommon");
const { hexaLogger } = require("common");

const branchStaffAssignmentMapping = {
  id: { type: "keyword" },
  _owner: { type: "keyword" },
  branchId: { type: "keyword", index: true },
  userId: { type: "keyword", index: true },
  role: { type: "keyword", index: true },
  role_: { type: "keyword" },
  assignedByUserId: { type: "keyword", index: false },
  isActive: { type: "boolean" },
  recordVersion: { type: "integer" },
  createdAt: { type: "date" },
  updatedAt: { type: "date" },
};
const issueEscalationMapping = {
  id: { type: "keyword" },
  _owner: { type: "keyword" },
  branchId: { type: "keyword", index: true },
  raisedByUserId: { type: "keyword", index: false },
  assignedToUserId: { type: "keyword", index: false },
  status: { type: "keyword", index: true },
  status_: { type: "keyword" },
  escalationType: { type: "keyword", index: true },
  escalationType_: { type: "keyword" },
  description: { type: "text", index: false },
  log: { type: "object", enabled: false },
  isActive: { type: "boolean" },
  recordVersion: { type: "integer" },
  createdAt: { type: "date" },
  updatedAt: { type: "date" },
};
const mongoAdminConfigMapping = {
  id: { type: "keyword" },
  _owner: { type: "keyword" },
  configType: { type: "keyword", index: true },
  configType_: { type: "keyword" },
  targetObject: { type: "keyword", index: true },
  configDetails: { type: "object", enabled: false },
  status: { type: "keyword", index: true },
  status_: { type: "keyword" },
  isActive: { type: "boolean" },
  recordVersion: { type: "integer" },
  createdAt: { type: "date" },
  updatedAt: { type: "date" },
};
const externalNotificationConfigMapping = {
  id: { type: "keyword" },
  _owner: { type: "keyword" },
  providerType: { type: "keyword", index: true },
  providerType_: { type: "keyword" },
  name: { type: "keyword", index: true },
  settings: { type: "object", enabled: false },
  status: { type: "keyword", index: true },
  status_: { type: "keyword" },
  isActive: { type: "boolean" },
  recordVersion: { type: "integer" },
  createdAt: { type: "date" },
  updatedAt: { type: "date" },
};
const systemBackupAuditMapping = {
  id: { type: "keyword" },
  _owner: { type: "keyword" },
  type: { type: "keyword", index: true },
  type_: { type: "keyword" },
  config: { type: "object", enabled: false },
  initiatedByUserId: { type: "keyword", index: false },
  status: { type: "keyword", index: true },
  status_: { type: "keyword" },
  resultDetails: { type: "object", enabled: false },
  isActive: { type: "boolean" },
  recordVersion: { type: "integer" },
  createdAt: { type: "date" },
  updatedAt: { type: "date" },
};
const branchPurchaseOrderMapping = {
  id: { type: "keyword" },
  _owner: { type: "keyword" },
  branchId: { type: "keyword", index: true },
  requestedByUserId: { type: "keyword", index: false },
  items: { type: "object", enabled: false },
  status: { type: "keyword", index: true },
  status_: { type: "keyword" },
  approvedByUserId: { type: "keyword", index: false },
  approvalDate: { type: "date", index: false },
  note: { type: "text", index: false },
  isActive: { type: "boolean" },
  recordVersion: { type: "integer" },
  createdAt: { type: "date" },
  updatedAt: { type: "date" },
};
const tregtMapping = {
  id: { type: "keyword" },
  _owner: { type: "keyword" },
  isActive: { type: "boolean" },
  recordVersion: { type: "integer" },
  createdAt: { type: "date" },
  updatedAt: { type: "date" },
};
const adminOpsShareTokenMapping = {
  id: { type: "keyword" },
  _owner: { type: "keyword" },
  configName: { type: "keyword", index: true },
  objectName: { type: "keyword", index: true },
  objectId: { type: "keyword", index: true },
  ownerId: { type: "keyword", index: true },
  peopleOption: { type: "keyword", index: true },
  tokenPermissions: { type: "keyword", index: true },
  allowedEmails: { type: "keyword", index: true },
  expireDate: { type: "date", index: true },
  isActive: { type: "boolean" },
  recordVersion: { type: "integer" },
  createdAt: { type: "date" },
  updatedAt: { type: "date" },
};

const updateElasticIndexMappings = async () => {
  try {
    ElasticIndexer.addMapping(
      "branchStaffAssignment",
      branchStaffAssignmentMapping,
    );
    await new ElasticIndexer("branchStaffAssignment").updateMapping(
      branchStaffAssignmentMapping,
    );
    ElasticIndexer.addMapping("issueEscalation", issueEscalationMapping);
    await new ElasticIndexer("issueEscalation").updateMapping(
      issueEscalationMapping,
    );
    ElasticIndexer.addMapping("mongoAdminConfig", mongoAdminConfigMapping);
    await new ElasticIndexer("mongoAdminConfig").updateMapping(
      mongoAdminConfigMapping,
    );
    ElasticIndexer.addMapping(
      "externalNotificationConfig",
      externalNotificationConfigMapping,
    );
    await new ElasticIndexer("externalNotificationConfig").updateMapping(
      externalNotificationConfigMapping,
    );
    ElasticIndexer.addMapping("systemBackupAudit", systemBackupAuditMapping);
    await new ElasticIndexer("systemBackupAudit").updateMapping(
      systemBackupAuditMapping,
    );
    ElasticIndexer.addMapping(
      "branchPurchaseOrder",
      branchPurchaseOrderMapping,
    );
    await new ElasticIndexer("branchPurchaseOrder").updateMapping(
      branchPurchaseOrderMapping,
    );
    ElasticIndexer.addMapping("tregt", tregtMapping);
    await new ElasticIndexer("tregt").updateMapping(tregtMapping);
    ElasticIndexer.addMapping("adminOpsShareToken", adminOpsShareTokenMapping);
    await new ElasticIndexer("adminOpsShareToken").updateMapping(
      adminOpsShareTokenMapping,
    );
  } catch (err) {
    hexaLogger.insertError(
      "UpdateElasticIndexMappingsError",
      { function: "updateElasticIndexMappings" },
      "elastic-index.js->updateElasticIndexMappings",
      err,
    );
  }
};

module.exports = updateElasticIndexMappings;

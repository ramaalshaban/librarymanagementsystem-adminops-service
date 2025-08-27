const { mongoose } = require("common");
const { getEnumValue } = require("serviceCommon");
const { ElasticIndexer } = require("serviceCommon");
const updateElasticIndexMappings = require("./elastic-index");

const branchstaffassignmentSchema = require("./branchStaffAssignment");

const issueescalationSchema = require("./issueEscalation");

const mongoadminconfigSchema = require("./mongoAdminConfig");

const externalnotificationconfigSchema = require("./externalNotificationConfig");

const systembackupauditSchema = require("./systemBackupAudit");

const branchpurchaseorderSchema = require("./branchPurchaseOrder");

const tregtSchema = require("./tregt");

const adminopssharetokenSchema = require("./adminOpsShareToken");

branchstaffassignmentSchema.methods.getCqrsJoins = async function (data) {};

branchstaffassignmentSchema.methods.getData = function () {
  let ret = {};
  ret.id = this._doc._id.toString();
  const docProps = Object.keys(this._doc).filter((key) => key != "_id");
  // copy all props from doc
  docProps.forEach((propName) => (ret[propName] = this._doc[propName]));

  const roleOptions = ["librarian", "manager", "assistant", "regionalAdmin"];
  if (ret.role != null) {
    const enumIndex =
      typeof ret.role === "string" ? roleOptions.indexOf(ret.role) : ret.role;
    ret.role_idx = enumIndex;
    ret.role = enumIndex > -1 ? roleOptions[enumIndex] : undefined;
  }

  return ret;
};

issueescalationSchema.methods.getCqrsJoins = async function (data) {};

issueescalationSchema.methods.getData = function () {
  let ret = {};
  ret.id = this._doc._id.toString();
  const docProps = Object.keys(this._doc).filter((key) => key != "_id");
  // copy all props from doc
  docProps.forEach((propName) => (ret[propName] = this._doc[propName]));

  const statusOptions = [
    "open",
    "assigned",
    "inProgress",
    "resolved",
    "closed",
    "canceled",
  ];
  if (ret.status != null) {
    const enumIndex =
      typeof ret.status === "string"
        ? statusOptions.indexOf(ret.status)
        : ret.status;
    ret.status_idx = enumIndex;
    ret.status = enumIndex > -1 ? statusOptions[enumIndex] : undefined;
  }
  const escalationTypeOptions = [
    "service",
    "memberComplaint",
    "facility",
    "system",
    "other",
  ];
  if (ret.escalationType != null) {
    const enumIndex =
      typeof ret.escalationType === "string"
        ? escalationTypeOptions.indexOf(ret.escalationType)
        : ret.escalationType;
    ret.escalationType_idx = enumIndex;
    ret.escalationType =
      enumIndex > -1 ? escalationTypeOptions[enumIndex] : undefined;
  }

  return ret;
};

mongoadminconfigSchema.methods.getCqrsJoins = async function (data) {};

mongoadminconfigSchema.methods.getData = function () {
  let ret = {};
  ret.id = this._doc._id.toString();
  const docProps = Object.keys(this._doc).filter((key) => key != "_id");
  // copy all props from doc
  docProps.forEach((propName) => (ret[propName] = this._doc[propName]));

  const configTypeOptions = [
    "index",
    "aggregation",
    "transaction",
    "replication",
    "archive",
    "other",
  ];
  if (ret.configType != null) {
    const enumIndex =
      typeof ret.configType === "string"
        ? configTypeOptions.indexOf(ret.configType)
        : ret.configType;
    ret.configType_idx = enumIndex;
    ret.configType = enumIndex > -1 ? configTypeOptions[enumIndex] : undefined;
  }
  const statusOptions = [
    "active",
    "inactive",
    "archived",
    "scheduled",
    "error",
  ];
  if (ret.status != null) {
    const enumIndex =
      typeof ret.status === "string"
        ? statusOptions.indexOf(ret.status)
        : ret.status;
    ret.status_idx = enumIndex;
    ret.status = enumIndex > -1 ? statusOptions[enumIndex] : undefined;
  }

  return ret;
};

externalnotificationconfigSchema.methods.getCqrsJoins = async function (
  data,
) {};

externalnotificationconfigSchema.methods.getData = function () {
  let ret = {};
  ret.id = this._doc._id.toString();
  const docProps = Object.keys(this._doc).filter((key) => key != "_id");
  // copy all props from doc
  docProps.forEach((propName) => (ret[propName] = this._doc[propName]));

  const providerTypeOptions = ["email", "sms", "push", "webhook", "other"];
  if (ret.providerType != null) {
    const enumIndex =
      typeof ret.providerType === "string"
        ? providerTypeOptions.indexOf(ret.providerType)
        : ret.providerType;
    ret.providerType_idx = enumIndex;
    ret.providerType =
      enumIndex > -1 ? providerTypeOptions[enumIndex] : undefined;
  }
  const statusOptions = ["enabled", "disabled", "pendingVerification", "error"];
  if (ret.status != null) {
    const enumIndex =
      typeof ret.status === "string"
        ? statusOptions.indexOf(ret.status)
        : ret.status;
    ret.status_idx = enumIndex;
    ret.status = enumIndex > -1 ? statusOptions[enumIndex] : undefined;
  }

  return ret;
};

systembackupauditSchema.methods.getCqrsJoins = async function (data) {};

systembackupauditSchema.methods.getData = function () {
  let ret = {};
  ret.id = this._doc._id.toString();
  const docProps = Object.keys(this._doc).filter((key) => key != "_id");
  // copy all props from doc
  docProps.forEach((propName) => (ret[propName] = this._doc[propName]));

  const typeOptions = ["backup", "restore", "validate", "purge", "other"];
  if (ret.type != null) {
    const enumIndex =
      typeof ret.type === "string" ? typeOptions.indexOf(ret.type) : ret.type;
    ret.type_idx = enumIndex;
    ret.type = enumIndex > -1 ? typeOptions[enumIndex] : undefined;
  }
  const statusOptions = ["started", "success", "error", "partial", "aborted"];
  if (ret.status != null) {
    const enumIndex =
      typeof ret.status === "string"
        ? statusOptions.indexOf(ret.status)
        : ret.status;
    ret.status_idx = enumIndex;
    ret.status = enumIndex > -1 ? statusOptions[enumIndex] : undefined;
  }

  return ret;
};

branchpurchaseorderSchema.methods.getCqrsJoins = async function (data) {};

branchpurchaseorderSchema.methods.getData = function () {
  let ret = {};
  ret.id = this._doc._id.toString();
  const docProps = Object.keys(this._doc).filter((key) => key != "_id");
  // copy all props from doc
  docProps.forEach((propName) => (ret[propName] = this._doc[propName]));

  const statusOptions = [
    "pending",
    "approved",
    "rejected",
    "inProgress",
    "fulfilled",
    "canceled",
  ];
  if (ret.status != null) {
    const enumIndex =
      typeof ret.status === "string"
        ? statusOptions.indexOf(ret.status)
        : ret.status;
    ret.status_idx = enumIndex;
    ret.status = enumIndex > -1 ? statusOptions[enumIndex] : undefined;
  }

  return ret;
};

tregtSchema.methods.getCqrsJoins = async function (data) {};

tregtSchema.methods.getData = function () {
  let ret = {};
  ret.id = this._doc._id.toString();
  const docProps = Object.keys(this._doc).filter((key) => key != "_id");
  // copy all props from doc
  docProps.forEach((propName) => (ret[propName] = this._doc[propName]));

  return ret;
};

adminopssharetokenSchema.methods.getCqrsJoins = async function (data) {};

adminopssharetokenSchema.methods.getData = function () {
  let ret = {};
  ret.id = this._doc._id.toString();
  const docProps = Object.keys(this._doc).filter((key) => key != "_id");
  // copy all props from doc
  docProps.forEach((propName) => (ret[propName] = this._doc[propName]));

  ret._owner = ret.ownerId ?? undefined;

  return ret;
};

const BranchStaffAssignment = mongoose.model(
  "BranchStaffAssignment",
  branchstaffassignmentSchema,
);
const IssueEscalation = mongoose.model(
  "IssueEscalation",
  issueescalationSchema,
);
const MongoAdminConfig = mongoose.model(
  "MongoAdminConfig",
  mongoadminconfigSchema,
);
const ExternalNotificationConfig = mongoose.model(
  "ExternalNotificationConfig",
  externalnotificationconfigSchema,
);
const SystemBackupAudit = mongoose.model(
  "SystemBackupAudit",
  systembackupauditSchema,
);
const BranchPurchaseOrder = mongoose.model(
  "BranchPurchaseOrder",
  branchpurchaseorderSchema,
);
const Tregt = mongoose.model("Tregt", tregtSchema);
const AdminOpsShareToken = mongoose.model(
  "AdminOpsShareToken",
  adminopssharetokenSchema,
);

module.exports = {
  BranchStaffAssignment,
  IssueEscalation,
  MongoAdminConfig,
  ExternalNotificationConfig,
  SystemBackupAudit,
  BranchPurchaseOrder,
  Tregt,
  AdminOpsShareToken,
  updateElasticIndexMappings,
};

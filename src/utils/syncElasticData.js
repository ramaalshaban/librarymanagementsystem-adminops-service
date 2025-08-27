const {
  getBranchStaffAssignmentById,
  getIdListOfBranchStaffAssignmentByField,
} = require("dbLayer");
const {
  getIssueEscalationById,
  getIdListOfIssueEscalationByField,
} = require("dbLayer");
const {
  getMongoAdminConfigById,
  getIdListOfMongoAdminConfigByField,
} = require("dbLayer");
const {
  getExternalNotificationConfigById,
  getIdListOfExternalNotificationConfigByField,
} = require("dbLayer");
const {
  getSystemBackupAuditById,
  getIdListOfSystemBackupAuditByField,
} = require("dbLayer");
const {
  getBranchPurchaseOrderById,
  getIdListOfBranchPurchaseOrderByField,
} = require("dbLayer");
const { getTregtById, getIdListOfTregtByField } = require("dbLayer");
const {
  getAdminOpsShareTokenById,
  getIdListOfAdminOpsShareTokenByField,
} = require("dbLayer");
const path = require("path");
const fs = require("fs");
const { ElasticIndexer } = require("serviceCommon");

const indexBranchStaffAssignmentData = async () => {
  const branchStaffAssignmentIndexer = new ElasticIndexer(
    "branchStaffAssignment",
    { isSilent: true },
  );
  console.log("Starting to update indexes for BranchStaffAssignment");

  const idList =
    (await getIdListOfBranchStaffAssignmentByField("isActive", true)) ?? [];
  const chunkSize = 500;
  let total = 0;
  for (let i = 0; i < idList.length; i += chunkSize) {
    const chunk = idList.slice(i, i + chunkSize);
    const dataList = await getBranchStaffAssignmentById(chunk);
    if (dataList.length) {
      await branchStaffAssignmentIndexer.indexBulkData(dataList);
      await branchStaffAssignmentIndexer.deleteRedisCache();
    }
    total += dataList.length;
  }

  return total;
};

const indexIssueEscalationData = async () => {
  const issueEscalationIndexer = new ElasticIndexer("issueEscalation", {
    isSilent: true,
  });
  console.log("Starting to update indexes for IssueEscalation");

  const idList =
    (await getIdListOfIssueEscalationByField("isActive", true)) ?? [];
  const chunkSize = 500;
  let total = 0;
  for (let i = 0; i < idList.length; i += chunkSize) {
    const chunk = idList.slice(i, i + chunkSize);
    const dataList = await getIssueEscalationById(chunk);
    if (dataList.length) {
      await issueEscalationIndexer.indexBulkData(dataList);
      await issueEscalationIndexer.deleteRedisCache();
    }
    total += dataList.length;
  }

  return total;
};

const indexMongoAdminConfigData = async () => {
  const mongoAdminConfigIndexer = new ElasticIndexer("mongoAdminConfig", {
    isSilent: true,
  });
  console.log("Starting to update indexes for MongoAdminConfig");

  const idList =
    (await getIdListOfMongoAdminConfigByField("isActive", true)) ?? [];
  const chunkSize = 500;
  let total = 0;
  for (let i = 0; i < idList.length; i += chunkSize) {
    const chunk = idList.slice(i, i + chunkSize);
    const dataList = await getMongoAdminConfigById(chunk);
    if (dataList.length) {
      await mongoAdminConfigIndexer.indexBulkData(dataList);
      await mongoAdminConfigIndexer.deleteRedisCache();
    }
    total += dataList.length;
  }

  return total;
};

const indexExternalNotificationConfigData = async () => {
  const externalNotificationConfigIndexer = new ElasticIndexer(
    "externalNotificationConfig",
    { isSilent: true },
  );
  console.log("Starting to update indexes for ExternalNotificationConfig");

  const idList =
    (await getIdListOfExternalNotificationConfigByField("isActive", true)) ??
    [];
  const chunkSize = 500;
  let total = 0;
  for (let i = 0; i < idList.length; i += chunkSize) {
    const chunk = idList.slice(i, i + chunkSize);
    const dataList = await getExternalNotificationConfigById(chunk);
    if (dataList.length) {
      await externalNotificationConfigIndexer.indexBulkData(dataList);
      await externalNotificationConfigIndexer.deleteRedisCache();
    }
    total += dataList.length;
  }

  return total;
};

const indexSystemBackupAuditData = async () => {
  const systemBackupAuditIndexer = new ElasticIndexer("systemBackupAudit", {
    isSilent: true,
  });
  console.log("Starting to update indexes for SystemBackupAudit");

  const idList =
    (await getIdListOfSystemBackupAuditByField("isActive", true)) ?? [];
  const chunkSize = 500;
  let total = 0;
  for (let i = 0; i < idList.length; i += chunkSize) {
    const chunk = idList.slice(i, i + chunkSize);
    const dataList = await getSystemBackupAuditById(chunk);
    if (dataList.length) {
      await systemBackupAuditIndexer.indexBulkData(dataList);
      await systemBackupAuditIndexer.deleteRedisCache();
    }
    total += dataList.length;
  }

  return total;
};

const indexBranchPurchaseOrderData = async () => {
  const branchPurchaseOrderIndexer = new ElasticIndexer("branchPurchaseOrder", {
    isSilent: true,
  });
  console.log("Starting to update indexes for BranchPurchaseOrder");

  const idList =
    (await getIdListOfBranchPurchaseOrderByField("isActive", true)) ?? [];
  const chunkSize = 500;
  let total = 0;
  for (let i = 0; i < idList.length; i += chunkSize) {
    const chunk = idList.slice(i, i + chunkSize);
    const dataList = await getBranchPurchaseOrderById(chunk);
    if (dataList.length) {
      await branchPurchaseOrderIndexer.indexBulkData(dataList);
      await branchPurchaseOrderIndexer.deleteRedisCache();
    }
    total += dataList.length;
  }

  return total;
};

const indexTregtData = async () => {
  const tregtIndexer = new ElasticIndexer("tregt", { isSilent: true });
  console.log("Starting to update indexes for Tregt");

  const idList = (await getIdListOfTregtByField("isActive", true)) ?? [];
  const chunkSize = 500;
  let total = 0;
  for (let i = 0; i < idList.length; i += chunkSize) {
    const chunk = idList.slice(i, i + chunkSize);
    const dataList = await getTregtById(chunk);
    if (dataList.length) {
      await tregtIndexer.indexBulkData(dataList);
      await tregtIndexer.deleteRedisCache();
    }
    total += dataList.length;
  }

  return total;
};

const indexAdminOpsShareTokenData = async () => {
  const adminOpsShareTokenIndexer = new ElasticIndexer("adminOpsShareToken", {
    isSilent: true,
  });
  console.log("Starting to update indexes for AdminOpsShareToken");

  const idList =
    (await getIdListOfAdminOpsShareTokenByField("isActive", true)) ?? [];
  const chunkSize = 500;
  let total = 0;
  for (let i = 0; i < idList.length; i += chunkSize) {
    const chunk = idList.slice(i, i + chunkSize);
    const dataList = await getAdminOpsShareTokenById(chunk);
    if (dataList.length) {
      await adminOpsShareTokenIndexer.indexBulkData(dataList);
      await adminOpsShareTokenIndexer.deleteRedisCache();
    }
    total += dataList.length;
  }

  return total;
};

const syncElasticIndexData = async () => {
  const startTime = new Date();
  console.log("syncElasticIndexData started", startTime);

  try {
    const dataCount = await indexBranchStaffAssignmentData();
    console.log(
      "BranchStaffAssignment agregated data is indexed, total branchStaffAssignments:",
      dataCount,
    );
  } catch (err) {
    console.log(
      "Elastic Index Error When Syncing BranchStaffAssignment data",
      err.toString(),
    );
  }

  try {
    const dataCount = await indexIssueEscalationData();
    console.log(
      "IssueEscalation agregated data is indexed, total issueEscalations:",
      dataCount,
    );
  } catch (err) {
    console.log(
      "Elastic Index Error When Syncing IssueEscalation data",
      err.toString(),
    );
  }

  try {
    const dataCount = await indexMongoAdminConfigData();
    console.log(
      "MongoAdminConfig agregated data is indexed, total mongoAdminConfigs:",
      dataCount,
    );
  } catch (err) {
    console.log(
      "Elastic Index Error When Syncing MongoAdminConfig data",
      err.toString(),
    );
  }

  try {
    const dataCount = await indexExternalNotificationConfigData();
    console.log(
      "ExternalNotificationConfig agregated data is indexed, total externalNotificationConfigs:",
      dataCount,
    );
  } catch (err) {
    console.log(
      "Elastic Index Error When Syncing ExternalNotificationConfig data",
      err.toString(),
    );
  }

  try {
    const dataCount = await indexSystemBackupAuditData();
    console.log(
      "SystemBackupAudit agregated data is indexed, total systemBackupAudits:",
      dataCount,
    );
  } catch (err) {
    console.log(
      "Elastic Index Error When Syncing SystemBackupAudit data",
      err.toString(),
    );
  }

  try {
    const dataCount = await indexBranchPurchaseOrderData();
    console.log(
      "BranchPurchaseOrder agregated data is indexed, total branchPurchaseOrders:",
      dataCount,
    );
  } catch (err) {
    console.log(
      "Elastic Index Error When Syncing BranchPurchaseOrder data",
      err.toString(),
    );
  }

  try {
    const dataCount = await indexTregtData();
    console.log("Tregt agregated data is indexed, total tregts:", dataCount);
  } catch (err) {
    console.log("Elastic Index Error When Syncing Tregt data", err.toString());
  }

  try {
    const dataCount = await indexAdminOpsShareTokenData();
    console.log(
      "AdminOpsShareToken agregated data is indexed, total adminOpsShareTokens:",
      dataCount,
    );
  } catch (err) {
    console.log(
      "Elastic Index Error When Syncing AdminOpsShareToken data",
      err.toString(),
    );
  }

  const elapsedTime = new Date() - startTime;
  console.log("initElasticIndexData ended -> elapsedTime:", elapsedTime);
};

module.exports = syncElasticIndexData;

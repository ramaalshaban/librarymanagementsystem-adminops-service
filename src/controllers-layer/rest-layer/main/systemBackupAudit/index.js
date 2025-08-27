const express = require("express");

// SystemBackupAudit Db Object Rest Api Router
const systemBackupAuditRouter = express.Router();

// add SystemBackupAudit controllers

// getSystemBackupAudit controller
systemBackupAuditRouter.get(
  "/systembackupaudits/:systemBackupAuditId",
  require("./get-systembackupaudit"),
);
// createSystemBackupAudit controller
systemBackupAuditRouter.post(
  "/systembackupaudits",
  require("./create-systembackupaudit"),
);
// updateSystemBackupAudit controller
systemBackupAuditRouter.patch(
  "/systembackupaudits/:systemBackupAuditId",
  require("./update-systembackupaudit"),
);
// deleteSystemBackupAudit controller
systemBackupAuditRouter.delete(
  "/systembackupaudits/:systemBackupAuditId",
  require("./delete-systembackupaudit"),
);
// listSystemBackupAudits controller
systemBackupAuditRouter.get(
  "/systembackupaudits",
  require("./list-systembackupaudits"),
);

module.exports = systemBackupAuditRouter;

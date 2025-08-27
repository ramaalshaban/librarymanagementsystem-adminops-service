module.exports = (headers) => {
  // SystemBackupAudit Db Object Rest Api Router
  const systemBackupAuditMcpRouter = [];
  // getSystemBackupAudit controller
  systemBackupAuditMcpRouter.push(require("./get-systembackupaudit")(headers));
  // createSystemBackupAudit controller
  systemBackupAuditMcpRouter.push(
    require("./create-systembackupaudit")(headers),
  );
  // updateSystemBackupAudit controller
  systemBackupAuditMcpRouter.push(
    require("./update-systembackupaudit")(headers),
  );
  // deleteSystemBackupAudit controller
  systemBackupAuditMcpRouter.push(
    require("./delete-systembackupaudit")(headers),
  );
  // listSystemBackupAudits controller
  systemBackupAuditMcpRouter.push(
    require("./list-systembackupaudits")(headers),
  );
  return systemBackupAuditMcpRouter;
};

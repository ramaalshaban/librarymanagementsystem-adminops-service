const { UpdateSystemBackupAuditManager } = require("managers");

const AdminOpsRestController = require("../../AdminOpsServiceRestController");

class UpdateSystemBackupAuditRestController extends AdminOpsRestController {
  constructor(req, res) {
    super("updateSystemBackupAudit", "updatesystembackupaudit", req, res);
    this.dataName = "systemBackupAudit";
    this.crudType = "update";
    this.status = 200;
    this.httpMethod = "PATCH";
  }

  createApiManager() {
    return new UpdateSystemBackupAuditManager(this._req, "rest");
  }
}

const updateSystemBackupAudit = async (req, res, next) => {
  const updateSystemBackupAuditRestController =
    new UpdateSystemBackupAuditRestController(req, res);
  try {
    await updateSystemBackupAuditRestController.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = updateSystemBackupAudit;

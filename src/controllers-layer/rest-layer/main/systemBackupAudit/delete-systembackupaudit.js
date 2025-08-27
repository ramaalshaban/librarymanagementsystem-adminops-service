const { DeleteSystemBackupAuditManager } = require("managers");

const AdminOpsRestController = require("../../AdminOpsServiceRestController");

class DeleteSystemBackupAuditRestController extends AdminOpsRestController {
  constructor(req, res) {
    super("deleteSystemBackupAudit", "deletesystembackupaudit", req, res);
    this.dataName = "systemBackupAudit";
    this.crudType = "delete";
    this.status = 200;
    this.httpMethod = "DELETE";
  }

  createApiManager() {
    return new DeleteSystemBackupAuditManager(this._req, "rest");
  }
}

const deleteSystemBackupAudit = async (req, res, next) => {
  const deleteSystemBackupAuditRestController =
    new DeleteSystemBackupAuditRestController(req, res);
  try {
    await deleteSystemBackupAuditRestController.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = deleteSystemBackupAudit;

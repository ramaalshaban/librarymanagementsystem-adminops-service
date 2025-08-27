const { GetSystemBackupAuditManager } = require("managers");

const AdminOpsRestController = require("../../AdminOpsServiceRestController");

class GetSystemBackupAuditRestController extends AdminOpsRestController {
  constructor(req, res) {
    super("getSystemBackupAudit", "getsystembackupaudit", req, res);
    this.dataName = "systemBackupAudit";
    this.crudType = "get";
    this.status = 200;
    this.httpMethod = "GET";
  }

  createApiManager() {
    return new GetSystemBackupAuditManager(this._req, "rest");
  }
}

const getSystemBackupAudit = async (req, res, next) => {
  const getSystemBackupAuditRestController =
    new GetSystemBackupAuditRestController(req, res);
  try {
    await getSystemBackupAuditRestController.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = getSystemBackupAudit;

const { CreateSystemBackupAuditManager } = require("managers");

const AdminOpsRestController = require("../../AdminOpsServiceRestController");

class CreateSystemBackupAuditRestController extends AdminOpsRestController {
  constructor(req, res) {
    super("createSystemBackupAudit", "createsystembackupaudit", req, res);
    this.dataName = "systemBackupAudit";
    this.crudType = "create";
    this.status = 201;
    this.httpMethod = "POST";
  }

  createApiManager() {
    return new CreateSystemBackupAuditManager(this._req, "rest");
  }
}

const createSystemBackupAudit = async (req, res, next) => {
  const createSystemBackupAuditRestController =
    new CreateSystemBackupAuditRestController(req, res);
  try {
    await createSystemBackupAuditRestController.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = createSystemBackupAudit;

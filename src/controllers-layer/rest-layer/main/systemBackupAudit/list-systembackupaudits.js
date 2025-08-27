const { ListSystemBackupAuditsManager } = require("managers");

const AdminOpsRestController = require("../../AdminOpsServiceRestController");

class ListSystemBackupAuditsRestController extends AdminOpsRestController {
  constructor(req, res) {
    super("listSystemBackupAudits", "listsystembackupaudits", req, res);
    this.dataName = "systemBackupAudits";
    this.crudType = "getList";
    this.status = 200;
    this.httpMethod = "GET";
  }

  createApiManager() {
    return new ListSystemBackupAuditsManager(this._req, "rest");
  }
}

const listSystemBackupAudits = async (req, res, next) => {
  const listSystemBackupAuditsRestController =
    new ListSystemBackupAuditsRestController(req, res);
  try {
    await listSystemBackupAuditsRestController.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = listSystemBackupAudits;

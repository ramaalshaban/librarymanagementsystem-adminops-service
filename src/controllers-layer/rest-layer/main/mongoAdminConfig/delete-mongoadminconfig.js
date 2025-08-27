const { DeleteMongoAdminConfigManager } = require("managers");

const AdminOpsRestController = require("../../AdminOpsServiceRestController");

class DeleteMongoAdminConfigRestController extends AdminOpsRestController {
  constructor(req, res) {
    super("deleteMongoAdminConfig", "deletemongoadminconfig", req, res);
    this.dataName = "mongoAdminConfig";
    this.crudType = "delete";
    this.status = 200;
    this.httpMethod = "DELETE";
  }

  createApiManager() {
    return new DeleteMongoAdminConfigManager(this._req, "rest");
  }
}

const deleteMongoAdminConfig = async (req, res, next) => {
  const deleteMongoAdminConfigRestController =
    new DeleteMongoAdminConfigRestController(req, res);
  try {
    await deleteMongoAdminConfigRestController.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = deleteMongoAdminConfig;

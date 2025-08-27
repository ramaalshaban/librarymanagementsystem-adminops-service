const { UpdateMongoAdminConfigManager } = require("managers");

const AdminOpsRestController = require("../../AdminOpsServiceRestController");

class UpdateMongoAdminConfigRestController extends AdminOpsRestController {
  constructor(req, res) {
    super("updateMongoAdminConfig", "updatemongoadminconfig", req, res);
    this.dataName = "mongoAdminConfig";
    this.crudType = "update";
    this.status = 200;
    this.httpMethod = "PATCH";
  }

  createApiManager() {
    return new UpdateMongoAdminConfigManager(this._req, "rest");
  }
}

const updateMongoAdminConfig = async (req, res, next) => {
  const updateMongoAdminConfigRestController =
    new UpdateMongoAdminConfigRestController(req, res);
  try {
    await updateMongoAdminConfigRestController.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = updateMongoAdminConfig;

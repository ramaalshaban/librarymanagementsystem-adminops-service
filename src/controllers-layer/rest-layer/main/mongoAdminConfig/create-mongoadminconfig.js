const { CreateMongoAdminConfigManager } = require("managers");

const AdminOpsRestController = require("../../AdminOpsServiceRestController");

class CreateMongoAdminConfigRestController extends AdminOpsRestController {
  constructor(req, res) {
    super("createMongoAdminConfig", "createmongoadminconfig", req, res);
    this.dataName = "mongoAdminConfig";
    this.crudType = "create";
    this.status = 201;
    this.httpMethod = "POST";
  }

  createApiManager() {
    return new CreateMongoAdminConfigManager(this._req, "rest");
  }
}

const createMongoAdminConfig = async (req, res, next) => {
  const createMongoAdminConfigRestController =
    new CreateMongoAdminConfigRestController(req, res);
  try {
    await createMongoAdminConfigRestController.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = createMongoAdminConfig;

const { GetMongoAdminConfigManager } = require("managers");

const AdminOpsRestController = require("../../AdminOpsServiceRestController");

class GetMongoAdminConfigRestController extends AdminOpsRestController {
  constructor(req, res) {
    super("getMongoAdminConfig", "getmongoadminconfig", req, res);
    this.dataName = "mongoAdminConfig";
    this.crudType = "get";
    this.status = 200;
    this.httpMethod = "GET";
  }

  createApiManager() {
    return new GetMongoAdminConfigManager(this._req, "rest");
  }
}

const getMongoAdminConfig = async (req, res, next) => {
  const getMongoAdminConfigRestController =
    new GetMongoAdminConfigRestController(req, res);
  try {
    await getMongoAdminConfigRestController.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = getMongoAdminConfig;

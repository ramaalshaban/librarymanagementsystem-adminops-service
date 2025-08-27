const { ListMongoAdminConfigsManager } = require("managers");

const AdminOpsRestController = require("../../AdminOpsServiceRestController");

class ListMongoAdminConfigsRestController extends AdminOpsRestController {
  constructor(req, res) {
    super("listMongoAdminConfigs", "listmongoadminconfigs", req, res);
    this.dataName = "mongoAdminConfigs";
    this.crudType = "getList";
    this.status = 200;
    this.httpMethod = "GET";
  }

  createApiManager() {
    return new ListMongoAdminConfigsManager(this._req, "rest");
  }
}

const listMongoAdminConfigs = async (req, res, next) => {
  const listMongoAdminConfigsRestController =
    new ListMongoAdminConfigsRestController(req, res);
  try {
    await listMongoAdminConfigsRestController.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = listMongoAdminConfigs;

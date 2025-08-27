const { GetExternalNotificationConfigManager } = require("managers");

const AdminOpsRestController = require("../../AdminOpsServiceRestController");

class GetExternalNotificationConfigRestController extends AdminOpsRestController {
  constructor(req, res) {
    super(
      "getExternalNotificationConfig",
      "getexternalnotificationconfig",
      req,
      res,
    );
    this.dataName = "externalNotificationConfig";
    this.crudType = "get";
    this.status = 200;
    this.httpMethod = "GET";
  }

  createApiManager() {
    return new GetExternalNotificationConfigManager(this._req, "rest");
  }
}

const getExternalNotificationConfig = async (req, res, next) => {
  const getExternalNotificationConfigRestController =
    new GetExternalNotificationConfigRestController(req, res);
  try {
    await getExternalNotificationConfigRestController.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = getExternalNotificationConfig;

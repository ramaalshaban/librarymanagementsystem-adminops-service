const { ListExternalNotificationConfigsManager } = require("managers");

const AdminOpsRestController = require("../../AdminOpsServiceRestController");

class ListExternalNotificationConfigsRestController extends AdminOpsRestController {
  constructor(req, res) {
    super(
      "listExternalNotificationConfigs",
      "listexternalnotificationconfigs",
      req,
      res,
    );
    this.dataName = "externalNotificationConfigs";
    this.crudType = "getList";
    this.status = 200;
    this.httpMethod = "GET";
  }

  createApiManager() {
    return new ListExternalNotificationConfigsManager(this._req, "rest");
  }
}

const listExternalNotificationConfigs = async (req, res, next) => {
  const listExternalNotificationConfigsRestController =
    new ListExternalNotificationConfigsRestController(req, res);
  try {
    await listExternalNotificationConfigsRestController.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = listExternalNotificationConfigs;

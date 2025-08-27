const { UpdateExternalNotificationConfigManager } = require("managers");

const AdminOpsRestController = require("../../AdminOpsServiceRestController");

class UpdateExternalNotificationConfigRestController extends AdminOpsRestController {
  constructor(req, res) {
    super(
      "updateExternalNotificationConfig",
      "updateexternalnotificationconfig",
      req,
      res,
    );
    this.dataName = "externalNotificationConfig";
    this.crudType = "update";
    this.status = 200;
    this.httpMethod = "PATCH";
  }

  createApiManager() {
    return new UpdateExternalNotificationConfigManager(this._req, "rest");
  }
}

const updateExternalNotificationConfig = async (req, res, next) => {
  const updateExternalNotificationConfigRestController =
    new UpdateExternalNotificationConfigRestController(req, res);
  try {
    await updateExternalNotificationConfigRestController.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = updateExternalNotificationConfig;

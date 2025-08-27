const { DeleteExternalNotificationConfigManager } = require("managers");

const AdminOpsRestController = require("../../AdminOpsServiceRestController");

class DeleteExternalNotificationConfigRestController extends AdminOpsRestController {
  constructor(req, res) {
    super(
      "deleteExternalNotificationConfig",
      "deleteexternalnotificationconfig",
      req,
      res,
    );
    this.dataName = "externalNotificationConfig";
    this.crudType = "delete";
    this.status = 200;
    this.httpMethod = "DELETE";
  }

  createApiManager() {
    return new DeleteExternalNotificationConfigManager(this._req, "rest");
  }
}

const deleteExternalNotificationConfig = async (req, res, next) => {
  const deleteExternalNotificationConfigRestController =
    new DeleteExternalNotificationConfigRestController(req, res);
  try {
    await deleteExternalNotificationConfigRestController.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = deleteExternalNotificationConfig;

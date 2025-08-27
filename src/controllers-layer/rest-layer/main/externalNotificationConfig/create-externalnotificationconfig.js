const { CreateExternalNotificationConfigManager } = require("managers");

const AdminOpsRestController = require("../../AdminOpsServiceRestController");

class CreateExternalNotificationConfigRestController extends AdminOpsRestController {
  constructor(req, res) {
    super(
      "createExternalNotificationConfig",
      "createexternalnotificationconfig",
      req,
      res,
    );
    this.dataName = "externalNotificationConfig";
    this.crudType = "create";
    this.status = 201;
    this.httpMethod = "POST";
  }

  createApiManager() {
    return new CreateExternalNotificationConfigManager(this._req, "rest");
  }
}

const createExternalNotificationConfig = async (req, res, next) => {
  const createExternalNotificationConfigRestController =
    new CreateExternalNotificationConfigRestController(req, res);
  try {
    await createExternalNotificationConfigRestController.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = createExternalNotificationConfig;

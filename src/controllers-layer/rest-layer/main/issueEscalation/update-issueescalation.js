const { UpdateIssueEscalationManager } = require("managers");

const AdminOpsRestController = require("../../AdminOpsServiceRestController");

class UpdateIssueEscalationRestController extends AdminOpsRestController {
  constructor(req, res) {
    super("updateIssueEscalation", "updateissueescalation", req, res);
    this.dataName = "issueEscalation";
    this.crudType = "update";
    this.status = 200;
    this.httpMethod = "PATCH";
  }

  createApiManager() {
    return new UpdateIssueEscalationManager(this._req, "rest");
  }
}

const updateIssueEscalation = async (req, res, next) => {
  const updateIssueEscalationRestController =
    new UpdateIssueEscalationRestController(req, res);
  try {
    await updateIssueEscalationRestController.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = updateIssueEscalation;

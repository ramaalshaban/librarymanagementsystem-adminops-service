const { DeleteIssueEscalationManager } = require("managers");

const AdminOpsRestController = require("../../AdminOpsServiceRestController");

class DeleteIssueEscalationRestController extends AdminOpsRestController {
  constructor(req, res) {
    super("deleteIssueEscalation", "deleteissueescalation", req, res);
    this.dataName = "issueEscalation";
    this.crudType = "delete";
    this.status = 200;
    this.httpMethod = "DELETE";
  }

  createApiManager() {
    return new DeleteIssueEscalationManager(this._req, "rest");
  }
}

const deleteIssueEscalation = async (req, res, next) => {
  const deleteIssueEscalationRestController =
    new DeleteIssueEscalationRestController(req, res);
  try {
    await deleteIssueEscalationRestController.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = deleteIssueEscalation;

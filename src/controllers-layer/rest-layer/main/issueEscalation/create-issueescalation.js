const { CreateIssueEscalationManager } = require("managers");

const AdminOpsRestController = require("../../AdminOpsServiceRestController");

class CreateIssueEscalationRestController extends AdminOpsRestController {
  constructor(req, res) {
    super("createIssueEscalation", "createissueescalation", req, res);
    this.dataName = "issueEscalation";
    this.crudType = "create";
    this.status = 201;
    this.httpMethod = "POST";
  }

  createApiManager() {
    return new CreateIssueEscalationManager(this._req, "rest");
  }
}

const createIssueEscalation = async (req, res, next) => {
  const createIssueEscalationRestController =
    new CreateIssueEscalationRestController(req, res);
  try {
    await createIssueEscalationRestController.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = createIssueEscalation;

const { GetIssueEscalationManager } = require("managers");

const AdminOpsRestController = require("../../AdminOpsServiceRestController");

class GetIssueEscalationRestController extends AdminOpsRestController {
  constructor(req, res) {
    super("getIssueEscalation", "getissueescalation", req, res);
    this.dataName = "issueEscalation";
    this.crudType = "get";
    this.status = 200;
    this.httpMethod = "GET";
  }

  createApiManager() {
    return new GetIssueEscalationManager(this._req, "rest");
  }
}

const getIssueEscalation = async (req, res, next) => {
  const getIssueEscalationRestController = new GetIssueEscalationRestController(
    req,
    res,
  );
  try {
    await getIssueEscalationRestController.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = getIssueEscalation;

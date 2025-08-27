const { ListIssueEscalationsManager } = require("managers");

const AdminOpsRestController = require("../../AdminOpsServiceRestController");

class ListIssueEscalationsRestController extends AdminOpsRestController {
  constructor(req, res) {
    super("listIssueEscalations", "listissueescalations", req, res);
    this.dataName = "issueEscalations";
    this.crudType = "getList";
    this.status = 200;
    this.httpMethod = "GET";
  }

  createApiManager() {
    return new ListIssueEscalationsManager(this._req, "rest");
  }
}

const listIssueEscalations = async (req, res, next) => {
  const listIssueEscalationsRestController =
    new ListIssueEscalationsRestController(req, res);
  try {
    await listIssueEscalationsRestController.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = listIssueEscalations;

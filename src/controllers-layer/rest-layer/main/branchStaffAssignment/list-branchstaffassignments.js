const { ListBranchStaffAssignmentsManager } = require("managers");

const AdminOpsRestController = require("../../AdminOpsServiceRestController");

class ListBranchStaffAssignmentsRestController extends AdminOpsRestController {
  constructor(req, res) {
    super("listBranchStaffAssignments", "listbranchstaffassignments", req, res);
    this.dataName = "branchStaffAssignments";
    this.crudType = "getList";
    this.status = 200;
    this.httpMethod = "GET";
  }

  createApiManager() {
    return new ListBranchStaffAssignmentsManager(this._req, "rest");
  }
}

const listBranchStaffAssignments = async (req, res, next) => {
  const listBranchStaffAssignmentsRestController =
    new ListBranchStaffAssignmentsRestController(req, res);
  try {
    await listBranchStaffAssignmentsRestController.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = listBranchStaffAssignments;

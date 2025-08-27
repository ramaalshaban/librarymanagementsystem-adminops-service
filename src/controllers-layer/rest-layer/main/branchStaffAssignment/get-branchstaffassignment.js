const { GetBranchStaffAssignmentManager } = require("managers");

const AdminOpsRestController = require("../../AdminOpsServiceRestController");

class GetBranchStaffAssignmentRestController extends AdminOpsRestController {
  constructor(req, res) {
    super("getBranchStaffAssignment", "getbranchstaffassignment", req, res);
    this.dataName = "branchStaffAssignment";
    this.crudType = "get";
    this.status = 200;
    this.httpMethod = "GET";
  }

  createApiManager() {
    return new GetBranchStaffAssignmentManager(this._req, "rest");
  }
}

const getBranchStaffAssignment = async (req, res, next) => {
  const getBranchStaffAssignmentRestController =
    new GetBranchStaffAssignmentRestController(req, res);
  try {
    await getBranchStaffAssignmentRestController.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = getBranchStaffAssignment;

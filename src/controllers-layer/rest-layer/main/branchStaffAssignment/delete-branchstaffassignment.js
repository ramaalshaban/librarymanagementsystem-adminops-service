const { DeleteBranchStaffAssignmentManager } = require("managers");

const AdminOpsRestController = require("../../AdminOpsServiceRestController");

class DeleteBranchStaffAssignmentRestController extends AdminOpsRestController {
  constructor(req, res) {
    super(
      "deleteBranchStaffAssignment",
      "deletebranchstaffassignment",
      req,
      res,
    );
    this.dataName = "branchStaffAssignment";
    this.crudType = "delete";
    this.status = 200;
    this.httpMethod = "DELETE";
  }

  createApiManager() {
    return new DeleteBranchStaffAssignmentManager(this._req, "rest");
  }
}

const deleteBranchStaffAssignment = async (req, res, next) => {
  const deleteBranchStaffAssignmentRestController =
    new DeleteBranchStaffAssignmentRestController(req, res);
  try {
    await deleteBranchStaffAssignmentRestController.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = deleteBranchStaffAssignment;

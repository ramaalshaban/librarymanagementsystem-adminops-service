const { UpdateBranchStaffAssignmentManager } = require("managers");

const AdminOpsRestController = require("../../AdminOpsServiceRestController");

class UpdateBranchStaffAssignmentRestController extends AdminOpsRestController {
  constructor(req, res) {
    super(
      "updateBranchStaffAssignment",
      "updatebranchstaffassignment",
      req,
      res,
    );
    this.dataName = "branchStaffAssignment";
    this.crudType = "update";
    this.status = 200;
    this.httpMethod = "PATCH";
  }

  createApiManager() {
    return new UpdateBranchStaffAssignmentManager(this._req, "rest");
  }
}

const updateBranchStaffAssignment = async (req, res, next) => {
  const updateBranchStaffAssignmentRestController =
    new UpdateBranchStaffAssignmentRestController(req, res);
  try {
    await updateBranchStaffAssignmentRestController.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = updateBranchStaffAssignment;

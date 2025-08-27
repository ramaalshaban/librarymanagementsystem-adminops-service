const { CreateBranchStaffAssignmentManager } = require("managers");

const AdminOpsRestController = require("../../AdminOpsServiceRestController");

class CreateBranchStaffAssignmentRestController extends AdminOpsRestController {
  constructor(req, res) {
    super(
      "createBranchStaffAssignment",
      "createbranchstaffassignment",
      req,
      res,
    );
    this.dataName = "branchStaffAssignment";
    this.crudType = "create";
    this.status = 201;
    this.httpMethod = "POST";
  }

  createApiManager() {
    return new CreateBranchStaffAssignmentManager(this._req, "rest");
  }
}

const createBranchStaffAssignment = async (req, res, next) => {
  const createBranchStaffAssignmentRestController =
    new CreateBranchStaffAssignmentRestController(req, res);
  try {
    await createBranchStaffAssignmentRestController.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = createBranchStaffAssignment;

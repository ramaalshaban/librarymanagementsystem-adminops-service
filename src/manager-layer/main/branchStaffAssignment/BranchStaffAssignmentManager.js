const { HttpServerError, HttpError, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");

const AdminOpsServiceManager = require("../../service-manager/AdminOpsServiceManager");

/* Base Class For the Crud Routes Of DbObject BranchStaffAssignment */
class BranchStaffAssignmentManager extends AdminOpsServiceManager {
  constructor(request, options) {
    super(request, options);
    this.objectName = "branchStaffAssignment";
    this.modelName = "BranchStaffAssignment";
  }

  toJSON() {
    const jsonObj = super.toJSON();

    return jsonObj;
  }
}

module.exports = BranchStaffAssignmentManager;

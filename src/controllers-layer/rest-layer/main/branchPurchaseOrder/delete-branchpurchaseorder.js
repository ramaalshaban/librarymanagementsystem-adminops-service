const { DeleteBranchPurchaseOrderManager } = require("managers");

const AdminOpsRestController = require("../../AdminOpsServiceRestController");

class DeleteBranchPurchaseOrderRestController extends AdminOpsRestController {
  constructor(req, res) {
    super("deleteBranchPurchaseOrder", "deletebranchpurchaseorder", req, res);
    this.dataName = "branchPurchaseOrder";
    this.crudType = "delete";
    this.status = 200;
    this.httpMethod = "DELETE";
  }

  createApiManager() {
    return new DeleteBranchPurchaseOrderManager(this._req, "rest");
  }
}

const deleteBranchPurchaseOrder = async (req, res, next) => {
  const deleteBranchPurchaseOrderRestController =
    new DeleteBranchPurchaseOrderRestController(req, res);
  try {
    await deleteBranchPurchaseOrderRestController.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = deleteBranchPurchaseOrder;

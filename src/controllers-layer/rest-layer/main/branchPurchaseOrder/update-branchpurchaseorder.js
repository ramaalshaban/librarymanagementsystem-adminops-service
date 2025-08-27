const { UpdateBranchPurchaseOrderManager } = require("managers");

const AdminOpsRestController = require("../../AdminOpsServiceRestController");

class UpdateBranchPurchaseOrderRestController extends AdminOpsRestController {
  constructor(req, res) {
    super("updateBranchPurchaseOrder", "updatebranchpurchaseorder", req, res);
    this.dataName = "branchPurchaseOrder";
    this.crudType = "update";
    this.status = 200;
    this.httpMethod = "PATCH";
  }

  createApiManager() {
    return new UpdateBranchPurchaseOrderManager(this._req, "rest");
  }
}

const updateBranchPurchaseOrder = async (req, res, next) => {
  const updateBranchPurchaseOrderRestController =
    new UpdateBranchPurchaseOrderRestController(req, res);
  try {
    await updateBranchPurchaseOrderRestController.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = updateBranchPurchaseOrder;

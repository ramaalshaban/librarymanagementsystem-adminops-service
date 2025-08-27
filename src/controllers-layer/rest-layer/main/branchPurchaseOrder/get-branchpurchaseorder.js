const { GetBranchPurchaseOrderManager } = require("managers");

const AdminOpsRestController = require("../../AdminOpsServiceRestController");

class GetBranchPurchaseOrderRestController extends AdminOpsRestController {
  constructor(req, res) {
    super("getBranchPurchaseOrder", "getbranchpurchaseorder", req, res);
    this.dataName = "branchPurchaseOrder";
    this.crudType = "get";
    this.status = 200;
    this.httpMethod = "GET";
  }

  createApiManager() {
    return new GetBranchPurchaseOrderManager(this._req, "rest");
  }
}

const getBranchPurchaseOrder = async (req, res, next) => {
  const getBranchPurchaseOrderRestController =
    new GetBranchPurchaseOrderRestController(req, res);
  try {
    await getBranchPurchaseOrderRestController.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = getBranchPurchaseOrder;

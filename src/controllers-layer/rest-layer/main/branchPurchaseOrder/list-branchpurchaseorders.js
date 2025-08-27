const { ListBranchPurchaseOrdersManager } = require("managers");

const AdminOpsRestController = require("../../AdminOpsServiceRestController");

class ListBranchPurchaseOrdersRestController extends AdminOpsRestController {
  constructor(req, res) {
    super("listBranchPurchaseOrders", "listbranchpurchaseorders", req, res);
    this.dataName = "branchPurchaseOrders";
    this.crudType = "getList";
    this.status = 200;
    this.httpMethod = "GET";
  }

  createApiManager() {
    return new ListBranchPurchaseOrdersManager(this._req, "rest");
  }
}

const listBranchPurchaseOrders = async (req, res, next) => {
  const listBranchPurchaseOrdersRestController =
    new ListBranchPurchaseOrdersRestController(req, res);
  try {
    await listBranchPurchaseOrdersRestController.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = listBranchPurchaseOrders;

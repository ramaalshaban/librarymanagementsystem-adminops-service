const { CreateBranchPurchaseOrderManager } = require("managers");

const AdminOpsRestController = require("../../AdminOpsServiceRestController");

class CreateBranchPurchaseOrderRestController extends AdminOpsRestController {
  constructor(req, res) {
    super("createBranchPurchaseOrder", "createbranchpurchaseorder", req, res);
    this.dataName = "branchPurchaseOrder";
    this.crudType = "create";
    this.status = 201;
    this.httpMethod = "POST";
  }

  createApiManager() {
    return new CreateBranchPurchaseOrderManager(this._req, "rest");
  }
}

const createBranchPurchaseOrder = async (req, res, next) => {
  const createBranchPurchaseOrderRestController =
    new CreateBranchPurchaseOrderRestController(req, res);
  try {
    await createBranchPurchaseOrderRestController.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = createBranchPurchaseOrder;

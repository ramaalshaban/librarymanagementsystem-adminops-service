const { HttpServerError } = require("common");

const { BranchPurchaseOrder } = require("models");

const getBranchPurchaseOrderById = async (branchPurchaseOrderId) => {
  try {
    let branchPurchaseOrder;

    if (Array.isArray(branchPurchaseOrderId)) {
      branchPurchaseOrder = await BranchPurchaseOrder.find({
        _id: { $in: branchPurchaseOrderId },
        isActive: true,
      });
    } else {
      branchPurchaseOrder = await BranchPurchaseOrder.findOne({
        _id: branchPurchaseOrderId,
        isActive: true,
      });
    }

    if (!branchPurchaseOrder) {
      return null;
    }

    return Array.isArray(branchPurchaseOrderId)
      ? branchPurchaseOrder.map((item) => item.getData())
      : branchPurchaseOrder.getData();
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingBranchPurchaseOrderById",
      err,
    );
  }
};

module.exports = getBranchPurchaseOrderById;

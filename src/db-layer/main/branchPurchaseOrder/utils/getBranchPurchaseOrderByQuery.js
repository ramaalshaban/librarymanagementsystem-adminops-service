const { HttpServerError, BadRequestError } = require("common");

const { BranchPurchaseOrder } = require("models");

const getBranchPurchaseOrderByQuery = async (query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }

    const branchPurchaseOrder = await BranchPurchaseOrder.findOne({
      ...query,
      isActive: true,
    });

    if (!branchPurchaseOrder) return null;

    return branchPurchaseOrder.getData();
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingBranchPurchaseOrderByQuery",
      err,
    );
  }
};

module.exports = getBranchPurchaseOrderByQuery;

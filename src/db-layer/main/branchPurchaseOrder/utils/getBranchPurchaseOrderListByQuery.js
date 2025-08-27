const { HttpServerError, BadRequestError, NotFoundError } = require("common");
const { BranchPurchaseOrder } = require("models");

const getBranchPurchaseOrderListByQuery = async (query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }

    const branchPurchaseOrder = await BranchPurchaseOrder.find(query);

    if (!branchPurchaseOrder || branchPurchaseOrder.length === 0) return [];

    //should i add not found error or only return empty array?
    //      if (!branchPurchaseOrder || branchPurchaseOrder.length === 0) {
    //      throw new NotFoundError(
    //      `BranchPurchaseOrder with the specified criteria not found`
    //  );
    //}

    return branchPurchaseOrder.map((item) => item.getData());
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingBranchPurchaseOrderListByQuery",
      err,
    );
  }
};

module.exports = getBranchPurchaseOrderListByQuery;

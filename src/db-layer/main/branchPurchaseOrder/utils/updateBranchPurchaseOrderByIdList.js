const { HttpServerError } = require("common");

const { BranchPurchaseOrder } = require("models");

const updateBranchPurchaseOrderByIdList = async (idList, dataClause) => {
  try {
    await BranchPurchaseOrder.updateMany(
      { _id: { $in: idList }, isActive: true },
      dataClause,
    );

    const updatedDocs = await BranchPurchaseOrder.find(
      { _id: { $in: idList }, isActive: true },
      { _id: 1 },
    );

    const branchPurchaseOrderIdList = updatedDocs.map((doc) => doc._id);

    return branchPurchaseOrderIdList;
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenUpdatingBranchPurchaseOrderByIdList",
      err,
    );
  }
};

module.exports = updateBranchPurchaseOrderByIdList;

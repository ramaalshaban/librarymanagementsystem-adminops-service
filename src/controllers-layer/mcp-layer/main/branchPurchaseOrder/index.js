module.exports = (headers) => {
  // BranchPurchaseOrder Db Object Rest Api Router
  const branchPurchaseOrderMcpRouter = [];
  // getBranchPurchaseOrder controller
  branchPurchaseOrderMcpRouter.push(
    require("./get-branchpurchaseorder")(headers),
  );
  // createBranchPurchaseOrder controller
  branchPurchaseOrderMcpRouter.push(
    require("./create-branchpurchaseorder")(headers),
  );
  // updateBranchPurchaseOrder controller
  branchPurchaseOrderMcpRouter.push(
    require("./update-branchpurchaseorder")(headers),
  );
  // deleteBranchPurchaseOrder controller
  branchPurchaseOrderMcpRouter.push(
    require("./delete-branchpurchaseorder")(headers),
  );
  // listBranchPurchaseOrders controller
  branchPurchaseOrderMcpRouter.push(
    require("./list-branchpurchaseorders")(headers),
  );
  return branchPurchaseOrderMcpRouter;
};

const express = require("express");

// BranchPurchaseOrder Db Object Rest Api Router
const branchPurchaseOrderRouter = express.Router();

// add BranchPurchaseOrder controllers

// getBranchPurchaseOrder controller
branchPurchaseOrderRouter.get(
  "/branchpurchaseorders/:branchPurchaseOrderId",
  require("./get-branchpurchaseorder"),
);
// createBranchPurchaseOrder controller
branchPurchaseOrderRouter.post(
  "/branchpurchaseorders",
  require("./create-branchpurchaseorder"),
);
// updateBranchPurchaseOrder controller
branchPurchaseOrderRouter.patch(
  "/branchpurchaseorders/:branchPurchaseOrderId",
  require("./update-branchpurchaseorder"),
);
// deleteBranchPurchaseOrder controller
branchPurchaseOrderRouter.delete(
  "/branchpurchaseorders/:branchPurchaseOrderId",
  require("./delete-branchpurchaseorder"),
);
// listBranchPurchaseOrders controller
branchPurchaseOrderRouter.get(
  "/branchpurchaseorders",
  require("./list-branchpurchaseorders"),
);

module.exports = branchPurchaseOrderRouter;

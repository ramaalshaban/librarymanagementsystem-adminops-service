const utils = require("./utils");
const dbApiScripts = require("./dbApiScripts");

module.exports = {
  dbGetBranchpurchaseorder: require("./dbGetBranchpurchaseorder"),
  dbCreateBranchpurchaseorder: require("./dbCreateBranchpurchaseorder"),
  dbUpdateBranchpurchaseorder: require("./dbUpdateBranchpurchaseorder"),
  dbDeleteBranchpurchaseorder: require("./dbDeleteBranchpurchaseorder"),
  dbListBranchpurchaseorders: require("./dbListBranchpurchaseorders"),
  createBranchPurchaseOrder: utils.createBranchPurchaseOrder,
  getIdListOfBranchPurchaseOrderByField:
    utils.getIdListOfBranchPurchaseOrderByField,
  getBranchPurchaseOrderById: utils.getBranchPurchaseOrderById,
  getBranchPurchaseOrderAggById: utils.getBranchPurchaseOrderAggById,
  getBranchPurchaseOrderListByQuery: utils.getBranchPurchaseOrderListByQuery,
  getBranchPurchaseOrderStatsByQuery: utils.getBranchPurchaseOrderStatsByQuery,
  getBranchPurchaseOrderByQuery: utils.getBranchPurchaseOrderByQuery,
  updateBranchPurchaseOrderById: utils.updateBranchPurchaseOrderById,
  updateBranchPurchaseOrderByIdList: utils.updateBranchPurchaseOrderByIdList,
  updateBranchPurchaseOrderByQuery: utils.updateBranchPurchaseOrderByQuery,
  deleteBranchPurchaseOrderById: utils.deleteBranchPurchaseOrderById,
  deleteBranchPurchaseOrderByQuery: utils.deleteBranchPurchaseOrderByQuery,
};

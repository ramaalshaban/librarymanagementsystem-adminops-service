const { HttpServerError } = require("common");

const { BranchPurchaseOrder } = require("models");

const getBranchPurchaseOrderAggById = async (branchPurchaseOrderId) => {
  try {
    let branchPurchaseOrderQuery;

    if (Array.isArray(branchPurchaseOrderId)) {
      branchPurchaseOrderQuery = BranchPurchaseOrder.find({
        _id: { $in: branchPurchaseOrderId },
        isActive: true,
      });
    } else {
      branchPurchaseOrderQuery = BranchPurchaseOrder.findOne({
        _id: branchPurchaseOrderId,
        isActive: true,
      });
    }

    // Populate associations as needed

    const branchPurchaseOrder = await branchPurchaseOrderQuery.exec();

    if (!branchPurchaseOrder) {
      return null;
    }
    const branchPurchaseOrderData =
      Array.isArray(branchPurchaseOrderId) && branchPurchaseOrderId.length > 0
        ? branchPurchaseOrder.map((item) => item.getData())
        : branchPurchaseOrder.getData();

    // should i add this here?
    await BranchPurchaseOrder.getCqrsJoins(branchPurchaseOrderData);

    return branchPurchaseOrderData;
  } catch (err) {
    console.log(err);
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingBranchPurchaseOrderAggById",
      err,
    );
  }
};

// "__PropertyEnumSettings.doc": "Enum configuration for the data property, applicable when the property type is set to Enum. While enum values are stored as integers in the database, defining the enum options here allows Mindbricks to enrich API responses with human-readable labels, easing interpretation and UI integration. If not defined, only the numeric value will be returned.",
// "PropertyEnumSettings": {
//   "__hasEnumOptions.doc": "Enables support for named enum values when the property type is Enum. Though values are stored as integers, enabling this adds the symbolic name to API responses for clarity.",
//   "__config.doc": "The configuration object for enum options. Leave it null if hasEnumOptions is false.",
//   "__activation": "hasEnumOptions",
//  "__lines": "\
//  a-hasEnumOptions\
//  g-config",
//  "hasEnumOptions": "Boolean",
//  "config": "PropertyEnumSettingsConfig"
//},

module.exports = getBranchPurchaseOrderAggById;

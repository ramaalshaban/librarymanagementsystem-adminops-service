const { HttpServerError } = require("common");

const { BranchStaffAssignment } = require("models");

const getBranchStaffAssignmentAggById = async (branchStaffAssignmentId) => {
  try {
    let branchStaffAssignmentQuery;

    if (Array.isArray(branchStaffAssignmentId)) {
      branchStaffAssignmentQuery = BranchStaffAssignment.find({
        _id: { $in: branchStaffAssignmentId },
        isActive: true,
      });
    } else {
      branchStaffAssignmentQuery = BranchStaffAssignment.findOne({
        _id: branchStaffAssignmentId,
        isActive: true,
      });
    }

    // Populate associations as needed

    const branchStaffAssignment = await branchStaffAssignmentQuery.exec();

    if (!branchStaffAssignment) {
      return null;
    }
    const branchStaffAssignmentData =
      Array.isArray(branchStaffAssignmentId) &&
      branchStaffAssignmentId.length > 0
        ? branchStaffAssignment.map((item) => item.getData())
        : branchStaffAssignment.getData();

    // should i add this here?
    await BranchStaffAssignment.getCqrsJoins(branchStaffAssignmentData);

    return branchStaffAssignmentData;
  } catch (err) {
    console.log(err);
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingBranchStaffAssignmentAggById",
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

module.exports = getBranchStaffAssignmentAggById;

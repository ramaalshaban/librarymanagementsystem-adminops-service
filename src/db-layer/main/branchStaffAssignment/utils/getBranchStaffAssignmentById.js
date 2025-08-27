const { HttpServerError } = require("common");

const { BranchStaffAssignment } = require("models");

const getBranchStaffAssignmentById = async (branchStaffAssignmentId) => {
  try {
    let branchStaffAssignment;

    if (Array.isArray(branchStaffAssignmentId)) {
      branchStaffAssignment = await BranchStaffAssignment.find({
        _id: { $in: branchStaffAssignmentId },
        isActive: true,
      });
    } else {
      branchStaffAssignment = await BranchStaffAssignment.findOne({
        _id: branchStaffAssignmentId,
        isActive: true,
      });
    }

    if (!branchStaffAssignment) {
      return null;
    }

    return Array.isArray(branchStaffAssignmentId)
      ? branchStaffAssignment.map((item) => item.getData())
      : branchStaffAssignment.getData();
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingBranchStaffAssignmentById",
      err,
    );
  }
};

module.exports = getBranchStaffAssignmentById;

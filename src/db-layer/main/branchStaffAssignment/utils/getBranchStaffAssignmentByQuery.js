const { HttpServerError, BadRequestError } = require("common");

const { BranchStaffAssignment } = require("models");

const getBranchStaffAssignmentByQuery = async (query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }

    const branchStaffAssignment = await BranchStaffAssignment.findOne({
      ...query,
      isActive: true,
    });

    if (!branchStaffAssignment) return null;

    return branchStaffAssignment.getData();
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingBranchStaffAssignmentByQuery",
      err,
    );
  }
};

module.exports = getBranchStaffAssignmentByQuery;

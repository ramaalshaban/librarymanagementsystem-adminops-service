const { HttpServerError, BadRequestError, NotFoundError } = require("common");
const { BranchStaffAssignment } = require("models");

const getBranchStaffAssignmentListByQuery = async (query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }

    const branchStaffAssignment = await BranchStaffAssignment.find(query);

    if (!branchStaffAssignment || branchStaffAssignment.length === 0) return [];

    //should i add not found error or only return empty array?
    //      if (!branchStaffAssignment || branchStaffAssignment.length === 0) {
    //      throw new NotFoundError(
    //      `BranchStaffAssignment with the specified criteria not found`
    //  );
    //}

    return branchStaffAssignment.map((item) => item.getData());
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingBranchStaffAssignmentListByQuery",
      err,
    );
  }
};

module.exports = getBranchStaffAssignmentListByQuery;

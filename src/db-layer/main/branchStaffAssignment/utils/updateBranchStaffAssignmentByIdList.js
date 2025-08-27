const { HttpServerError } = require("common");

const { BranchStaffAssignment } = require("models");

const updateBranchStaffAssignmentByIdList = async (idList, dataClause) => {
  try {
    await BranchStaffAssignment.updateMany(
      { _id: { $in: idList }, isActive: true },
      dataClause,
    );

    const updatedDocs = await BranchStaffAssignment.find(
      { _id: { $in: idList }, isActive: true },
      { _id: 1 },
    );

    const branchStaffAssignmentIdList = updatedDocs.map((doc) => doc._id);

    return branchStaffAssignmentIdList;
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenUpdatingBranchStaffAssignmentByIdList",
      err,
    );
  }
};

module.exports = updateBranchStaffAssignmentByIdList;

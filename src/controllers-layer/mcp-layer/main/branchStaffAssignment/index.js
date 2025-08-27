module.exports = (headers) => {
  // BranchStaffAssignment Db Object Rest Api Router
  const branchStaffAssignmentMcpRouter = [];
  // getBranchStaffAssignment controller
  branchStaffAssignmentMcpRouter.push(
    require("./get-branchstaffassignment")(headers),
  );
  // createBranchStaffAssignment controller
  branchStaffAssignmentMcpRouter.push(
    require("./create-branchstaffassignment")(headers),
  );
  // updateBranchStaffAssignment controller
  branchStaffAssignmentMcpRouter.push(
    require("./update-branchstaffassignment")(headers),
  );
  // deleteBranchStaffAssignment controller
  branchStaffAssignmentMcpRouter.push(
    require("./delete-branchstaffassignment")(headers),
  );
  // listBranchStaffAssignments controller
  branchStaffAssignmentMcpRouter.push(
    require("./list-branchstaffassignments")(headers),
  );
  return branchStaffAssignmentMcpRouter;
};

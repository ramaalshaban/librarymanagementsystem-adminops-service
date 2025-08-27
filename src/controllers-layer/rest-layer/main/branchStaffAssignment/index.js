const express = require("express");

// BranchStaffAssignment Db Object Rest Api Router
const branchStaffAssignmentRouter = express.Router();

// add BranchStaffAssignment controllers

// getBranchStaffAssignment controller
branchStaffAssignmentRouter.get(
  "/branchstaffassignments/:branchStaffAssignmentId",
  require("./get-branchstaffassignment"),
);
// createBranchStaffAssignment controller
branchStaffAssignmentRouter.post(
  "/branchstaffassignments",
  require("./create-branchstaffassignment"),
);
// updateBranchStaffAssignment controller
branchStaffAssignmentRouter.patch(
  "/branchstaffassignments/:branchStaffAssignmentId",
  require("./update-branchstaffassignment"),
);
// deleteBranchStaffAssignment controller
branchStaffAssignmentRouter.delete(
  "/branchstaffassignments/:branchStaffAssignmentId",
  require("./delete-branchstaffassignment"),
);
// listBranchStaffAssignments controller
branchStaffAssignmentRouter.get(
  "/branchstaffassignments",
  require("./list-branchstaffassignments"),
);

module.exports = branchStaffAssignmentRouter;

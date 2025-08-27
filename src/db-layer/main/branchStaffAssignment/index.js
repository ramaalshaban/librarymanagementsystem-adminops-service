const utils = require("./utils");
const dbApiScripts = require("./dbApiScripts");

module.exports = {
  dbGetBranchstaffassignment: require("./dbGetBranchstaffassignment"),
  dbCreateBranchstaffassignment: require("./dbCreateBranchstaffassignment"),
  dbUpdateBranchstaffassignment: require("./dbUpdateBranchstaffassignment"),
  dbDeleteBranchstaffassignment: require("./dbDeleteBranchstaffassignment"),
  dbListBranchstaffassignments: require("./dbListBranchstaffassignments"),
  createBranchStaffAssignment: utils.createBranchStaffAssignment,
  getIdListOfBranchStaffAssignmentByField:
    utils.getIdListOfBranchStaffAssignmentByField,
  getBranchStaffAssignmentById: utils.getBranchStaffAssignmentById,
  getBranchStaffAssignmentAggById: utils.getBranchStaffAssignmentAggById,
  getBranchStaffAssignmentListByQuery:
    utils.getBranchStaffAssignmentListByQuery,
  getBranchStaffAssignmentStatsByQuery:
    utils.getBranchStaffAssignmentStatsByQuery,
  getBranchStaffAssignmentByQuery: utils.getBranchStaffAssignmentByQuery,
  updateBranchStaffAssignmentById: utils.updateBranchStaffAssignmentById,
  updateBranchStaffAssignmentByIdList:
    utils.updateBranchStaffAssignmentByIdList,
  updateBranchStaffAssignmentByQuery: utils.updateBranchStaffAssignmentByQuery,
  deleteBranchStaffAssignmentById: utils.deleteBranchStaffAssignmentById,
  deleteBranchStaffAssignmentByQuery: utils.deleteBranchStaffAssignmentByQuery,
};

const { QueryCache, QueryCacheInvalidator } = require("common");

class BranchStaffAssignmentQueryCache extends QueryCache {
  constructor(input, wClause) {
    super("branchStaffAssignment", [], "$and", "$eq", input, wClause);
  }
}
class BranchStaffAssignmentQueryCacheInvalidator extends QueryCacheInvalidator {
  constructor() {
    super("branchStaffAssignment", []);
  }
}

module.exports = {
  BranchStaffAssignmentQueryCache,
  BranchStaffAssignmentQueryCacheInvalidator,
};

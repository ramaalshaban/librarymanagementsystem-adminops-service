const { QueryCache, QueryCacheInvalidator } = require("common");

class BranchPurchaseOrderQueryCache extends QueryCache {
  constructor(input, wClause) {
    super("branchPurchaseOrder", [], "$and", "$eq", input, wClause);
  }
}
class BranchPurchaseOrderQueryCacheInvalidator extends QueryCacheInvalidator {
  constructor() {
    super("branchPurchaseOrder", []);
  }
}

module.exports = {
  BranchPurchaseOrderQueryCache,
  BranchPurchaseOrderQueryCacheInvalidator,
};

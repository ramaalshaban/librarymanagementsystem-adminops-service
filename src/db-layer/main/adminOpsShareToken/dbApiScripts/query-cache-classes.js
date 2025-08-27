const { QueryCache, QueryCacheInvalidator } = require("common");

class AdminOpsShareTokenQueryCache extends QueryCache {
  constructor(input, wClause) {
    super("adminOpsShareToken", [], "$and", "$eq", input, wClause);
  }
}
class AdminOpsShareTokenQueryCacheInvalidator extends QueryCacheInvalidator {
  constructor() {
    super("adminOpsShareToken", []);
  }
}

module.exports = {
  AdminOpsShareTokenQueryCache,
  AdminOpsShareTokenQueryCacheInvalidator,
};

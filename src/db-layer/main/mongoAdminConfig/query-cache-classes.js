const { QueryCache, QueryCacheInvalidator } = require("common");

class MongoAdminConfigQueryCache extends QueryCache {
  constructor(input, wClause) {
    super("mongoAdminConfig", [], "$and", "$eq", input, wClause);
  }
}
class MongoAdminConfigQueryCacheInvalidator extends QueryCacheInvalidator {
  constructor() {
    super("mongoAdminConfig", []);
  }
}

module.exports = {
  MongoAdminConfigQueryCache,
  MongoAdminConfigQueryCacheInvalidator,
};

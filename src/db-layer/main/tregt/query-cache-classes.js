const { QueryCache, QueryCacheInvalidator } = require("common");

class TregtQueryCache extends QueryCache {
  constructor(input, wClause) {
    super("tregt", [], "$and", "$eq", input, wClause);
  }
}
class TregtQueryCacheInvalidator extends QueryCacheInvalidator {
  constructor() {
    super("tregt", []);
  }
}

module.exports = {
  TregtQueryCache,
  TregtQueryCacheInvalidator,
};

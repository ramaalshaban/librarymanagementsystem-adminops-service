const { QueryCache, QueryCacheInvalidator } = require("common");

class ExternalNotificationConfigQueryCache extends QueryCache {
  constructor(input, wClause) {
    super("externalNotificationConfig", [], "$and", "$eq", input, wClause);
  }
}
class ExternalNotificationConfigQueryCacheInvalidator extends QueryCacheInvalidator {
  constructor() {
    super("externalNotificationConfig", []);
  }
}

module.exports = {
  ExternalNotificationConfigQueryCache,
  ExternalNotificationConfigQueryCacheInvalidator,
};

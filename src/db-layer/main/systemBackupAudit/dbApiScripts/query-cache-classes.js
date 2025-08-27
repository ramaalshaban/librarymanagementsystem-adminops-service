const { QueryCache, QueryCacheInvalidator } = require("common");

class SystemBackupAuditQueryCache extends QueryCache {
  constructor(input, wClause) {
    super("systemBackupAudit", [], "$and", "$eq", input, wClause);
  }
}
class SystemBackupAuditQueryCacheInvalidator extends QueryCacheInvalidator {
  constructor() {
    super("systemBackupAudit", []);
  }
}

module.exports = {
  SystemBackupAuditQueryCache,
  SystemBackupAuditQueryCacheInvalidator,
};

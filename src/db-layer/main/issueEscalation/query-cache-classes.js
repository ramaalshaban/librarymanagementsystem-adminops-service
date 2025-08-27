const { QueryCache, QueryCacheInvalidator } = require("common");

class IssueEscalationQueryCache extends QueryCache {
  constructor(input, wClause) {
    super("issueEscalation", [], "$and", "$eq", input, wClause);
  }
}
class IssueEscalationQueryCacheInvalidator extends QueryCacheInvalidator {
  constructor() {
    super("issueEscalation", []);
  }
}

module.exports = {
  IssueEscalationQueryCache,
  IssueEscalationQueryCacheInvalidator,
};

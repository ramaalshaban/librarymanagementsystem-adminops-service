const ApiManager = require("./ApiManager");

class AdminOpsServiceManager extends ApiManager {
  constructor(request, options) {
    super(request, options);
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
  }

  userHasRole(roleName) {
    if (!this.auth) return false;
    return this.auth.userHasRole(roleName);
  }
}

module.exports = AdminOpsServiceManager;

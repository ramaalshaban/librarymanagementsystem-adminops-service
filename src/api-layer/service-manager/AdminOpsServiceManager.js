const ApiManager = require("./ApiManager");

class AdminOpsServiceManager extends ApiManager {
  constructor(request, options) {
    super(request, options);
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
  }
}

module.exports = AdminOpsServiceManager;

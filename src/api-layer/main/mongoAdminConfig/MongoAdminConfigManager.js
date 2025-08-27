const { HttpServerError, HttpError, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");

const AdminOpsServiceManager = require("../../service-manager/AdminOpsServiceManager");

/* Base Class For the Crud Routes Of DbObject MongoAdminConfig */
class MongoAdminConfigManager extends AdminOpsServiceManager {
  constructor(request, options) {
    super(request, options);
    this.objectName = "mongoAdminConfig";
    this.modelName = "MongoAdminConfig";
  }

  toJSON() {
    const jsonObj = super.toJSON();

    return jsonObj;
  }
}

module.exports = MongoAdminConfigManager;

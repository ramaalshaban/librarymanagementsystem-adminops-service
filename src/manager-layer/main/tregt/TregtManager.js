const { HttpServerError, HttpError, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");

const AdminOpsServiceManager = require("../../service-manager/AdminOpsServiceManager");

/* Base Class For the Crud Routes Of DbObject Tregt */
class TregtManager extends AdminOpsServiceManager {
  constructor(request, options) {
    super(request, options);
    this.objectName = "tregt";
    this.modelName = "Tregt";
  }

  toJSON() {
    const jsonObj = super.toJSON();

    return jsonObj;
  }
}

module.exports = TregtManager;

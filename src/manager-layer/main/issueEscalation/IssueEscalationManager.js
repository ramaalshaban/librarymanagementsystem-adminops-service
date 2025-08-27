const { HttpServerError, HttpError, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");

const AdminOpsServiceManager = require("../../service-manager/AdminOpsServiceManager");

/* Base Class For the Crud Routes Of DbObject IssueEscalation */
class IssueEscalationManager extends AdminOpsServiceManager {
  constructor(request, options) {
    super(request, options);
    this.objectName = "issueEscalation";
    this.modelName = "IssueEscalation";
  }

  toJSON() {
    const jsonObj = super.toJSON();

    return jsonObj;
  }
}

module.exports = IssueEscalationManager;

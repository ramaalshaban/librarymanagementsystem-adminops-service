const SystemBackupAuditManager = require("./SystemBackupAuditManager");
const { isValidObjectId, isValidUUID, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");
const {
  SystembackupauditUpdatedPublisher,
} = require("../../route-events/publishers");

const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");
const { dbUpdateSystembackupaudit } = require("dbLayer");

class UpdateSystemBackupAuditManager extends SystemBackupAuditManager {
  constructor(request, controllerType) {
    super(request, {
      name: "updateSystemBackupAudit",
      controllerType: controllerType,
      pagination: false,
      crudType: "update",
      loginRequired: true,
      hasShareToken: false,
    });

    this.dataName = "systemBackupAudit";
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
    jsonObj.systemBackupAuditId = this.systemBackupAuditId;
    jsonObj.type = this.type;
    jsonObj.config = this.config;
    jsonObj.status = this.status;
    jsonObj.resultDetails = this.resultDetails;
  }

  readRestParameters(request) {
    this.systemBackupAuditId = request.params?.systemBackupAuditId;
    this.type = request.body?.type;
    this.config = request.body?.config;
    this.status = request.body?.status;
    this.resultDetails = request.body?.resultDetails;
    this.requestData = request.body;
    this.queryData = request.query ?? {};
    const url = request.url;
    this.urlPath = url.slice(1).split("/").join(".");
  }

  readMcpParameters(request) {
    this.systemBackupAuditId = request.mcpParams.systemBackupAuditId;
    this.type = request.mcpParams.type;
    this.config = request.mcpParams.config;
    this.status = request.mcpParams.status;
    this.resultDetails = request.mcpParams.resultDetails;
    this.requestData = request.mcpParams;
  }

  async transformParameters() {}

  async setVariables() {}

  async fetchInstance() {
    const { getSystemBackupAuditById } = require("dbLayer");
    this.systemBackupAudit = await getSystemBackupAuditById(
      this.systemBackupAuditId,
    );
    if (!this.systemBackupAudit) {
      throw new NotFoundError("errMsg_RecordNotFound");
    }
  }

  checkParameters() {
    if (this.systemBackupAuditId == null) {
      throw new BadRequestError("errMsg_systemBackupAuditIdisRequired");
    }

    if (this.type == null) {
      throw new BadRequestError("errMsg_typeisRequired");
    }

    if (this.status == null) {
      throw new BadRequestError("errMsg_statusisRequired");
    }

    // ID
    if (
      this.systemBackupAuditId &&
      !isValidObjectId(this.systemBackupAuditId) &&
      !isValidUUID(this.systemBackupAuditId)
    ) {
      throw new BadRequestError("errMsg_systemBackupAuditIdisNotAValidID");
    }
  }

  setOwnership() {
    this.isOwner = false;
    if (!this.session || !this.session.userId) return;

    this.isOwner = this.systemBackupAudit?._owner === this.session.userId;
  }

  async doBusiness() {
    // Call DbFunction
    // make an awaited call to the dbUpdateSystembackupaudit function to update the systembackupaudit and return the result to the controller
    const systembackupaudit = await dbUpdateSystembackupaudit(this);

    return systembackupaudit;
  }

  async raiseEvent() {
    SystembackupauditUpdatedPublisher.Publish(this.output, this.session).catch(
      (err) => {
        console.log("Publisher Error in Rest Controller:", err);
      },
    );
  }

  async getRouteQuery() {
    return { $and: [{ id: this.systemBackupAuditId }, { isActive: true }] };

    // handle permission filter later
  }

  async getWhereClause() {
    const { convertUserQueryToMongoDbQuery } = require("common");

    const routeQuery = await this.getRouteQuery();
    return convertUserQueryToMongoDbQuery(routeQuery);
  }

  async getDataClause() {
    const { hashString } = require("common");

    const dataClause = {
      type: this.type,
      config: this.config
        ? typeof this.config == "string"
          ? JSON.parse(this.config)
          : this.config
        : null,
      status: this.status,
      resultDetails: this.resultDetails
        ? typeof this.resultDetails == "string"
          ? JSON.parse(this.resultDetails)
          : this.resultDetails
        : null,
    };

    return dataClause;
  }
}

module.exports = UpdateSystemBackupAuditManager;

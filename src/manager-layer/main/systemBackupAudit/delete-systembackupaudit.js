const SystemBackupAuditManager = require("./SystemBackupAuditManager");
const { isValidObjectId, isValidUUID, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");
const {
  SystembackupauditDeletedPublisher,
} = require("../../route-events/publishers");

const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");
const { dbDeleteSystembackupaudit } = require("dbLayer");

class DeleteSystemBackupAuditManager extends SystemBackupAuditManager {
  constructor(request, controllerType) {
    super(request, {
      name: "deleteSystemBackupAudit",
      controllerType: controllerType,
      pagination: false,
      crudType: "delete",
      loginRequired: true,
      hasShareToken: false,
    });

    this.dataName = "systemBackupAudit";
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
    jsonObj.systemBackupAuditId = this.systemBackupAuditId;
  }

  readRestParameters(request) {
    this.systemBackupAuditId = request.params?.systemBackupAuditId;
    this.requestData = request.body;
    this.queryData = request.query ?? {};
    const url = request.url;
    this.urlPath = url.slice(1).split("/").join(".");
  }

  readMcpParameters(request) {
    this.systemBackupAuditId = request.mcpParams.systemBackupAuditId;
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
    // make an awaited call to the dbDeleteSystembackupaudit function to delete the systembackupaudit and return the result to the controller
    const systembackupaudit = await dbDeleteSystembackupaudit(this);

    return systembackupaudit;
  }

  async raiseEvent() {
    SystembackupauditDeletedPublisher.Publish(this.output, this.session).catch(
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
}

module.exports = DeleteSystemBackupAuditManager;

const SystemBackupAuditManager = require("./SystemBackupAuditManager");
const { isValidObjectId, isValidUUID, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");
const {
  SystembackupauditCreatedPublisher,
} = require("../../route-events/publishers");

const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");
const { dbCreateSystembackupaudit } = require("dbLayer");

class CreateSystemBackupAuditManager extends SystemBackupAuditManager {
  constructor(request, controllerType) {
    super(request, {
      name: "createSystemBackupAudit",
      controllerType: controllerType,
      pagination: false,
      crudType: "create",
      loginRequired: true,
      hasShareToken: false,
    });

    this.dataName = "systemBackupAudit";
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
    jsonObj.type = this.type;
    jsonObj.config = this.config;
    jsonObj.initiatedByUserId = this.initiatedByUserId;
    jsonObj.status = this.status;
    jsonObj.resultDetails = this.resultDetails;
  }

  readRestParameters(request) {
    this.type = request.body?.type;
    this.config = request.body?.config;
    this.initiatedByUserId = request.session?.userId;
    this.status = request.body?.status;
    this.resultDetails = request.body?.resultDetails;
    this.id = request.body?.id ?? request.query?.id ?? request.id;
    this.requestData = request.body;
    this.queryData = request.query ?? {};
    const url = request.url;
    this.urlPath = url.slice(1).split("/").join(".");
  }

  readMcpParameters(request) {
    this.type = request.mcpParams.type;
    this.config = request.mcpParams.config;
    this.initiatedByUserId = request.session.userId;
    this.status = request.mcpParams.status;
    this.resultDetails = request.mcpParams.resultDetails;
    this.id = request.mcpParams?.id;
    this.requestData = request.mcpParams;
  }

  async transformParameters() {}

  async setVariables() {}

  checkParameters() {
    if (this.type == null) {
      throw new BadRequestError("errMsg_typeisRequired");
    }

    if (this.config == null) {
      throw new BadRequestError("errMsg_configisRequired");
    }

    if (this.initiatedByUserId == null) {
      throw new BadRequestError("errMsg_initiatedByUserIdisRequired");
    }

    if (this.status == null) {
      throw new BadRequestError("errMsg_statusisRequired");
    }

    // ID
    if (
      this.initiatedByUserId &&
      !isValidObjectId(this.initiatedByUserId) &&
      !isValidUUID(this.initiatedByUserId)
    ) {
      throw new BadRequestError("errMsg_initiatedByUserIdisNotAValidID");
    }
  }

  setOwnership() {
    this.isOwner = false;
    if (!this.session || !this.session.userId) return;

    this.isOwner = this.systemBackupAudit?._owner === this.session.userId;
  }

  async doBusiness() {
    // Call DbFunction
    // make an awaited call to the dbCreateSystembackupaudit function to create the systembackupaudit and return the result to the controller
    const systembackupaudit = await dbCreateSystembackupaudit(this);

    return systembackupaudit;
  }

  async raiseEvent() {
    SystembackupauditCreatedPublisher.Publish(this.output, this.session).catch(
      (err) => {
        console.log("Publisher Error in Rest Controller:", err);
      },
    );
  }

  async getDataClause() {
    const { newObjectId } = require("common");

    const { hashString } = require("common");

    if (this.id) this.systemBackupAuditId = this.id;
    if (!this.systemBackupAuditId) this.systemBackupAuditId = newObjectId();

    const dataClause = {
      _id: this.systemBackupAuditId,
      type: this.type,
      config: this.config
        ? typeof this.config == "string"
          ? JSON.parse(this.config)
          : this.config
        : null,
      initiatedByUserId: this.initiatedByUserId,
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

module.exports = CreateSystemBackupAuditManager;

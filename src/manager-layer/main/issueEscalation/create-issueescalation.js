const IssueEscalationManager = require("./IssueEscalationManager");
const { isValidObjectId, isValidUUID, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");
const {
  IssueescalationCreatedPublisher,
} = require("../../route-events/publishers");

const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");
const { dbCreateIssueescalation } = require("dbLayer");

class CreateIssueEscalationManager extends IssueEscalationManager {
  constructor(request, controllerType) {
    super(request, {
      name: "createIssueEscalation",
      controllerType: controllerType,
      pagination: false,
      crudType: "create",
      loginRequired: true,
      hasShareToken: false,
    });

    this.dataName = "issueEscalation";
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
    jsonObj.branchId = this.branchId;
    jsonObj.raisedByUserId = this.raisedByUserId;
    jsonObj.assignedToUserId = this.assignedToUserId;
    jsonObj.status = this.status;
    jsonObj.escalationType = this.escalationType;
    jsonObj.description = this.description;
    jsonObj.log = this.log;
  }

  readRestParameters(request) {
    this.branchId = request.body?.branchId;
    this.raisedByUserId = request.session?.userId;
    this.assignedToUserId = request.body?.assignedToUserId;
    this.status = request.body?.status;
    this.escalationType = request.body?.escalationType;
    this.description = request.body?.description;
    this.log = request.body?.log;
    this.id = request.body?.id ?? request.query?.id ?? request.id;
    this.requestData = request.body;
    this.queryData = request.query ?? {};
    const url = request.url;
    this.urlPath = url.slice(1).split("/").join(".");
  }

  readMcpParameters(request) {
    this.branchId = request.mcpParams.branchId;
    this.raisedByUserId = request.session.userId;
    this.assignedToUserId = request.mcpParams.assignedToUserId;
    this.status = request.mcpParams.status;
    this.escalationType = request.mcpParams.escalationType;
    this.description = request.mcpParams.description;
    this.log = request.mcpParams.log;
    this.id = request.mcpParams?.id;
    this.requestData = request.mcpParams;
  }

  async transformParameters() {}

  async setVariables() {}

  checkParameters() {
    if (this.branchId == null) {
      throw new BadRequestError("errMsg_branchIdisRequired");
    }

    if (this.raisedByUserId == null) {
      throw new BadRequestError("errMsg_raisedByUserIdisRequired");
    }

    if (this.status == null) {
      throw new BadRequestError("errMsg_statusisRequired");
    }

    if (this.escalationType == null) {
      throw new BadRequestError("errMsg_escalationTypeisRequired");
    }

    if (this.description == null) {
      throw new BadRequestError("errMsg_descriptionisRequired");
    }

    // ID
    if (
      this.branchId &&
      !isValidObjectId(this.branchId) &&
      !isValidUUID(this.branchId)
    ) {
      throw new BadRequestError("errMsg_branchIdisNotAValidID");
    }

    // ID
    if (
      this.raisedByUserId &&
      !isValidObjectId(this.raisedByUserId) &&
      !isValidUUID(this.raisedByUserId)
    ) {
      throw new BadRequestError("errMsg_raisedByUserIdisNotAValidID");
    }

    // ID
    if (
      this.assignedToUserId &&
      !isValidObjectId(this.assignedToUserId) &&
      !isValidUUID(this.assignedToUserId)
    ) {
      throw new BadRequestError("errMsg_assignedToUserIdisNotAValidID");
    }
  }

  setOwnership() {
    this.isOwner = false;
    if (!this.session || !this.session.userId) return;

    this.isOwner = this.issueEscalation?._owner === this.session.userId;
  }

  async doBusiness() {
    // Call DbFunction
    // make an awaited call to the dbCreateIssueescalation function to create the issueescalation and return the result to the controller
    const issueescalation = await dbCreateIssueescalation(this);

    return issueescalation;
  }

  async raiseEvent() {
    IssueescalationCreatedPublisher.Publish(this.output, this.session).catch(
      (err) => {
        console.log("Publisher Error in Rest Controller:", err);
      },
    );
  }

  async getDataClause() {
    const { newObjectId } = require("common");

    const { hashString } = require("common");

    if (this.id) this.issueEscalationId = this.id;
    if (!this.issueEscalationId) this.issueEscalationId = newObjectId();

    const dataClause = {
      _id: this.issueEscalationId,
      branchId: this.branchId,
      raisedByUserId: this.raisedByUserId,
      assignedToUserId: this.assignedToUserId,
      status: this.status,
      escalationType: this.escalationType,
      description: this.description,
      log: this.log
        ? typeof this.log == "string"
          ? JSON.parse(this.log)
          : this.log
        : null,
    };

    return dataClause;
  }
}

module.exports = CreateIssueEscalationManager;

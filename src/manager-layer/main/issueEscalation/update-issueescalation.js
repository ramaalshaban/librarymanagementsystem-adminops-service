const IssueEscalationManager = require("./IssueEscalationManager");
const { isValidObjectId, isValidUUID, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");
const {
  IssueescalationUpdatedPublisher,
} = require("../../route-events/publishers");

const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");
const { dbUpdateIssueescalation } = require("dbLayer");

class UpdateIssueEscalationManager extends IssueEscalationManager {
  constructor(request, controllerType) {
    super(request, {
      name: "updateIssueEscalation",
      controllerType: controllerType,
      pagination: false,
      crudType: "update",
      loginRequired: true,
      hasShareToken: false,
    });

    this.dataName = "issueEscalation";
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
    jsonObj.issueEscalationId = this.issueEscalationId;
    jsonObj.branchId = this.branchId;
    jsonObj.assignedToUserId = this.assignedToUserId;
    jsonObj.status = this.status;
    jsonObj.escalationType = this.escalationType;
    jsonObj.description = this.description;
    jsonObj.log = this.log;
  }

  readRestParameters(request) {
    this.issueEscalationId = request.params?.issueEscalationId;
    this.branchId = request.body?.branchId;
    this.assignedToUserId = request.body?.assignedToUserId;
    this.status = request.body?.status;
    this.escalationType = request.body?.escalationType;
    this.description = request.body?.description;
    this.log = request.body?.log;
    this.requestData = request.body;
    this.queryData = request.query ?? {};
    const url = request.url;
    this.urlPath = url.slice(1).split("/").join(".");
  }

  readMcpParameters(request) {
    this.issueEscalationId = request.mcpParams.issueEscalationId;
    this.branchId = request.mcpParams.branchId;
    this.assignedToUserId = request.mcpParams.assignedToUserId;
    this.status = request.mcpParams.status;
    this.escalationType = request.mcpParams.escalationType;
    this.description = request.mcpParams.description;
    this.log = request.mcpParams.log;
    this.requestData = request.mcpParams;
  }

  async transformParameters() {}

  async setVariables() {}

  async fetchInstance() {
    const { getIssueEscalationById } = require("dbLayer");
    this.issueEscalation = await getIssueEscalationById(this.issueEscalationId);
    if (!this.issueEscalation) {
      throw new NotFoundError("errMsg_RecordNotFound");
    }
  }

  checkParameters() {
    if (this.issueEscalationId == null) {
      throw new BadRequestError("errMsg_issueEscalationIdisRequired");
    }

    if (this.status == null) {
      throw new BadRequestError("errMsg_statusisRequired");
    }

    // ID
    if (
      this.issueEscalationId &&
      !isValidObjectId(this.issueEscalationId) &&
      !isValidUUID(this.issueEscalationId)
    ) {
      throw new BadRequestError("errMsg_issueEscalationIdisNotAValidID");
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
    // make an awaited call to the dbUpdateIssueescalation function to update the issueescalation and return the result to the controller
    const issueescalation = await dbUpdateIssueescalation(this);

    return issueescalation;
  }

  async raiseEvent() {
    IssueescalationUpdatedPublisher.Publish(this.output, this.session).catch(
      (err) => {
        console.log("Publisher Error in Rest Controller:", err);
      },
    );
  }

  async getRouteQuery() {
    return { $and: [{ id: this.issueEscalationId }, { isActive: true }] };

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
      branchId: this.branchId,
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

module.exports = UpdateIssueEscalationManager;

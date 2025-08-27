const IssueEscalationManager = require("./IssueEscalationManager");
const { isValidObjectId, isValidUUID, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");

const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");
const { dbGetIssueescalation } = require("dbLayer");

class GetIssueEscalationManager extends IssueEscalationManager {
  constructor(request, controllerType) {
    super(request, {
      name: "getIssueEscalation",
      controllerType: controllerType,
      pagination: false,
      crudType: "get",
      loginRequired: true,
      hasShareToken: false,
    });

    this.dataName = "issueEscalation";
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
    jsonObj.issueEscalationId = this.issueEscalationId;
  }

  readRestParameters(request) {
    this.issueEscalationId = request.params?.issueEscalationId;
    this.requestData = request.body;
    this.queryData = request.query ?? {};
    const url = request.url;
    this.urlPath = url.slice(1).split("/").join(".");
  }

  readMcpParameters(request) {
    this.issueEscalationId = request.mcpParams.issueEscalationId;
    this.requestData = request.mcpParams;
  }

  async transformParameters() {}

  async setVariables() {}

  checkParameters() {
    if (this.issueEscalationId == null) {
      throw new BadRequestError("errMsg_issueEscalationIdisRequired");
    }

    // ID
    if (
      this.issueEscalationId &&
      !isValidObjectId(this.issueEscalationId) &&
      !isValidUUID(this.issueEscalationId)
    ) {
      throw new BadRequestError("errMsg_issueEscalationIdisNotAValidID");
    }
  }

  setOwnership() {
    this.isOwner = false;
    if (!this.session || !this.session.userId) return;

    this.isOwner = this.issueEscalation?._owner === this.session.userId;
  }

  async doBusiness() {
    // Call DbFunction
    // make an awaited call to the dbGetIssueescalation function to get the issueescalation and return the result to the controller
    const issueescalation = await dbGetIssueescalation(this);

    return issueescalation;
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
}

module.exports = GetIssueEscalationManager;

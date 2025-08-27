const IssueEscalationManager = require("./IssueEscalationManager");
const { isValidObjectId, isValidUUID, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");
const {
  IssueescalationDeletedPublisher,
} = require("../../route-events/publishers");

const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");
const { dbDeleteIssueescalation } = require("dbLayer");

class DeleteIssueEscalationManager extends IssueEscalationManager {
  constructor(request, controllerType) {
    super(request, {
      name: "deleteIssueEscalation",
      controllerType: controllerType,
      pagination: false,
      crudType: "delete",
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
    // make an awaited call to the dbDeleteIssueescalation function to delete the issueescalation and return the result to the controller
    const issueescalation = await dbDeleteIssueescalation(this);

    return issueescalation;
  }

  async raiseEvent() {
    IssueescalationDeletedPublisher.Publish(this.output, this.session).catch(
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
}

module.exports = DeleteIssueEscalationManager;

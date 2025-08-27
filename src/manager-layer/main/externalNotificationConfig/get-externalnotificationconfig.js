const ExternalNotificationConfigManager = require("./ExternalNotificationConfigManager");
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
const { dbGetExternalnotificationconfig } = require("dbLayer");

class GetExternalNotificationConfigManager extends ExternalNotificationConfigManager {
  constructor(request, controllerType) {
    super(request, {
      name: "getExternalNotificationConfig",
      controllerType: controllerType,
      pagination: false,
      crudType: "get",
      loginRequired: true,
      hasShareToken: false,
    });

    this.dataName = "externalNotificationConfig";
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
    jsonObj.externalNotificationConfigId = this.externalNotificationConfigId;
  }

  readRestParameters(request) {
    this.externalNotificationConfigId =
      request.params?.externalNotificationConfigId;
    this.requestData = request.body;
    this.queryData = request.query ?? {};
    const url = request.url;
    this.urlPath = url.slice(1).split("/").join(".");
  }

  readMcpParameters(request) {
    this.externalNotificationConfigId =
      request.mcpParams.externalNotificationConfigId;
    this.requestData = request.mcpParams;
  }

  async transformParameters() {}

  async setVariables() {}

  checkParameters() {
    if (this.externalNotificationConfigId == null) {
      throw new BadRequestError(
        "errMsg_externalNotificationConfigIdisRequired",
      );
    }

    // ID
    if (
      this.externalNotificationConfigId &&
      !isValidObjectId(this.externalNotificationConfigId) &&
      !isValidUUID(this.externalNotificationConfigId)
    ) {
      throw new BadRequestError(
        "errMsg_externalNotificationConfigIdisNotAValidID",
      );
    }
  }

  setOwnership() {
    this.isOwner = false;
    if (!this.session || !this.session.userId) return;

    this.isOwner =
      this.externalNotificationConfig?._owner === this.session.userId;
  }

  async doBusiness() {
    // Call DbFunction
    // make an awaited call to the dbGetExternalnotificationconfig function to get the externalnotificationconfig and return the result to the controller
    const externalnotificationconfig =
      await dbGetExternalnotificationconfig(this);

    return externalnotificationconfig;
  }

  async getRouteQuery() {
    return {
      $and: [{ id: this.externalNotificationConfigId }, { isActive: true }],
    };

    // handle permission filter later
  }

  async getWhereClause() {
    const { convertUserQueryToMongoDbQuery } = require("common");

    const routeQuery = await this.getRouteQuery();
    return convertUserQueryToMongoDbQuery(routeQuery);
  }
}

module.exports = GetExternalNotificationConfigManager;

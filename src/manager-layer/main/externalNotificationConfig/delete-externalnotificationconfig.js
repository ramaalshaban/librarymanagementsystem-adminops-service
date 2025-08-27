const ExternalNotificationConfigManager = require("./ExternalNotificationConfigManager");
const { isValidObjectId, isValidUUID, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");
const {
  ExternalnotificationconfigDeletedPublisher,
} = require("../../route-events/publishers");

const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");
const { dbDeleteExternalnotificationconfig } = require("dbLayer");

class DeleteExternalNotificationConfigManager extends ExternalNotificationConfigManager {
  constructor(request, controllerType) {
    super(request, {
      name: "deleteExternalNotificationConfig",
      controllerType: controllerType,
      pagination: false,
      crudType: "delete",
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

  async fetchInstance() {
    const { getExternalNotificationConfigById } = require("dbLayer");
    this.externalNotificationConfig = await getExternalNotificationConfigById(
      this.externalNotificationConfigId,
    );
    if (!this.externalNotificationConfig) {
      throw new NotFoundError("errMsg_RecordNotFound");
    }
  }

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
    // make an awaited call to the dbDeleteExternalnotificationconfig function to delete the externalnotificationconfig and return the result to the controller
    const externalnotificationconfig =
      await dbDeleteExternalnotificationconfig(this);

    return externalnotificationconfig;
  }

  async raiseEvent() {
    ExternalnotificationconfigDeletedPublisher.Publish(
      this.output,
      this.session,
    ).catch((err) => {
      console.log("Publisher Error in Rest Controller:", err);
    });
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

module.exports = DeleteExternalNotificationConfigManager;

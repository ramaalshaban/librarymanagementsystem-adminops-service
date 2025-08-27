const ExternalNotificationConfigManager = require("./ExternalNotificationConfigManager");
const { isValidObjectId, isValidUUID, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");
const {
  ExternalnotificationconfigUpdatedPublisher,
} = require("../../route-events/publishers");

const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");
const { dbUpdateExternalnotificationconfig } = require("dbLayer");

class UpdateExternalNotificationConfigManager extends ExternalNotificationConfigManager {
  constructor(request, controllerType) {
    super(request, {
      name: "updateExternalNotificationConfig",
      controllerType: controllerType,
      pagination: false,
      crudType: "update",
      loginRequired: true,
      hasShareToken: false,
    });

    this.dataName = "externalNotificationConfig";
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
    jsonObj.externalNotificationConfigId = this.externalNotificationConfigId;
    jsonObj.providerType = this.providerType;
    jsonObj.name = this.name;
    jsonObj.settings = this.settings;
    jsonObj.status = this.status;
  }

  readRestParameters(request) {
    this.externalNotificationConfigId =
      request.params?.externalNotificationConfigId;
    this.providerType = request.body?.providerType;
    this.name = request.body?.name;
    this.settings = request.body?.settings;
    this.status = request.body?.status;
    this.requestData = request.body;
    this.queryData = request.query ?? {};
    const url = request.url;
    this.urlPath = url.slice(1).split("/").join(".");
  }

  readMcpParameters(request) {
    this.externalNotificationConfigId =
      request.mcpParams.externalNotificationConfigId;
    this.providerType = request.mcpParams.providerType;
    this.name = request.mcpParams.name;
    this.settings = request.mcpParams.settings;
    this.status = request.mcpParams.status;
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

    if (this.providerType == null) {
      throw new BadRequestError("errMsg_providerTypeisRequired");
    }

    if (this.status == null) {
      throw new BadRequestError("errMsg_statusisRequired");
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
    // make an awaited call to the dbUpdateExternalnotificationconfig function to update the externalnotificationconfig and return the result to the controller
    const externalnotificationconfig =
      await dbUpdateExternalnotificationconfig(this);

    return externalnotificationconfig;
  }

  async raiseEvent() {
    ExternalnotificationconfigUpdatedPublisher.Publish(
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

  async getDataClause() {
    const { hashString } = require("common");

    const dataClause = {
      providerType: this.providerType,
      name: this.name,
      settings: this.settings
        ? typeof this.settings == "string"
          ? JSON.parse(this.settings)
          : this.settings
        : null,
      status: this.status,
    };

    return dataClause;
  }
}

module.exports = UpdateExternalNotificationConfigManager;

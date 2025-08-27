const ExternalNotificationConfigManager = require("./ExternalNotificationConfigManager");
const { isValidObjectId, isValidUUID, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");
const {
  ExternalnotificationconfigCreatedPublisher,
} = require("../../route-events/publishers");

const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");
const { dbCreateExternalnotificationconfig } = require("dbLayer");

class CreateExternalNotificationConfigManager extends ExternalNotificationConfigManager {
  constructor(request, controllerType) {
    super(request, {
      name: "createExternalNotificationConfig",
      controllerType: controllerType,
      pagination: false,
      crudType: "create",
      loginRequired: true,
      hasShareToken: false,
    });

    this.dataName = "externalNotificationConfig";
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
    jsonObj.providerType = this.providerType;
    jsonObj.name = this.name;
    jsonObj.settings = this.settings;
    jsonObj.status = this.status;
  }

  readRestParameters(request) {
    this.providerType = request.body?.providerType;
    this.name = request.body?.name;
    this.settings = request.body?.settings;
    this.status = request.body?.status;
    this.id = request.body?.id ?? request.query?.id ?? request.id;
    this.requestData = request.body;
    this.queryData = request.query ?? {};
    const url = request.url;
    this.urlPath = url.slice(1).split("/").join(".");
  }

  readMcpParameters(request) {
    this.providerType = request.mcpParams.providerType;
    this.name = request.mcpParams.name;
    this.settings = request.mcpParams.settings;
    this.status = request.mcpParams.status;
    this.id = request.mcpParams?.id;
    this.requestData = request.mcpParams;
  }

  async transformParameters() {}

  async setVariables() {}

  checkParameters() {
    if (this.providerType == null) {
      throw new BadRequestError("errMsg_providerTypeisRequired");
    }

    if (this.name == null) {
      throw new BadRequestError("errMsg_nameisRequired");
    }

    if (this.settings == null) {
      throw new BadRequestError("errMsg_settingsisRequired");
    }

    if (this.status == null) {
      throw new BadRequestError("errMsg_statusisRequired");
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
    // make an awaited call to the dbCreateExternalnotificationconfig function to create the externalnotificationconfig and return the result to the controller
    const externalnotificationconfig =
      await dbCreateExternalnotificationconfig(this);

    return externalnotificationconfig;
  }

  async raiseEvent() {
    ExternalnotificationconfigCreatedPublisher.Publish(
      this.output,
      this.session,
    ).catch((err) => {
      console.log("Publisher Error in Rest Controller:", err);
    });
  }

  async getDataClause() {
    const { newObjectId } = require("common");

    const { hashString } = require("common");

    if (this.id) this.externalNotificationConfigId = this.id;
    if (!this.externalNotificationConfigId)
      this.externalNotificationConfigId = newObjectId();

    const dataClause = {
      _id: this.externalNotificationConfigId,
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

module.exports = CreateExternalNotificationConfigManager;

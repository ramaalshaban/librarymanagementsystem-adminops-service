const MongoAdminConfigManager = require("./MongoAdminConfigManager");
const { isValidObjectId, isValidUUID, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");
const {
  MongoadminconfigCreatedPublisher,
} = require("../../route-events/publishers");

const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");
const { dbCreateMongoadminconfig } = require("dbLayer");

class CreateMongoAdminConfigManager extends MongoAdminConfigManager {
  constructor(request, controllerType) {
    super(request, {
      name: "createMongoAdminConfig",
      controllerType: controllerType,
      pagination: false,
      crudType: "create",
      loginRequired: true,
      hasShareToken: false,
    });

    this.dataName = "mongoAdminConfig";
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
    jsonObj.configType = this.configType;
    jsonObj.targetObject = this.targetObject;
    jsonObj.configDetails = this.configDetails;
    jsonObj.status = this.status;
  }

  readRestParameters(request) {
    this.configType = request.body?.configType;
    this.targetObject = request.body?.targetObject;
    this.configDetails = request.body?.configDetails;
    this.status = request.body?.status;
    this.id = request.body?.id ?? request.query?.id ?? request.id;
    this.requestData = request.body;
    this.queryData = request.query ?? {};
    const url = request.url;
    this.urlPath = url.slice(1).split("/").join(".");
  }

  readMcpParameters(request) {
    this.configType = request.mcpParams.configType;
    this.targetObject = request.mcpParams.targetObject;
    this.configDetails = request.mcpParams.configDetails;
    this.status = request.mcpParams.status;
    this.id = request.mcpParams?.id;
    this.requestData = request.mcpParams;
  }

  async transformParameters() {}

  async setVariables() {}

  checkParameters() {
    if (this.configType == null) {
      throw new BadRequestError("errMsg_configTypeisRequired");
    }

    if (this.targetObject == null) {
      throw new BadRequestError("errMsg_targetObjectisRequired");
    }

    if (this.configDetails == null) {
      throw new BadRequestError("errMsg_configDetailsisRequired");
    }

    if (this.status == null) {
      throw new BadRequestError("errMsg_statusisRequired");
    }
  }

  setOwnership() {
    this.isOwner = false;
    if (!this.session || !this.session.userId) return;

    this.isOwner = this.mongoAdminConfig?._owner === this.session.userId;
  }

  async doBusiness() {
    // Call DbFunction
    // make an awaited call to the dbCreateMongoadminconfig function to create the mongoadminconfig and return the result to the controller
    const mongoadminconfig = await dbCreateMongoadminconfig(this);

    return mongoadminconfig;
  }

  async raiseEvent() {
    MongoadminconfigCreatedPublisher.Publish(this.output, this.session).catch(
      (err) => {
        console.log("Publisher Error in Rest Controller:", err);
      },
    );
  }

  async getDataClause() {
    const { newObjectId } = require("common");

    const { hashString } = require("common");

    if (this.id) this.mongoAdminConfigId = this.id;
    if (!this.mongoAdminConfigId) this.mongoAdminConfigId = newObjectId();

    const dataClause = {
      _id: this.mongoAdminConfigId,
      configType: this.configType,
      targetObject: this.targetObject,
      configDetails: this.configDetails
        ? typeof this.configDetails == "string"
          ? JSON.parse(this.configDetails)
          : this.configDetails
        : null,
      status: this.status,
    };

    return dataClause;
  }
}

module.exports = CreateMongoAdminConfigManager;

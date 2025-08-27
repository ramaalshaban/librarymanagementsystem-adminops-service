const MongoAdminConfigManager = require("./MongoAdminConfigManager");
const { isValidObjectId, isValidUUID, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");
const {
  MongoadminconfigUpdatedPublisher,
} = require("../../route-events/publishers");

const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");
const { dbUpdateMongoadminconfig } = require("dbLayer");

class UpdateMongoAdminConfigManager extends MongoAdminConfigManager {
  constructor(request, controllerType) {
    super(request, {
      name: "updateMongoAdminConfig",
      controllerType: controllerType,
      pagination: false,
      crudType: "update",
      loginRequired: true,
      hasShareToken: false,
    });

    this.dataName = "mongoAdminConfig";
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
    jsonObj.mongoAdminConfigId = this.mongoAdminConfigId;
    jsonObj.configType = this.configType;
    jsonObj.targetObject = this.targetObject;
    jsonObj.configDetails = this.configDetails;
    jsonObj.status = this.status;
  }

  readRestParameters(request) {
    this.mongoAdminConfigId = request.params?.mongoAdminConfigId;
    this.configType = request.body?.configType;
    this.targetObject = request.body?.targetObject;
    this.configDetails = request.body?.configDetails;
    this.status = request.body?.status;
    this.requestData = request.body;
    this.queryData = request.query ?? {};
    const url = request.url;
    this.urlPath = url.slice(1).split("/").join(".");
  }

  readMcpParameters(request) {
    this.mongoAdminConfigId = request.mcpParams.mongoAdminConfigId;
    this.configType = request.mcpParams.configType;
    this.targetObject = request.mcpParams.targetObject;
    this.configDetails = request.mcpParams.configDetails;
    this.status = request.mcpParams.status;
    this.requestData = request.mcpParams;
  }

  async transformParameters() {}

  async setVariables() {}

  async fetchInstance() {
    const { getMongoAdminConfigById } = require("dbLayer");
    this.mongoAdminConfig = await getMongoAdminConfigById(
      this.mongoAdminConfigId,
    );
    if (!this.mongoAdminConfig) {
      throw new NotFoundError("errMsg_RecordNotFound");
    }
  }

  checkParameters() {
    if (this.mongoAdminConfigId == null) {
      throw new BadRequestError("errMsg_mongoAdminConfigIdisRequired");
    }

    if (this.configType == null) {
      throw new BadRequestError("errMsg_configTypeisRequired");
    }

    if (this.status == null) {
      throw new BadRequestError("errMsg_statusisRequired");
    }

    // ID
    if (
      this.mongoAdminConfigId &&
      !isValidObjectId(this.mongoAdminConfigId) &&
      !isValidUUID(this.mongoAdminConfigId)
    ) {
      throw new BadRequestError("errMsg_mongoAdminConfigIdisNotAValidID");
    }
  }

  setOwnership() {
    this.isOwner = false;
    if (!this.session || !this.session.userId) return;

    this.isOwner = this.mongoAdminConfig?._owner === this.session.userId;
  }

  async doBusiness() {
    // Call DbFunction
    // make an awaited call to the dbUpdateMongoadminconfig function to update the mongoadminconfig and return the result to the controller
    const mongoadminconfig = await dbUpdateMongoadminconfig(this);

    return mongoadminconfig;
  }

  async raiseEvent() {
    MongoadminconfigUpdatedPublisher.Publish(this.output, this.session).catch(
      (err) => {
        console.log("Publisher Error in Rest Controller:", err);
      },
    );
  }

  async getRouteQuery() {
    return { $and: [{ id: this.mongoAdminConfigId }, { isActive: true }] };

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

module.exports = UpdateMongoAdminConfigManager;

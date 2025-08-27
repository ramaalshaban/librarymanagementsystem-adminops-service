const MongoAdminConfigManager = require("./MongoAdminConfigManager");
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
const { dbGetMongoadminconfig } = require("dbLayer");

class GetMongoAdminConfigManager extends MongoAdminConfigManager {
  constructor(request, controllerType) {
    super(request, {
      name: "getMongoAdminConfig",
      controllerType: controllerType,
      pagination: false,
      crudType: "get",
      loginRequired: true,
      hasShareToken: false,
    });

    this.dataName = "mongoAdminConfig";
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
    jsonObj.mongoAdminConfigId = this.mongoAdminConfigId;
  }

  readRestParameters(request) {
    this.mongoAdminConfigId = request.params?.mongoAdminConfigId;
    this.requestData = request.body;
    this.queryData = request.query ?? {};
    const url = request.url;
    this.urlPath = url.slice(1).split("/").join(".");
  }

  readMcpParameters(request) {
    this.mongoAdminConfigId = request.mcpParams.mongoAdminConfigId;
    this.requestData = request.mcpParams;
  }

  async transformParameters() {}

  async setVariables() {}

  checkParameters() {
    if (this.mongoAdminConfigId == null) {
      throw new BadRequestError("errMsg_mongoAdminConfigIdisRequired");
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
    // make an awaited call to the dbGetMongoadminconfig function to get the mongoadminconfig and return the result to the controller
    const mongoadminconfig = await dbGetMongoadminconfig(this);

    return mongoadminconfig;
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
}

module.exports = GetMongoAdminConfigManager;

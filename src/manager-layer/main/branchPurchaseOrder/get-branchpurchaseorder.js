const BranchPurchaseOrderManager = require("./BranchPurchaseOrderManager");
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
const { dbGetBranchpurchaseorder } = require("dbLayer");

class GetBranchPurchaseOrderManager extends BranchPurchaseOrderManager {
  constructor(request, controllerType) {
    super(request, {
      name: "getBranchPurchaseOrder",
      controllerType: controllerType,
      pagination: false,
      crudType: "get",
      loginRequired: true,
      hasShareToken: false,
    });

    this.dataName = "branchPurchaseOrder";
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
    jsonObj.branchPurchaseOrderId = this.branchPurchaseOrderId;
  }

  readRestParameters(request) {
    this.branchPurchaseOrderId = request.params?.branchPurchaseOrderId;
    this.requestData = request.body;
    this.queryData = request.query ?? {};
    const url = request.url;
    this.urlPath = url.slice(1).split("/").join(".");
  }

  readMcpParameters(request) {
    this.branchPurchaseOrderId = request.mcpParams.branchPurchaseOrderId;
    this.requestData = request.mcpParams;
  }

  async transformParameters() {}

  async setVariables() {}

  checkParameters() {
    if (this.branchPurchaseOrderId == null) {
      throw new BadRequestError("errMsg_branchPurchaseOrderIdisRequired");
    }

    // ID
    if (
      this.branchPurchaseOrderId &&
      !isValidObjectId(this.branchPurchaseOrderId) &&
      !isValidUUID(this.branchPurchaseOrderId)
    ) {
      throw new BadRequestError("errMsg_branchPurchaseOrderIdisNotAValidID");
    }
  }

  setOwnership() {
    this.isOwner = false;
    if (!this.session || !this.session.userId) return;

    this.isOwner = this.branchPurchaseOrder?._owner === this.session.userId;
  }

  async doBusiness() {
    // Call DbFunction
    // make an awaited call to the dbGetBranchpurchaseorder function to get the branchpurchaseorder and return the result to the controller
    const branchpurchaseorder = await dbGetBranchpurchaseorder(this);

    return branchpurchaseorder;
  }

  async getRouteQuery() {
    return { $and: [{ id: this.branchPurchaseOrderId }, { isActive: true }] };

    // handle permission filter later
  }

  async getWhereClause() {
    const { convertUserQueryToMongoDbQuery } = require("common");

    const routeQuery = await this.getRouteQuery();
    return convertUserQueryToMongoDbQuery(routeQuery);
  }
}

module.exports = GetBranchPurchaseOrderManager;

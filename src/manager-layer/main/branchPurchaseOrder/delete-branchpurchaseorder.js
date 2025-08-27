const BranchPurchaseOrderManager = require("./BranchPurchaseOrderManager");
const { isValidObjectId, isValidUUID, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");
const {
  BranchpurchaseorderDeletedPublisher,
} = require("../../route-events/publishers");

const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");
const { dbDeleteBranchpurchaseorder } = require("dbLayer");

class DeleteBranchPurchaseOrderManager extends BranchPurchaseOrderManager {
  constructor(request, controllerType) {
    super(request, {
      name: "deleteBranchPurchaseOrder",
      controllerType: controllerType,
      pagination: false,
      crudType: "delete",
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

  async fetchInstance() {
    const { getBranchPurchaseOrderById } = require("dbLayer");
    this.branchPurchaseOrder = await getBranchPurchaseOrderById(
      this.branchPurchaseOrderId,
    );
    if (!this.branchPurchaseOrder) {
      throw new NotFoundError("errMsg_RecordNotFound");
    }
  }

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
    // make an awaited call to the dbDeleteBranchpurchaseorder function to delete the branchpurchaseorder and return the result to the controller
    const branchpurchaseorder = await dbDeleteBranchpurchaseorder(this);

    return branchpurchaseorder;
  }

  async raiseEvent() {
    BranchpurchaseorderDeletedPublisher.Publish(
      this.output,
      this.session,
    ).catch((err) => {
      console.log("Publisher Error in Rest Controller:", err);
    });
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

module.exports = DeleteBranchPurchaseOrderManager;

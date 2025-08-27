const BranchPurchaseOrderManager = require("./BranchPurchaseOrderManager");
const { isValidObjectId, isValidUUID, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");
const {
  BranchpurchaseorderUpdatedPublisher,
} = require("../../route-events/publishers");

const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");
const { dbUpdateBranchpurchaseorder } = require("dbLayer");

class UpdateBranchPurchaseOrderManager extends BranchPurchaseOrderManager {
  constructor(request, controllerType) {
    super(request, {
      name: "updateBranchPurchaseOrder",
      controllerType: controllerType,
      pagination: false,
      crudType: "update",
      loginRequired: true,
      hasShareToken: false,
    });

    this.dataName = "branchPurchaseOrder";
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
    jsonObj.branchPurchaseOrderId = this.branchPurchaseOrderId;
    jsonObj.items = this.items;
    jsonObj.status = this.status;
    jsonObj.approvedByUserId = this.approvedByUserId;
    jsonObj.approvalDate = this.approvalDate;
    jsonObj.note = this.note;
  }

  readRestParameters(request) {
    this.branchPurchaseOrderId = request.params?.branchPurchaseOrderId;
    this.items = request.body?.items;
    this.status = request.body?.status;
    this.approvedByUserId = request.body?.approvedByUserId;
    this.approvalDate = request.body?.approvalDate;
    this.note = request.body?.note;
    this.requestData = request.body;
    this.queryData = request.query ?? {};
    const url = request.url;
    this.urlPath = url.slice(1).split("/").join(".");
  }

  readMcpParameters(request) {
    this.branchPurchaseOrderId = request.mcpParams.branchPurchaseOrderId;
    this.items = request.mcpParams.items;
    this.status = request.mcpParams.status;
    this.approvedByUserId = request.mcpParams.approvedByUserId;
    this.approvalDate = request.mcpParams.approvalDate;
    this.note = request.mcpParams.note;
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

    if (this.status == null) {
      throw new BadRequestError("errMsg_statusisRequired");
    }

    // ID
    if (
      this.branchPurchaseOrderId &&
      !isValidObjectId(this.branchPurchaseOrderId) &&
      !isValidUUID(this.branchPurchaseOrderId)
    ) {
      throw new BadRequestError("errMsg_branchPurchaseOrderIdisNotAValidID");
    }

    // ID
    if (
      this.approvedByUserId &&
      !isValidObjectId(this.approvedByUserId) &&
      !isValidUUID(this.approvedByUserId)
    ) {
      throw new BadRequestError("errMsg_approvedByUserIdisNotAValidID");
    }
  }

  setOwnership() {
    this.isOwner = false;
    if (!this.session || !this.session.userId) return;

    this.isOwner = this.branchPurchaseOrder?._owner === this.session.userId;
  }

  async doBusiness() {
    // Call DbFunction
    // make an awaited call to the dbUpdateBranchpurchaseorder function to update the branchpurchaseorder and return the result to the controller
    const branchpurchaseorder = await dbUpdateBranchpurchaseorder(this);

    return branchpurchaseorder;
  }

  async raiseEvent() {
    BranchpurchaseorderUpdatedPublisher.Publish(
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

  async getDataClause() {
    const { hashString } = require("common");

    const dataClause = {
      items: this.items
        ? typeof this.items == "string"
          ? JSON.parse(this.items)
          : this.items
        : null,
      status: this.status,
      approvedByUserId: this.approvedByUserId,
      approvalDate: this.approvalDate,
      note: this.note,
    };

    return dataClause;
  }
}

module.exports = UpdateBranchPurchaseOrderManager;

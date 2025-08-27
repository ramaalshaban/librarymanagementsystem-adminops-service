const BranchPurchaseOrderManager = require("./BranchPurchaseOrderManager");
const { isValidObjectId, isValidUUID, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");
const {
  BranchpurchaseorderCreatedPublisher,
} = require("../../route-events/publishers");

const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");
const { dbCreateBranchpurchaseorder } = require("dbLayer");

class CreateBranchPurchaseOrderManager extends BranchPurchaseOrderManager {
  constructor(request, controllerType) {
    super(request, {
      name: "createBranchPurchaseOrder",
      controllerType: controllerType,
      pagination: false,
      crudType: "create",
      loginRequired: true,
      hasShareToken: false,
    });

    this.dataName = "branchPurchaseOrder";
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
    jsonObj.branchId = this.branchId;
    jsonObj.requestedByUserId = this.requestedByUserId;
    jsonObj.items = this.items;
    jsonObj.status = this.status;
    jsonObj.approvedByUserId = this.approvedByUserId;
    jsonObj.approvalDate = this.approvalDate;
    jsonObj.note = this.note;
  }

  readRestParameters(request) {
    this.branchId = request.body?.branchId;
    this.requestedByUserId = request.session?.userId;
    this.items = request.body?.items;
    this.status = request.body?.status;
    this.approvedByUserId = request.body?.approvedByUserId;
    this.approvalDate = request.body?.approvalDate;
    this.note = request.body?.note;
    this.id = request.body?.id ?? request.query?.id ?? request.id;
    this.requestData = request.body;
    this.queryData = request.query ?? {};
    const url = request.url;
    this.urlPath = url.slice(1).split("/").join(".");
  }

  readMcpParameters(request) {
    this.branchId = request.mcpParams.branchId;
    this.requestedByUserId = request.session.userId;
    this.items = request.mcpParams.items;
    this.status = request.mcpParams.status;
    this.approvedByUserId = request.mcpParams.approvedByUserId;
    this.approvalDate = request.mcpParams.approvalDate;
    this.note = request.mcpParams.note;
    this.id = request.mcpParams?.id;
    this.requestData = request.mcpParams;
  }

  async transformParameters() {}

  async setVariables() {}

  checkParameters() {
    if (this.branchId == null) {
      throw new BadRequestError("errMsg_branchIdisRequired");
    }

    if (this.requestedByUserId == null) {
      throw new BadRequestError("errMsg_requestedByUserIdisRequired");
    }

    if (this.items == null) {
      throw new BadRequestError("errMsg_itemsisRequired");
    }

    if (this.status == null) {
      throw new BadRequestError("errMsg_statusisRequired");
    }

    // ID
    if (
      this.branchId &&
      !isValidObjectId(this.branchId) &&
      !isValidUUID(this.branchId)
    ) {
      throw new BadRequestError("errMsg_branchIdisNotAValidID");
    }

    // ID
    if (
      this.requestedByUserId &&
      !isValidObjectId(this.requestedByUserId) &&
      !isValidUUID(this.requestedByUserId)
    ) {
      throw new BadRequestError("errMsg_requestedByUserIdisNotAValidID");
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
    // make an awaited call to the dbCreateBranchpurchaseorder function to create the branchpurchaseorder and return the result to the controller
    const branchpurchaseorder = await dbCreateBranchpurchaseorder(this);

    return branchpurchaseorder;
  }

  async raiseEvent() {
    BranchpurchaseorderCreatedPublisher.Publish(
      this.output,
      this.session,
    ).catch((err) => {
      console.log("Publisher Error in Rest Controller:", err);
    });
  }

  async getDataClause() {
    const { newObjectId } = require("common");

    const { hashString } = require("common");

    if (this.id) this.branchPurchaseOrderId = this.id;
    if (!this.branchPurchaseOrderId) this.branchPurchaseOrderId = newObjectId();

    const dataClause = {
      _id: this.branchPurchaseOrderId,
      branchId: this.branchId,
      requestedByUserId: this.requestedByUserId,
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

module.exports = CreateBranchPurchaseOrderManager;

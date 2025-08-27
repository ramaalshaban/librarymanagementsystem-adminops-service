const BranchStaffAssignmentManager = require("./BranchStaffAssignmentManager");
const { isValidObjectId, isValidUUID, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");
const {
  BranchstaffassignmentCreatedPublisher,
} = require("../../route-events/publishers");

const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");
const { dbCreateBranchstaffassignment } = require("dbLayer");

class CreateBranchStaffAssignmentManager extends BranchStaffAssignmentManager {
  constructor(request, controllerType) {
    super(request, {
      name: "createBranchStaffAssignment",
      controllerType: controllerType,
      pagination: false,
      crudType: "create",
      loginRequired: true,
      hasShareToken: false,
    });

    this.dataName = "branchStaffAssignment";
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
    jsonObj.branchId = this.branchId;
    jsonObj.userId = this.userId;
    jsonObj.role = this.role;
    jsonObj.assignedByUserId = this.assignedByUserId;
  }

  readRestParameters(request) {
    this.branchId = request.body?.branchId;
    this.userId = request.body?.userId;
    this.role = request.body?.role;
    this.assignedByUserId = request.session?.userId;
    this.id = request.body?.id ?? request.query?.id ?? request.id;
    this.requestData = request.body;
    this.queryData = request.query ?? {};
    const url = request.url;
    this.urlPath = url.slice(1).split("/").join(".");
  }

  readMcpParameters(request) {
    this.branchId = request.mcpParams.branchId;
    this.userId = request.mcpParams.userId;
    this.role = request.mcpParams.role;
    this.assignedByUserId = request.session.userId;
    this.id = request.mcpParams?.id;
    this.requestData = request.mcpParams;
  }

  async transformParameters() {}

  async setVariables() {}

  checkParameters() {
    if (this.branchId == null) {
      throw new BadRequestError("errMsg_branchIdisRequired");
    }

    if (this.userId == null) {
      throw new BadRequestError("errMsg_userIdisRequired");
    }

    if (this.role == null) {
      throw new BadRequestError("errMsg_roleisRequired");
    }

    if (this.assignedByUserId == null) {
      throw new BadRequestError("errMsg_assignedByUserIdisRequired");
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
      this.userId &&
      !isValidObjectId(this.userId) &&
      !isValidUUID(this.userId)
    ) {
      throw new BadRequestError("errMsg_userIdisNotAValidID");
    }

    // ID
    if (
      this.assignedByUserId &&
      !isValidObjectId(this.assignedByUserId) &&
      !isValidUUID(this.assignedByUserId)
    ) {
      throw new BadRequestError("errMsg_assignedByUserIdisNotAValidID");
    }
  }

  setOwnership() {
    this.isOwner = false;
    if (!this.session || !this.session.userId) return;

    this.isOwner = this.branchStaffAssignment?._owner === this.session.userId;
  }

  async doBusiness() {
    // Call DbFunction
    // make an awaited call to the dbCreateBranchstaffassignment function to create the branchstaffassignment and return the result to the controller
    const branchstaffassignment = await dbCreateBranchstaffassignment(this);

    return branchstaffassignment;
  }

  async raiseEvent() {
    BranchstaffassignmentCreatedPublisher.Publish(
      this.output,
      this.session,
    ).catch((err) => {
      console.log("Publisher Error in Rest Controller:", err);
    });
  }

  async getDataClause() {
    const { newObjectId } = require("common");

    const { hashString } = require("common");

    if (this.id) this.branchStaffAssignmentId = this.id;
    if (!this.branchStaffAssignmentId)
      this.branchStaffAssignmentId = newObjectId();

    const dataClause = {
      _id: this.branchStaffAssignmentId,
      branchId: this.branchId,
      userId: this.userId,
      role: this.role,
      assignedByUserId: this.assignedByUserId,
    };

    return dataClause;
  }
}

module.exports = CreateBranchStaffAssignmentManager;

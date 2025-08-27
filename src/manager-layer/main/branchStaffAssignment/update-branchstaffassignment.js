const BranchStaffAssignmentManager = require("./BranchStaffAssignmentManager");
const { isValidObjectId, isValidUUID, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");
const {
  BranchstaffassignmentUpdatedPublisher,
} = require("../../route-events/publishers");

const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");
const { dbUpdateBranchstaffassignment } = require("dbLayer");

class UpdateBranchStaffAssignmentManager extends BranchStaffAssignmentManager {
  constructor(request, controllerType) {
    super(request, {
      name: "updateBranchStaffAssignment",
      controllerType: controllerType,
      pagination: false,
      crudType: "update",
      loginRequired: true,
      hasShareToken: false,
    });

    this.dataName = "branchStaffAssignment";
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
    jsonObj.branchStaffAssignmentId = this.branchStaffAssignmentId;
    jsonObj.branchId = this.branchId;
    jsonObj.userId = this.userId;
    jsonObj.role = this.role;
  }

  readRestParameters(request) {
    this.branchStaffAssignmentId = request.params?.branchStaffAssignmentId;
    this.branchId = request.body?.branchId;
    this.userId = request.body?.userId;
    this.role = request.body?.role;
    this.requestData = request.body;
    this.queryData = request.query ?? {};
    const url = request.url;
    this.urlPath = url.slice(1).split("/").join(".");
  }

  readMcpParameters(request) {
    this.branchStaffAssignmentId = request.mcpParams.branchStaffAssignmentId;
    this.branchId = request.mcpParams.branchId;
    this.userId = request.mcpParams.userId;
    this.role = request.mcpParams.role;
    this.requestData = request.mcpParams;
  }

  async transformParameters() {}

  async setVariables() {}

  async fetchInstance() {
    const { getBranchStaffAssignmentById } = require("dbLayer");
    this.branchStaffAssignment = await getBranchStaffAssignmentById(
      this.branchStaffAssignmentId,
    );
    if (!this.branchStaffAssignment) {
      throw new NotFoundError("errMsg_RecordNotFound");
    }
  }

  checkParameters() {
    if (this.branchStaffAssignmentId == null) {
      throw new BadRequestError("errMsg_branchStaffAssignmentIdisRequired");
    }

    if (this.role == null) {
      throw new BadRequestError("errMsg_roleisRequired");
    }

    // ID
    if (
      this.branchStaffAssignmentId &&
      !isValidObjectId(this.branchStaffAssignmentId) &&
      !isValidUUID(this.branchStaffAssignmentId)
    ) {
      throw new BadRequestError("errMsg_branchStaffAssignmentIdisNotAValidID");
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
  }

  setOwnership() {
    this.isOwner = false;
    if (!this.session || !this.session.userId) return;

    this.isOwner = this.branchStaffAssignment?._owner === this.session.userId;
  }

  async doBusiness() {
    // Call DbFunction
    // make an awaited call to the dbUpdateBranchstaffassignment function to update the branchstaffassignment and return the result to the controller
    const branchstaffassignment = await dbUpdateBranchstaffassignment(this);

    return branchstaffassignment;
  }

  async raiseEvent() {
    BranchstaffassignmentUpdatedPublisher.Publish(
      this.output,
      this.session,
    ).catch((err) => {
      console.log("Publisher Error in Rest Controller:", err);
    });
  }

  async getRouteQuery() {
    return { $and: [{ id: this.branchStaffAssignmentId }, { isActive: true }] };

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
      branchId: this.branchId,
      userId: this.userId,
      role: this.role,
    };

    return dataClause;
  }
}

module.exports = UpdateBranchStaffAssignmentManager;

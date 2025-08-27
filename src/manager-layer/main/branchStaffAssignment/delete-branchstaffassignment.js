const BranchStaffAssignmentManager = require("./BranchStaffAssignmentManager");
const { isValidObjectId, isValidUUID, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");
const {
  BranchstaffassignmentDeletedPublisher,
} = require("../../route-events/publishers");

const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");
const { dbDeleteBranchstaffassignment } = require("dbLayer");

class DeleteBranchStaffAssignmentManager extends BranchStaffAssignmentManager {
  constructor(request, controllerType) {
    super(request, {
      name: "deleteBranchStaffAssignment",
      controllerType: controllerType,
      pagination: false,
      crudType: "delete",
      loginRequired: true,
      hasShareToken: false,
    });

    this.dataName = "branchStaffAssignment";
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
    jsonObj.branchStaffAssignmentId = this.branchStaffAssignmentId;
  }

  readRestParameters(request) {
    this.branchStaffAssignmentId = request.params?.branchStaffAssignmentId;
    this.requestData = request.body;
    this.queryData = request.query ?? {};
    const url = request.url;
    this.urlPath = url.slice(1).split("/").join(".");
  }

  readMcpParameters(request) {
    this.branchStaffAssignmentId = request.mcpParams.branchStaffAssignmentId;
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

    // ID
    if (
      this.branchStaffAssignmentId &&
      !isValidObjectId(this.branchStaffAssignmentId) &&
      !isValidUUID(this.branchStaffAssignmentId)
    ) {
      throw new BadRequestError("errMsg_branchStaffAssignmentIdisNotAValidID");
    }
  }

  setOwnership() {
    this.isOwner = false;
    if (!this.session || !this.session.userId) return;

    this.isOwner = this.branchStaffAssignment?._owner === this.session.userId;
  }

  async doBusiness() {
    // Call DbFunction
    // make an awaited call to the dbDeleteBranchstaffassignment function to delete the branchstaffassignment and return the result to the controller
    const branchstaffassignment = await dbDeleteBranchstaffassignment(this);

    return branchstaffassignment;
  }

  async raiseEvent() {
    BranchstaffassignmentDeletedPublisher.Publish(
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
}

module.exports = DeleteBranchStaffAssignmentManager;

const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");
const { BranchStaffAssignment } = require("models");

const { DBUpdateMongooseCommand } = require("dbCommand");

const {
  BranchStaffAssignmentQueryCacheInvalidator,
} = require("./query-cache-classes");

const { ElasticIndexer } = require("serviceCommon");
const getBranchStaffAssignmentById = require("./utils/getBranchStaffAssignmentById");

class DbUpdateBranchstaffassignmentCommand extends DBUpdateMongooseCommand {
  constructor(input) {
    const instanceMode = true;
    input.isBulk = false;
    input.updateEach = false;
    super(input, BranchStaffAssignment, instanceMode);
    this.commandName = "dbUpdateBranchstaffassignment";
    this.nullResult = false;
    this.objectName = "branchStaffAssignment";
    this.serviceLabel = "librarymanagementsystem-adminops-service";
    this.joinedCriteria = false;
    this.dbEvent =
      "librarymanagementsystem-adminops-service-dbevent-branchstaffassignment-updated";
  }

  loadHookFunctions() {
    super.loadHookFunctions({});
  }

  initOwnership(input) {
    super.initOwnership(input);
  }

  async transposeResult() {
    // transpose dbData
  }

  async createQueryCacheInvalidator() {
    this.queryCacheInvalidator =
      new BranchStaffAssignmentQueryCacheInvalidator();
  }

  async indexDataToElastic() {
    const elasticIndexer = new ElasticIndexer(
      "branchStaffAssignment",
      this.session,
      this.requestId,
    );
    const dbData = await getBranchStaffAssignmentById(this.dbData.id);
    await elasticIndexer.indexData(dbData);
  }

  // ask about this should i rename the whereClause to dataClause???

  async setCalculatedFieldsAfterInstance(data) {
    const input = this.input;
  }
}

const dbUpdateBranchstaffassignment = async (input) => {
  input.id = input.branchStaffAssignmentId;
  const dbUpdateCommand = new DbUpdateBranchstaffassignmentCommand(input);
  return await dbUpdateCommand.execute();
};

module.exports = dbUpdateBranchstaffassignment;

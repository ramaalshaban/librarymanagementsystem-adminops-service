// exsik olan :
//if exits update and if not exits create
//if index.onDuplicate == "throwError" throw error
//

const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");

const { BranchStaffAssignment } = require("models");

const { DBCreateMongooseCommand } = require("dbCommand");

const {
  BranchStaffAssignmentQueryCacheInvalidator,
} = require("./query-cache-classes");

const { ElasticIndexer } = require("serviceCommon");
const getBranchStaffAssignmentById = require("./utils/getBranchStaffAssignmentById");

class DbCreateBranchstaffassignmentCommand extends DBCreateMongooseCommand {
  constructor(input) {
    super(input);
    this.commandName = "dbCreateBranchstaffassignment";
    this.objectName = "branchStaffAssignment";
    this.serviceLabel = "librarymanagementsystem-adminops-service";
    this.dbEvent =
      "librarymanagementsystem-adminops-service-dbevent-branchstaffassignment-created";
  }

  loadHookFunctions() {
    super.loadHookFunctions({});
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

  async create_childs() {}

  async transposeResult() {
    // transpose dbData
  }

  async runDbCommand() {
    await super.runDbCommand();

    let branchStaffAssignment = null;
    let whereClause = {};
    let updated = false;
    let exists = false;
    try {
      whereClause = {
        branchId: this.dataClause.branchId,
        userId: this.dataClause.userId,
      };

      branchStaffAssignment =
        branchStaffAssignment ||
        (await BranchStaffAssignment.findOne(whereClause));

      if (branchStaffAssignment) {
        throw new BadRequestError(
          "errMsg_DuplicateIndexErrorWithFields:" + "branchId-userId",
        );
      }

      if (!updated && this.dataClause.id && !exists) {
        branchStaffAssignment =
          branchStaffAssignment ||
          (await BranchStaffAssignment.findById(this.dataClause.id));
        if (branchStaffAssignment) {
          delete this.dataClause.id;
          this.dataClause.isActive = true;
          await branchStaffAssignment.update(this.dataClause);
          updated = true;
        }
      }
    } catch (error) {
      const eDetail = {
        dataClause: this.dataClause,
        errorStack: error.stack,
        checkoutResult: this.input.checkoutResult,
      };
      throw new HttpServerError(
        "Error in checking unique index when creating BranchStaffAssignment",
        eDetail,
      );
    }

    if (!updated && !exists) {
      branchStaffAssignment = await BranchStaffAssignment.create(
        this.dataClause,
      );
    }

    this.dbData = branchStaffAssignment.getData();
    this.input.branchStaffAssignment = this.dbData;
    await this.create_childs();
  }
}

const dbCreateBranchstaffassignment = async (input) => {
  const dbCreateCommand = new DbCreateBranchstaffassignmentCommand(input);
  return await dbCreateCommand.execute();
};

module.exports = dbCreateBranchstaffassignment;

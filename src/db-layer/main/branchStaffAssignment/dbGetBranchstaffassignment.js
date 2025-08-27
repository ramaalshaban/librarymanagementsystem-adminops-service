const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");

const { BranchStaffAssignment } = require("models");
const { ObjectId } = require("mongoose").Types;

const { DBGetMongooseCommand } = require("dbCommand");

class DbGetBranchstaffassignmentCommand extends DBGetMongooseCommand {
  constructor(input) {
    super(input, BranchStaffAssignment);
    this.commandName = "dbGetBranchstaffassignment";
    this.nullResult = false;
    this.objectName = "branchStaffAssignment";
    this.serviceLabel = "librarymanagementsystem-adminops-service";
  }

  loadHookFunctions() {
    super.loadHookFunctions({});
  }

  async getCqrsJoins(data) {
    if (BranchStaffAssignment.getCqrsJoins) {
      await BranchStaffAssignment.getCqrsJoins(data);
    }
  }

  // populateQuery(query) {
  //  if (!this.input.getJoins) return query;
  //
  //  return query;
  //}

  initOwnership(input) {
    super.initOwnership(input);
  }

  async checkEntityOwnership(entity) {
    return true;
  }

  // ask about this should i rename the whereClause to dataClause???

  async transposeResult() {
    // transpose dbData
  }
}

const dbGetBranchstaffassignment = (input) => {
  input.id = input.branchStaffAssignmentId;
  const dbGetCommand = new DbGetBranchstaffassignmentCommand(input);
  return dbGetCommand.execute();
};

module.exports = dbGetBranchstaffassignment;

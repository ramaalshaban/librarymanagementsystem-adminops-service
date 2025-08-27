const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");

const { IssueEscalation } = require("models");
const { ObjectId } = require("mongoose").Types;

const { DBGetMongooseCommand } = require("dbCommand");

class DbGetIssueescalationCommand extends DBGetMongooseCommand {
  constructor(input) {
    super(input, IssueEscalation);
    this.commandName = "dbGetIssueescalation";
    this.nullResult = false;
    this.objectName = "issueEscalation";
    this.serviceLabel = "librarymanagementsystem-adminops-service";
  }

  loadHookFunctions() {
    super.loadHookFunctions({});
  }

  async getCqrsJoins(data) {
    if (IssueEscalation.getCqrsJoins) {
      await IssueEscalation.getCqrsJoins(data);
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

const dbGetIssueescalation = (input) => {
  input.id = input.issueEscalationId;
  const dbGetCommand = new DbGetIssueescalationCommand(input);
  return dbGetCommand.execute();
};

module.exports = dbGetIssueescalation;

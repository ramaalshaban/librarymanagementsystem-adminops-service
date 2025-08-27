const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");
// do i need to add the referring part or does the mongodb use the things differently
// is there specific approch to handle the referential integrity or it done interrenly
const { IssueEscalation } = require("models");
const { ObjectId } = require("mongoose").Types;

const {
  IssueEscalationQueryCacheInvalidator,
} = require("./query-cache-classes");

const { ElasticIndexer } = require("serviceCommon");

const { DBSoftDeleteMongooseCommand } = require("dbCommand");

class DbDeleteIssueescalationCommand extends DBSoftDeleteMongooseCommand {
  constructor(input) {
    const instanceMode = true;
    super(input, IssueEscalation, instanceMode);
    this.commandName = "dbDeleteIssueescalation";
    this.nullResult = false;
    this.objectName = "issueEscalation";
    this.serviceLabel = "librarymanagementsystem-adminops-service";
    this.dbEvent =
      "librarymanagementsystem-adminops-service" +
      "-dbevent-" +
      "issueescalation-deleted";
  }

  loadHookFunctions() {
    super.loadHookFunctions({});
  }

  initOwnership(input) {
    super.initOwnership(input);
  }

  async createQueryCacheInvalidator() {
    this.queryCacheInvalidator = new IssueEscalationQueryCacheInvalidator();
  }

  async indexDataToElastic() {
    const elasticIndexer = new ElasticIndexer(
      "issueEscalation",
      this.session,
      this.requestId,
    );
    await elasticIndexer.deleteData(this.dbData.id);
  }

  // ask about this should i rename the whereClause to dataClause???

  async transposeResult() {
    // transpose dbData
  }
}

const dbDeleteIssueescalation = async (input) => {
  input.id = input.issueEscalationId;
  const dbDeleteCommand = new DbDeleteIssueescalationCommand(input);
  return dbDeleteCommand.execute();
};

module.exports = dbDeleteIssueescalation;

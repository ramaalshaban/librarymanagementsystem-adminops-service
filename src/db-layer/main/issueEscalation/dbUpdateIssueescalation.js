const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");
const { IssueEscalation } = require("models");

const { DBUpdateMongooseCommand } = require("dbCommand");

const {
  IssueEscalationQueryCacheInvalidator,
} = require("./query-cache-classes");

const { ElasticIndexer } = require("serviceCommon");
const getIssueEscalationById = require("./utils/getIssueEscalationById");

class DbUpdateIssueescalationCommand extends DBUpdateMongooseCommand {
  constructor(input) {
    const instanceMode = true;
    input.isBulk = false;
    input.updateEach = false;
    super(input, IssueEscalation, instanceMode);
    this.commandName = "dbUpdateIssueescalation";
    this.nullResult = false;
    this.objectName = "issueEscalation";
    this.serviceLabel = "librarymanagementsystem-adminops-service";
    this.joinedCriteria = false;
    this.dbEvent =
      "librarymanagementsystem-adminops-service-dbevent-issueescalation-updated";
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
    this.queryCacheInvalidator = new IssueEscalationQueryCacheInvalidator();
  }

  async indexDataToElastic() {
    const elasticIndexer = new ElasticIndexer(
      "issueEscalation",
      this.session,
      this.requestId,
    );
    const dbData = await getIssueEscalationById(this.dbData.id);
    await elasticIndexer.indexData(dbData);
  }

  // ask about this should i rename the whereClause to dataClause???

  async setCalculatedFieldsAfterInstance(data) {
    const input = this.input;
  }
}

const dbUpdateIssueescalation = async (input) => {
  input.id = input.issueEscalationId;
  const dbUpdateCommand = new DbUpdateIssueescalationCommand(input);
  return await dbUpdateCommand.execute();
};

module.exports = dbUpdateIssueescalation;

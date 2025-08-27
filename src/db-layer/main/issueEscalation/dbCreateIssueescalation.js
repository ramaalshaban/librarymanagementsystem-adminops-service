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

const { IssueEscalation } = require("models");

const { DBCreateMongooseCommand } = require("dbCommand");

const {
  IssueEscalationQueryCacheInvalidator,
} = require("./query-cache-classes");

const { ElasticIndexer } = require("serviceCommon");
const getIssueEscalationById = require("./utils/getIssueEscalationById");

class DbCreateIssueescalationCommand extends DBCreateMongooseCommand {
  constructor(input) {
    super(input);
    this.commandName = "dbCreateIssueescalation";
    this.objectName = "issueEscalation";
    this.serviceLabel = "librarymanagementsystem-adminops-service";
    this.dbEvent =
      "librarymanagementsystem-adminops-service-dbevent-issueescalation-created";
  }

  loadHookFunctions() {
    super.loadHookFunctions({});
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

  async create_childs() {}

  async transposeResult() {
    // transpose dbData
  }

  async runDbCommand() {
    await super.runDbCommand();

    let issueEscalation = null;
    let whereClause = {};
    let updated = false;
    let exists = false;
    try {
      if (!updated && this.dataClause.id && !exists) {
        issueEscalation =
          issueEscalation ||
          (await IssueEscalation.findById(this.dataClause.id));
        if (issueEscalation) {
          delete this.dataClause.id;
          this.dataClause.isActive = true;
          await issueEscalation.update(this.dataClause);
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
        "Error in checking unique index when creating IssueEscalation",
        eDetail,
      );
    }

    if (!updated && !exists) {
      issueEscalation = await IssueEscalation.create(this.dataClause);
    }

    this.dbData = issueEscalation.getData();
    this.input.issueEscalation = this.dbData;
    await this.create_childs();
  }
}

const dbCreateIssueescalation = async (input) => {
  const dbCreateCommand = new DbCreateIssueescalationCommand(input);
  return await dbCreateCommand.execute();
};

module.exports = dbCreateIssueescalation;

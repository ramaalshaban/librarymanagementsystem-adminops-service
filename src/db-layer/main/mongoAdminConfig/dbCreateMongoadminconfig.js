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

const { MongoAdminConfig } = require("models");

const { DBCreateMongooseCommand } = require("dbCommand");

const {
  MongoAdminConfigQueryCacheInvalidator,
} = require("./query-cache-classes");

const { ElasticIndexer } = require("serviceCommon");
const getMongoAdminConfigById = require("./utils/getMongoAdminConfigById");

class DbCreateMongoadminconfigCommand extends DBCreateMongooseCommand {
  constructor(input) {
    super(input);
    this.commandName = "dbCreateMongoadminconfig";
    this.objectName = "mongoAdminConfig";
    this.serviceLabel = "librarymanagementsystem-adminops-service";
    this.dbEvent =
      "librarymanagementsystem-adminops-service-dbevent-mongoadminconfig-created";
  }

  loadHookFunctions() {
    super.loadHookFunctions({});
  }

  async createQueryCacheInvalidator() {
    this.queryCacheInvalidator = new MongoAdminConfigQueryCacheInvalidator();
  }

  async indexDataToElastic() {
    const elasticIndexer = new ElasticIndexer(
      "mongoAdminConfig",
      this.session,
      this.requestId,
    );
    const dbData = await getMongoAdminConfigById(this.dbData.id);
    await elasticIndexer.indexData(dbData);
  }

  // ask about this should i rename the whereClause to dataClause???

  async create_childs() {}

  async transposeResult() {
    // transpose dbData
  }

  async runDbCommand() {
    await super.runDbCommand();

    let mongoAdminConfig = null;
    let whereClause = {};
    let updated = false;
    let exists = false;
    try {
      if (!updated && this.dataClause.id && !exists) {
        mongoAdminConfig =
          mongoAdminConfig ||
          (await MongoAdminConfig.findById(this.dataClause.id));
        if (mongoAdminConfig) {
          delete this.dataClause.id;
          this.dataClause.isActive = true;
          await mongoAdminConfig.update(this.dataClause);
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
        "Error in checking unique index when creating MongoAdminConfig",
        eDetail,
      );
    }

    if (!updated && !exists) {
      mongoAdminConfig = await MongoAdminConfig.create(this.dataClause);
    }

    this.dbData = mongoAdminConfig.getData();
    this.input.mongoAdminConfig = this.dbData;
    await this.create_childs();
  }
}

const dbCreateMongoadminconfig = async (input) => {
  const dbCreateCommand = new DbCreateMongoadminconfigCommand(input);
  return await dbCreateCommand.execute();
};

module.exports = dbCreateMongoadminconfig;

const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");
const { MongoAdminConfig } = require("models");

const { DBUpdateMongooseCommand } = require("dbCommand");

const {
  MongoAdminConfigQueryCacheInvalidator,
} = require("./query-cache-classes");

const { ElasticIndexer } = require("serviceCommon");
const getMongoAdminConfigById = require("./utils/getMongoAdminConfigById");

class DbUpdateMongoadminconfigCommand extends DBUpdateMongooseCommand {
  constructor(input) {
    const instanceMode = true;
    input.isBulk = false;
    input.updateEach = false;
    super(input, MongoAdminConfig, instanceMode);
    this.commandName = "dbUpdateMongoadminconfig";
    this.nullResult = false;
    this.objectName = "mongoAdminConfig";
    this.serviceLabel = "librarymanagementsystem-adminops-service";
    this.joinedCriteria = false;
    this.dbEvent =
      "librarymanagementsystem-adminops-service-dbevent-mongoadminconfig-updated";
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

  async setCalculatedFieldsAfterInstance(data) {
    const input = this.input;
  }
}

const dbUpdateMongoadminconfig = async (input) => {
  input.id = input.mongoAdminConfigId;
  const dbUpdateCommand = new DbUpdateMongoadminconfigCommand(input);
  return await dbUpdateCommand.execute();
};

module.exports = dbUpdateMongoadminconfig;

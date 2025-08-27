const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");
// do i need to add the referring part or does the mongodb use the things differently
// is there specific approch to handle the referential integrity or it done interrenly
const { MongoAdminConfig } = require("models");
const { ObjectId } = require("mongoose").Types;

const {
  MongoAdminConfigQueryCacheInvalidator,
} = require("./query-cache-classes");

const { ElasticIndexer } = require("serviceCommon");

const { DBSoftDeleteMongooseCommand } = require("dbCommand");

class DbDeleteMongoadminconfigCommand extends DBSoftDeleteMongooseCommand {
  constructor(input) {
    const instanceMode = true;
    super(input, MongoAdminConfig, instanceMode);
    this.commandName = "dbDeleteMongoadminconfig";
    this.nullResult = false;
    this.objectName = "mongoAdminConfig";
    this.serviceLabel = "librarymanagementsystem-adminops-service";
    this.dbEvent =
      "librarymanagementsystem-adminops-service" +
      "-dbevent-" +
      "mongoadminconfig-deleted";
  }

  loadHookFunctions() {
    super.loadHookFunctions({});
  }

  initOwnership(input) {
    super.initOwnership(input);
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
    await elasticIndexer.deleteData(this.dbData.id);
  }

  // ask about this should i rename the whereClause to dataClause???

  async transposeResult() {
    // transpose dbData
  }
}

const dbDeleteMongoadminconfig = async (input) => {
  input.id = input.mongoAdminConfigId;
  const dbDeleteCommand = new DbDeleteMongoadminconfigCommand(input);
  return dbDeleteCommand.execute();
};

module.exports = dbDeleteMongoadminconfig;

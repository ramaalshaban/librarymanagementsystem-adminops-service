const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");
// do i need to add the referring part or does the mongodb use the things differently
// is there specific approch to handle the referential integrity or it done interrenly
const { ExternalNotificationConfig } = require("models");
const { ObjectId } = require("mongoose").Types;

const {
  ExternalNotificationConfigQueryCacheInvalidator,
} = require("./query-cache-classes");

const { ElasticIndexer } = require("serviceCommon");

const { DBSoftDeleteMongooseCommand } = require("dbCommand");

class DbDeleteExternalnotificationconfigCommand extends DBSoftDeleteMongooseCommand {
  constructor(input) {
    const instanceMode = true;
    super(input, ExternalNotificationConfig, instanceMode);
    this.commandName = "dbDeleteExternalnotificationconfig";
    this.nullResult = false;
    this.objectName = "externalNotificationConfig";
    this.serviceLabel = "librarymanagementsystem-adminops-service";
    this.dbEvent =
      "librarymanagementsystem-adminops-service" +
      "-dbevent-" +
      "externalnotificationconfig-deleted";
  }

  loadHookFunctions() {
    super.loadHookFunctions({});
  }

  initOwnership(input) {
    super.initOwnership(input);
  }

  async createQueryCacheInvalidator() {
    this.queryCacheInvalidator =
      new ExternalNotificationConfigQueryCacheInvalidator();
  }

  async indexDataToElastic() {
    const elasticIndexer = new ElasticIndexer(
      "externalNotificationConfig",
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

const dbDeleteExternalnotificationconfig = async (input) => {
  input.id = input.externalNotificationConfigId;
  const dbDeleteCommand = new DbDeleteExternalnotificationconfigCommand(input);
  return dbDeleteCommand.execute();
};

module.exports = dbDeleteExternalnotificationconfig;

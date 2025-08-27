const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");
const { ExternalNotificationConfig } = require("models");

const { DBUpdateMongooseCommand } = require("dbCommand");

const {
  ExternalNotificationConfigQueryCacheInvalidator,
} = require("./query-cache-classes");

const { ElasticIndexer } = require("serviceCommon");
const getExternalNotificationConfigById = require("./utils/getExternalNotificationConfigById");

class DbUpdateExternalnotificationconfigCommand extends DBUpdateMongooseCommand {
  constructor(input) {
    const instanceMode = true;
    input.isBulk = false;
    input.updateEach = false;
    super(input, ExternalNotificationConfig, instanceMode);
    this.commandName = "dbUpdateExternalnotificationconfig";
    this.nullResult = false;
    this.objectName = "externalNotificationConfig";
    this.serviceLabel = "librarymanagementsystem-adminops-service";
    this.joinedCriteria = false;
    this.dbEvent =
      "librarymanagementsystem-adminops-service-dbevent-externalnotificationconfig-updated";
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
    this.queryCacheInvalidator =
      new ExternalNotificationConfigQueryCacheInvalidator();
  }

  async indexDataToElastic() {
    const elasticIndexer = new ElasticIndexer(
      "externalNotificationConfig",
      this.session,
      this.requestId,
    );
    const dbData = await getExternalNotificationConfigById(this.dbData.id);
    await elasticIndexer.indexData(dbData);
  }

  // ask about this should i rename the whereClause to dataClause???

  async setCalculatedFieldsAfterInstance(data) {
    const input = this.input;
  }
}

const dbUpdateExternalnotificationconfig = async (input) => {
  input.id = input.externalNotificationConfigId;
  const dbUpdateCommand = new DbUpdateExternalnotificationconfigCommand(input);
  return await dbUpdateCommand.execute();
};

module.exports = dbUpdateExternalnotificationconfig;

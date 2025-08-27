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

const { ExternalNotificationConfig } = require("models");

const { DBCreateMongooseCommand } = require("dbCommand");

const {
  ExternalNotificationConfigQueryCacheInvalidator,
} = require("./query-cache-classes");

const { ElasticIndexer } = require("serviceCommon");
const getExternalNotificationConfigById = require("./utils/getExternalNotificationConfigById");

class DbCreateExternalnotificationconfigCommand extends DBCreateMongooseCommand {
  constructor(input) {
    super(input);
    this.commandName = "dbCreateExternalnotificationconfig";
    this.objectName = "externalNotificationConfig";
    this.serviceLabel = "librarymanagementsystem-adminops-service";
    this.dbEvent =
      "librarymanagementsystem-adminops-service-dbevent-externalnotificationconfig-created";
  }

  loadHookFunctions() {
    super.loadHookFunctions({});
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

  async create_childs() {}

  async transposeResult() {
    // transpose dbData
  }

  async runDbCommand() {
    await super.runDbCommand();

    let externalNotificationConfig = null;
    let whereClause = {};
    let updated = false;
    let exists = false;
    try {
      if (!updated && this.dataClause.id && !exists) {
        externalNotificationConfig =
          externalNotificationConfig ||
          (await ExternalNotificationConfig.findById(this.dataClause.id));
        if (externalNotificationConfig) {
          delete this.dataClause.id;
          this.dataClause.isActive = true;
          await externalNotificationConfig.update(this.dataClause);
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
        "Error in checking unique index when creating ExternalNotificationConfig",
        eDetail,
      );
    }

    if (!updated && !exists) {
      externalNotificationConfig = await ExternalNotificationConfig.create(
        this.dataClause,
      );
    }

    this.dbData = externalNotificationConfig.getData();
    this.input.externalNotificationConfig = this.dbData;
    await this.create_childs();
  }
}

const dbCreateExternalnotificationconfig = async (input) => {
  const dbCreateCommand = new DbCreateExternalnotificationconfigCommand(input);
  return await dbCreateCommand.execute();
};

module.exports = dbCreateExternalnotificationconfig;

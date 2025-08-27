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

const { SystemBackupAudit } = require("models");

const { DBCreateMongooseCommand } = require("dbCommand");

const {
  SystemBackupAuditQueryCacheInvalidator,
} = require("./query-cache-classes");

const { ElasticIndexer } = require("serviceCommon");
const getSystemBackupAuditById = require("./utils/getSystemBackupAuditById");

class DbCreateSystembackupauditCommand extends DBCreateMongooseCommand {
  constructor(input) {
    super(input);
    this.commandName = "dbCreateSystembackupaudit";
    this.objectName = "systemBackupAudit";
    this.serviceLabel = "librarymanagementsystem-adminops-service";
    this.dbEvent =
      "librarymanagementsystem-adminops-service-dbevent-systembackupaudit-created";
  }

  loadHookFunctions() {
    super.loadHookFunctions({});
  }

  async createQueryCacheInvalidator() {
    this.queryCacheInvalidator = new SystemBackupAuditQueryCacheInvalidator();
  }

  async indexDataToElastic() {
    const elasticIndexer = new ElasticIndexer(
      "systemBackupAudit",
      this.session,
      this.requestId,
    );
    const dbData = await getSystemBackupAuditById(this.dbData.id);
    await elasticIndexer.indexData(dbData);
  }

  // ask about this should i rename the whereClause to dataClause???

  async create_childs() {}

  async transposeResult() {
    // transpose dbData
  }

  async runDbCommand() {
    await super.runDbCommand();

    let systemBackupAudit = null;
    let whereClause = {};
    let updated = false;
    let exists = false;
    try {
      if (!updated && this.dataClause.id && !exists) {
        systemBackupAudit =
          systemBackupAudit ||
          (await SystemBackupAudit.findById(this.dataClause.id));
        if (systemBackupAudit) {
          delete this.dataClause.id;
          this.dataClause.isActive = true;
          await systemBackupAudit.update(this.dataClause);
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
        "Error in checking unique index when creating SystemBackupAudit",
        eDetail,
      );
    }

    if (!updated && !exists) {
      systemBackupAudit = await SystemBackupAudit.create(this.dataClause);
    }

    this.dbData = systemBackupAudit.getData();
    this.input.systemBackupAudit = this.dbData;
    await this.create_childs();
  }
}

const dbCreateSystembackupaudit = async (input) => {
  const dbCreateCommand = new DbCreateSystembackupauditCommand(input);
  return await dbCreateCommand.execute();
};

module.exports = dbCreateSystembackupaudit;

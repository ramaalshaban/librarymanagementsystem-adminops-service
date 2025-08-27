const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");
const { SystemBackupAudit } = require("models");

const { DBUpdateMongooseCommand } = require("dbCommand");

const {
  SystemBackupAuditQueryCacheInvalidator,
} = require("./query-cache-classes");

const { ElasticIndexer } = require("serviceCommon");
const getSystemBackupAuditById = require("./utils/getSystemBackupAuditById");

class DbUpdateSystembackupauditCommand extends DBUpdateMongooseCommand {
  constructor(input) {
    const instanceMode = true;
    input.isBulk = false;
    input.updateEach = false;
    super(input, SystemBackupAudit, instanceMode);
    this.commandName = "dbUpdateSystembackupaudit";
    this.nullResult = false;
    this.objectName = "systemBackupAudit";
    this.serviceLabel = "librarymanagementsystem-adminops-service";
    this.joinedCriteria = false;
    this.dbEvent =
      "librarymanagementsystem-adminops-service-dbevent-systembackupaudit-updated";
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

  async setCalculatedFieldsAfterInstance(data) {
    const input = this.input;
  }
}

const dbUpdateSystembackupaudit = async (input) => {
  input.id = input.systemBackupAuditId;
  const dbUpdateCommand = new DbUpdateSystembackupauditCommand(input);
  return await dbUpdateCommand.execute();
};

module.exports = dbUpdateSystembackupaudit;

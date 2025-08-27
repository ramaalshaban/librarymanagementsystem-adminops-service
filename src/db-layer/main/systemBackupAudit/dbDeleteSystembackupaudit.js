const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");
// do i need to add the referring part or does the mongodb use the things differently
// is there specific approch to handle the referential integrity or it done interrenly
const { SystemBackupAudit } = require("models");
const { ObjectId } = require("mongoose").Types;

const {
  SystemBackupAuditQueryCacheInvalidator,
} = require("./query-cache-classes");

const { ElasticIndexer } = require("serviceCommon");

const { DBSoftDeleteMongooseCommand } = require("dbCommand");

class DbDeleteSystembackupauditCommand extends DBSoftDeleteMongooseCommand {
  constructor(input) {
    const instanceMode = true;
    super(input, SystemBackupAudit, instanceMode);
    this.commandName = "dbDeleteSystembackupaudit";
    this.nullResult = false;
    this.objectName = "systemBackupAudit";
    this.serviceLabel = "librarymanagementsystem-adminops-service";
    this.dbEvent =
      "librarymanagementsystem-adminops-service" +
      "-dbevent-" +
      "systembackupaudit-deleted";
  }

  loadHookFunctions() {
    super.loadHookFunctions({});
  }

  initOwnership(input) {
    super.initOwnership(input);
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
    await elasticIndexer.deleteData(this.dbData.id);
  }

  // ask about this should i rename the whereClause to dataClause???

  async transposeResult() {
    // transpose dbData
  }
}

const dbDeleteSystembackupaudit = async (input) => {
  input.id = input.systemBackupAuditId;
  const dbDeleteCommand = new DbDeleteSystembackupauditCommand(input);
  return dbDeleteCommand.execute();
};

module.exports = dbDeleteSystembackupaudit;

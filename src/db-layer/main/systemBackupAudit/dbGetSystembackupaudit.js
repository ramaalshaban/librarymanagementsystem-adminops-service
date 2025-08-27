const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");

const { SystemBackupAudit } = require("models");
const { ObjectId } = require("mongoose").Types;

const { DBGetMongooseCommand } = require("dbCommand");

class DbGetSystembackupauditCommand extends DBGetMongooseCommand {
  constructor(input) {
    super(input, SystemBackupAudit);
    this.commandName = "dbGetSystembackupaudit";
    this.nullResult = false;
    this.objectName = "systemBackupAudit";
    this.serviceLabel = "librarymanagementsystem-adminops-service";
  }

  loadHookFunctions() {
    super.loadHookFunctions({});
  }

  async getCqrsJoins(data) {
    if (SystemBackupAudit.getCqrsJoins) {
      await SystemBackupAudit.getCqrsJoins(data);
    }
  }

  // populateQuery(query) {
  //  if (!this.input.getJoins) return query;
  //
  //  return query;
  //}

  initOwnership(input) {
    super.initOwnership(input);
  }

  async checkEntityOwnership(entity) {
    return true;
  }

  // ask about this should i rename the whereClause to dataClause???

  async transposeResult() {
    // transpose dbData
  }
}

const dbGetSystembackupaudit = (input) => {
  input.id = input.systemBackupAuditId;
  const dbGetCommand = new DbGetSystembackupauditCommand(input);
  return dbGetCommand.execute();
};

module.exports = dbGetSystembackupaudit;

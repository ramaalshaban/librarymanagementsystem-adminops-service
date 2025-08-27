const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");

const { ExternalNotificationConfig } = require("models");
const { ObjectId } = require("mongoose").Types;

const { DBGetMongooseCommand } = require("dbCommand");

class DbGetExternalnotificationconfigCommand extends DBGetMongooseCommand {
  constructor(input) {
    super(input, ExternalNotificationConfig);
    this.commandName = "dbGetExternalnotificationconfig";
    this.nullResult = false;
    this.objectName = "externalNotificationConfig";
    this.serviceLabel = "librarymanagementsystem-adminops-service";
  }

  loadHookFunctions() {
    super.loadHookFunctions({});
  }

  async getCqrsJoins(data) {
    if (ExternalNotificationConfig.getCqrsJoins) {
      await ExternalNotificationConfig.getCqrsJoins(data);
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

const dbGetExternalnotificationconfig = (input) => {
  input.id = input.externalNotificationConfigId;
  const dbGetCommand = new DbGetExternalnotificationconfigCommand(input);
  return dbGetCommand.execute();
};

module.exports = dbGetExternalnotificationconfig;

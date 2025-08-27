const utils = require("./utils");
const dbApiScripts = require("./dbApiScripts");

module.exports = {
  dbGetExternalnotificationconfig: require("./dbGetExternalnotificationconfig"),
  dbCreateExternalnotificationconfig: require("./dbCreateExternalnotificationconfig"),
  dbUpdateExternalnotificationconfig: require("./dbUpdateExternalnotificationconfig"),
  dbDeleteExternalnotificationconfig: require("./dbDeleteExternalnotificationconfig"),
  dbListExternalnotificationconfigs: require("./dbListExternalnotificationconfigs"),
  createExternalNotificationConfig: utils.createExternalNotificationConfig,
  getIdListOfExternalNotificationConfigByField:
    utils.getIdListOfExternalNotificationConfigByField,
  getExternalNotificationConfigById: utils.getExternalNotificationConfigById,
  getExternalNotificationConfigAggById:
    utils.getExternalNotificationConfigAggById,
  getExternalNotificationConfigListByQuery:
    utils.getExternalNotificationConfigListByQuery,
  getExternalNotificationConfigStatsByQuery:
    utils.getExternalNotificationConfigStatsByQuery,
  getExternalNotificationConfigByQuery:
    utils.getExternalNotificationConfigByQuery,
  updateExternalNotificationConfigById:
    utils.updateExternalNotificationConfigById,
  updateExternalNotificationConfigByIdList:
    utils.updateExternalNotificationConfigByIdList,
  updateExternalNotificationConfigByQuery:
    utils.updateExternalNotificationConfigByQuery,
  deleteExternalNotificationConfigById:
    utils.deleteExternalNotificationConfigById,
  deleteExternalNotificationConfigByQuery:
    utils.deleteExternalNotificationConfigByQuery,
};

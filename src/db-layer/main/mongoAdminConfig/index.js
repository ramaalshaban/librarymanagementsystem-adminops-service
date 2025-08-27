const utils = require("./utils");
const dbApiScripts = require("./dbApiScripts");

module.exports = {
  dbGetMongoadminconfig: require("./dbGetMongoadminconfig"),
  dbCreateMongoadminconfig: require("./dbCreateMongoadminconfig"),
  dbUpdateMongoadminconfig: require("./dbUpdateMongoadminconfig"),
  dbDeleteMongoadminconfig: require("./dbDeleteMongoadminconfig"),
  dbListMongoadminconfigs: require("./dbListMongoadminconfigs"),
  createMongoAdminConfig: utils.createMongoAdminConfig,
  getIdListOfMongoAdminConfigByField: utils.getIdListOfMongoAdminConfigByField,
  getMongoAdminConfigById: utils.getMongoAdminConfigById,
  getMongoAdminConfigAggById: utils.getMongoAdminConfigAggById,
  getMongoAdminConfigListByQuery: utils.getMongoAdminConfigListByQuery,
  getMongoAdminConfigStatsByQuery: utils.getMongoAdminConfigStatsByQuery,
  getMongoAdminConfigByQuery: utils.getMongoAdminConfigByQuery,
  updateMongoAdminConfigById: utils.updateMongoAdminConfigById,
  updateMongoAdminConfigByIdList: utils.updateMongoAdminConfigByIdList,
  updateMongoAdminConfigByQuery: utils.updateMongoAdminConfigByQuery,
  deleteMongoAdminConfigById: utils.deleteMongoAdminConfigById,
  deleteMongoAdminConfigByQuery: utils.deleteMongoAdminConfigByQuery,
};

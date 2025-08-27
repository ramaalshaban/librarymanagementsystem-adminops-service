const utils = require("./utils");
const dbApiScripts = require("./dbApiScripts");

module.exports = {
  createAdminOpsShareToken: utils.createAdminOpsShareToken,
  getIdListOfAdminOpsShareTokenByField:
    utils.getIdListOfAdminOpsShareTokenByField,
  getAdminOpsShareTokenById: utils.getAdminOpsShareTokenById,
  getAdminOpsShareTokenAggById: utils.getAdminOpsShareTokenAggById,
  getAdminOpsShareTokenListByQuery: utils.getAdminOpsShareTokenListByQuery,
  getAdminOpsShareTokenStatsByQuery: utils.getAdminOpsShareTokenStatsByQuery,
  getAdminOpsShareTokenByQuery: utils.getAdminOpsShareTokenByQuery,
  updateAdminOpsShareTokenById: utils.updateAdminOpsShareTokenById,
  updateAdminOpsShareTokenByIdList: utils.updateAdminOpsShareTokenByIdList,
  updateAdminOpsShareTokenByQuery: utils.updateAdminOpsShareTokenByQuery,
  deleteAdminOpsShareTokenById: utils.deleteAdminOpsShareTokenById,
  deleteAdminOpsShareTokenByQuery: utils.deleteAdminOpsShareTokenByQuery,
};

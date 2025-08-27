const utils = require("./utils");
const dbApiScripts = require("./dbApiScripts");

module.exports = {
  createTregt: utils.createTregt,
  getIdListOfTregtByField: utils.getIdListOfTregtByField,
  getTregtById: utils.getTregtById,
  getTregtAggById: utils.getTregtAggById,
  getTregtListByQuery: utils.getTregtListByQuery,
  getTregtStatsByQuery: utils.getTregtStatsByQuery,
  getTregtByQuery: utils.getTregtByQuery,
  updateTregtById: utils.updateTregtById,
  updateTregtByIdList: utils.updateTregtByIdList,
  updateTregtByQuery: utils.updateTregtByQuery,
  deleteTregtById: utils.deleteTregtById,
  deleteTregtByQuery: utils.deleteTregtByQuery,
};

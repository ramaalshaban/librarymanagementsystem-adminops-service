const utils = require("./utils");
const dbApiScripts = require("./dbApiScripts");

module.exports = {
  dbGetIssueescalation: require("./dbGetIssueescalation"),
  dbCreateIssueescalation: require("./dbCreateIssueescalation"),
  dbUpdateIssueescalation: require("./dbUpdateIssueescalation"),
  dbDeleteIssueescalation: require("./dbDeleteIssueescalation"),
  dbListIssueescalations: require("./dbListIssueescalations"),
  createIssueEscalation: utils.createIssueEscalation,
  getIdListOfIssueEscalationByField: utils.getIdListOfIssueEscalationByField,
  getIssueEscalationById: utils.getIssueEscalationById,
  getIssueEscalationAggById: utils.getIssueEscalationAggById,
  getIssueEscalationListByQuery: utils.getIssueEscalationListByQuery,
  getIssueEscalationStatsByQuery: utils.getIssueEscalationStatsByQuery,
  getIssueEscalationByQuery: utils.getIssueEscalationByQuery,
  updateIssueEscalationById: utils.updateIssueEscalationById,
  updateIssueEscalationByIdList: utils.updateIssueEscalationByIdList,
  updateIssueEscalationByQuery: utils.updateIssueEscalationByQuery,
  deleteIssueEscalationById: utils.deleteIssueEscalationById,
  deleteIssueEscalationByQuery: utils.deleteIssueEscalationByQuery,
};

module.exports = (headers) => {
  // IssueEscalation Db Object Rest Api Router
  const issueEscalationMcpRouter = [];
  // getIssueEscalation controller
  issueEscalationMcpRouter.push(require("./get-issueescalation")(headers));
  // createIssueEscalation controller
  issueEscalationMcpRouter.push(require("./create-issueescalation")(headers));
  // updateIssueEscalation controller
  issueEscalationMcpRouter.push(require("./update-issueescalation")(headers));
  // deleteIssueEscalation controller
  issueEscalationMcpRouter.push(require("./delete-issueescalation")(headers));
  // listIssueEscalations controller
  issueEscalationMcpRouter.push(require("./list-issueescalations")(headers));
  return issueEscalationMcpRouter;
};

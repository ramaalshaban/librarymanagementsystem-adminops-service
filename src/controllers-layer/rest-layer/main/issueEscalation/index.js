const express = require("express");

// IssueEscalation Db Object Rest Api Router
const issueEscalationRouter = express.Router();

// add IssueEscalation controllers

// getIssueEscalation controller
issueEscalationRouter.get(
  "/issueescalations/:issueEscalationId",
  require("./get-issueescalation"),
);
// createIssueEscalation controller
issueEscalationRouter.post(
  "/issueescalations",
  require("./create-issueescalation"),
);
// updateIssueEscalation controller
issueEscalationRouter.patch(
  "/issueescalations/:issueEscalationId",
  require("./update-issueescalation"),
);
// deleteIssueEscalation controller
issueEscalationRouter.delete(
  "/issueescalations/:issueEscalationId",
  require("./delete-issueescalation"),
);
// listIssueEscalations controller
issueEscalationRouter.get(
  "/issueescalations",
  require("./list-issueescalations"),
);

module.exports = issueEscalationRouter;

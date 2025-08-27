const { HttpServerError, BadRequestError } = require("common");

const { IssueEscalation } = require("models");

const getIssueEscalationByQuery = async (query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }

    const issueEscalation = await IssueEscalation.findOne({
      ...query,
      isActive: true,
    });

    if (!issueEscalation) return null;

    return issueEscalation.getData();
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingIssueEscalationByQuery",
      err,
    );
  }
};

module.exports = getIssueEscalationByQuery;

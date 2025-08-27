const { HttpServerError, BadRequestError, NotFoundError } = require("common");
const { IssueEscalation } = require("models");

const getIssueEscalationListByQuery = async (query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }

    const issueEscalation = await IssueEscalation.find(query);

    if (!issueEscalation || issueEscalation.length === 0) return [];

    //should i add not found error or only return empty array?
    //      if (!issueEscalation || issueEscalation.length === 0) {
    //      throw new NotFoundError(
    //      `IssueEscalation with the specified criteria not found`
    //  );
    //}

    return issueEscalation.map((item) => item.getData());
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingIssueEscalationListByQuery",
      err,
    );
  }
};

module.exports = getIssueEscalationListByQuery;

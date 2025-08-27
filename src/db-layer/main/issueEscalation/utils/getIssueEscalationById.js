const { HttpServerError } = require("common");

const { IssueEscalation } = require("models");

const getIssueEscalationById = async (issueEscalationId) => {
  try {
    let issueEscalation;

    if (Array.isArray(issueEscalationId)) {
      issueEscalation = await IssueEscalation.find({
        _id: { $in: issueEscalationId },
        isActive: true,
      });
    } else {
      issueEscalation = await IssueEscalation.findOne({
        _id: issueEscalationId,
        isActive: true,
      });
    }

    if (!issueEscalation) {
      return null;
    }

    return Array.isArray(issueEscalationId)
      ? issueEscalation.map((item) => item.getData())
      : issueEscalation.getData();
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingIssueEscalationById",
      err,
    );
  }
};

module.exports = getIssueEscalationById;

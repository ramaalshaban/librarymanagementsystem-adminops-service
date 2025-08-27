const { HttpServerError } = require("common");

const { IssueEscalation } = require("models");

const updateIssueEscalationByIdList = async (idList, dataClause) => {
  try {
    await IssueEscalation.updateMany(
      { _id: { $in: idList }, isActive: true },
      dataClause,
    );

    const updatedDocs = await IssueEscalation.find(
      { _id: { $in: idList }, isActive: true },
      { _id: 1 },
    );

    const issueEscalationIdList = updatedDocs.map((doc) => doc._id);

    return issueEscalationIdList;
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenUpdatingIssueEscalationByIdList",
      err,
    );
  }
};

module.exports = updateIssueEscalationByIdList;

const { HttpServerError } = require("common");

const { AdminOpsShareToken } = require("models");

const updateAdminOpsShareTokenByIdList = async (idList, dataClause) => {
  try {
    await AdminOpsShareToken.updateMany(
      { _id: { $in: idList }, isActive: true },
      dataClause,
    );

    const updatedDocs = await AdminOpsShareToken.find(
      { _id: { $in: idList }, isActive: true },
      { _id: 1 },
    );

    const adminOpsShareTokenIdList = updatedDocs.map((doc) => doc._id);

    return adminOpsShareTokenIdList;
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenUpdatingAdminOpsShareTokenByIdList",
      err,
    );
  }
};

module.exports = updateAdminOpsShareTokenByIdList;

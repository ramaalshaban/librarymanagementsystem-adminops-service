const { HttpServerError } = require("common");

const { Tregt } = require("models");

const updateTregtByIdList = async (idList, dataClause) => {
  try {
    await Tregt.updateMany(
      { _id: { $in: idList }, isActive: true },
      dataClause,
    );

    const updatedDocs = await Tregt.find(
      { _id: { $in: idList }, isActive: true },
      { _id: 1 },
    );

    const tregtIdList = updatedDocs.map((doc) => doc._id);

    return tregtIdList;
  } catch (err) {
    throw new HttpServerError("errMsg_dbErrorWhenUpdatingTregtByIdList", err);
  }
};

module.exports = updateTregtByIdList;

const { HttpServerError } = require("common");

const { MongoAdminConfig } = require("models");

const updateMongoAdminConfigByIdList = async (idList, dataClause) => {
  try {
    await MongoAdminConfig.updateMany(
      { _id: { $in: idList }, isActive: true },
      dataClause,
    );

    const updatedDocs = await MongoAdminConfig.find(
      { _id: { $in: idList }, isActive: true },
      { _id: 1 },
    );

    const mongoAdminConfigIdList = updatedDocs.map((doc) => doc._id);

    return mongoAdminConfigIdList;
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenUpdatingMongoAdminConfigByIdList",
      err,
    );
  }
};

module.exports = updateMongoAdminConfigByIdList;

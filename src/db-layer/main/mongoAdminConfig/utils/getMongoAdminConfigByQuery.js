const { HttpServerError, BadRequestError } = require("common");

const { MongoAdminConfig } = require("models");

const getMongoAdminConfigByQuery = async (query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }

    const mongoAdminConfig = await MongoAdminConfig.findOne({
      ...query,
      isActive: true,
    });

    if (!mongoAdminConfig) return null;

    return mongoAdminConfig.getData();
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingMongoAdminConfigByQuery",
      err,
    );
  }
};

module.exports = getMongoAdminConfigByQuery;

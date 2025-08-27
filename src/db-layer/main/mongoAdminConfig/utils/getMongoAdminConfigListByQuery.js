const { HttpServerError, BadRequestError, NotFoundError } = require("common");
const { MongoAdminConfig } = require("models");

const getMongoAdminConfigListByQuery = async (query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }

    const mongoAdminConfig = await MongoAdminConfig.find(query);

    if (!mongoAdminConfig || mongoAdminConfig.length === 0) return [];

    //should i add not found error or only return empty array?
    //      if (!mongoAdminConfig || mongoAdminConfig.length === 0) {
    //      throw new NotFoundError(
    //      `MongoAdminConfig with the specified criteria not found`
    //  );
    //}

    return mongoAdminConfig.map((item) => item.getData());
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingMongoAdminConfigListByQuery",
      err,
    );
  }
};

module.exports = getMongoAdminConfigListByQuery;

const { HttpServerError } = require("common");

const { MongoAdminConfig } = require("models");

const getMongoAdminConfigById = async (mongoAdminConfigId) => {
  try {
    let mongoAdminConfig;

    if (Array.isArray(mongoAdminConfigId)) {
      mongoAdminConfig = await MongoAdminConfig.find({
        _id: { $in: mongoAdminConfigId },
        isActive: true,
      });
    } else {
      mongoAdminConfig = await MongoAdminConfig.findOne({
        _id: mongoAdminConfigId,
        isActive: true,
      });
    }

    if (!mongoAdminConfig) {
      return null;
    }

    return Array.isArray(mongoAdminConfigId)
      ? mongoAdminConfig.map((item) => item.getData())
      : mongoAdminConfig.getData();
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingMongoAdminConfigById",
      err,
    );
  }
};

module.exports = getMongoAdminConfigById;

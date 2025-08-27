const { HttpServerError } = require("common");

const { MongoAdminConfig } = require("models");

const getMongoAdminConfigAggById = async (mongoAdminConfigId) => {
  try {
    let mongoAdminConfigQuery;

    if (Array.isArray(mongoAdminConfigId)) {
      mongoAdminConfigQuery = MongoAdminConfig.find({
        _id: { $in: mongoAdminConfigId },
        isActive: true,
      });
    } else {
      mongoAdminConfigQuery = MongoAdminConfig.findOne({
        _id: mongoAdminConfigId,
        isActive: true,
      });
    }

    // Populate associations as needed

    const mongoAdminConfig = await mongoAdminConfigQuery.exec();

    if (!mongoAdminConfig) {
      return null;
    }
    const mongoAdminConfigData =
      Array.isArray(mongoAdminConfigId) && mongoAdminConfigId.length > 0
        ? mongoAdminConfig.map((item) => item.getData())
        : mongoAdminConfig.getData();

    // should i add this here?
    await MongoAdminConfig.getCqrsJoins(mongoAdminConfigData);

    return mongoAdminConfigData;
  } catch (err) {
    console.log(err);
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingMongoAdminConfigAggById",
      err,
    );
  }
};

// "__PropertyEnumSettings.doc": "Enum configuration for the data property, applicable when the property type is set to Enum. While enum values are stored as integers in the database, defining the enum options here allows Mindbricks to enrich API responses with human-readable labels, easing interpretation and UI integration. If not defined, only the numeric value will be returned.",
// "PropertyEnumSettings": {
//   "__hasEnumOptions.doc": "Enables support for named enum values when the property type is Enum. Though values are stored as integers, enabling this adds the symbolic name to API responses for clarity.",
//   "__config.doc": "The configuration object for enum options. Leave it null if hasEnumOptions is false.",
//   "__activation": "hasEnumOptions",
//  "__lines": "\
//  a-hasEnumOptions\
//  g-config",
//  "hasEnumOptions": "Boolean",
//  "config": "PropertyEnumSettingsConfig"
//},

module.exports = getMongoAdminConfigAggById;

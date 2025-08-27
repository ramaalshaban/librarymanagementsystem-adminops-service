const { HttpServerError } = require("common");

const { ExternalNotificationConfig } = require("models");

const getExternalNotificationConfigAggById = async (
  externalNotificationConfigId,
) => {
  try {
    let externalNotificationConfigQuery;

    if (Array.isArray(externalNotificationConfigId)) {
      externalNotificationConfigQuery = ExternalNotificationConfig.find({
        _id: { $in: externalNotificationConfigId },
        isActive: true,
      });
    } else {
      externalNotificationConfigQuery = ExternalNotificationConfig.findOne({
        _id: externalNotificationConfigId,
        isActive: true,
      });
    }

    // Populate associations as needed

    const externalNotificationConfig =
      await externalNotificationConfigQuery.exec();

    if (!externalNotificationConfig) {
      return null;
    }
    const externalNotificationConfigData =
      Array.isArray(externalNotificationConfigId) &&
      externalNotificationConfigId.length > 0
        ? externalNotificationConfig.map((item) => item.getData())
        : externalNotificationConfig.getData();

    // should i add this here?
    await ExternalNotificationConfig.getCqrsJoins(
      externalNotificationConfigData,
    );

    return externalNotificationConfigData;
  } catch (err) {
    console.log(err);
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingExternalNotificationConfigAggById",
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

module.exports = getExternalNotificationConfigAggById;

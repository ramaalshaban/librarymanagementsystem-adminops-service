const { HttpServerError } = require("common");

const { SystemBackupAudit } = require("models");

const getSystemBackupAuditAggById = async (systemBackupAuditId) => {
  try {
    let systemBackupAuditQuery;

    if (Array.isArray(systemBackupAuditId)) {
      systemBackupAuditQuery = SystemBackupAudit.find({
        _id: { $in: systemBackupAuditId },
        isActive: true,
      });
    } else {
      systemBackupAuditQuery = SystemBackupAudit.findOne({
        _id: systemBackupAuditId,
        isActive: true,
      });
    }

    // Populate associations as needed

    const systemBackupAudit = await systemBackupAuditQuery.exec();

    if (!systemBackupAudit) {
      return null;
    }
    const systemBackupAuditData =
      Array.isArray(systemBackupAuditId) && systemBackupAuditId.length > 0
        ? systemBackupAudit.map((item) => item.getData())
        : systemBackupAudit.getData();

    // should i add this here?
    await SystemBackupAudit.getCqrsJoins(systemBackupAuditData);

    return systemBackupAuditData;
  } catch (err) {
    console.log(err);
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingSystemBackupAuditAggById",
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

module.exports = getSystemBackupAuditAggById;

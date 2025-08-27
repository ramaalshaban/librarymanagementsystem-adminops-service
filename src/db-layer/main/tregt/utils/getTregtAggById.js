const { HttpServerError } = require("common");

const { Tregt } = require("models");

const getTregtAggById = async (tregtId) => {
  try {
    let tregtQuery;

    if (Array.isArray(tregtId)) {
      tregtQuery = Tregt.find({
        _id: { $in: tregtId },
        isActive: true,
      });
    } else {
      tregtQuery = Tregt.findOne({
        _id: tregtId,
        isActive: true,
      });
    }

    // Populate associations as needed

    const tregt = await tregtQuery.exec();

    if (!tregt) {
      return null;
    }
    const tregtData =
      Array.isArray(tregtId) && tregtId.length > 0
        ? tregt.map((item) => item.getData())
        : tregt.getData();

    // should i add this here?
    await Tregt.getCqrsJoins(tregtData);

    return tregtData;
  } catch (err) {
    console.log(err);
    throw new HttpServerError("errMsg_dbErrorWhenRequestingTregtAggById", err);
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

module.exports = getTregtAggById;

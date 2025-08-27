const { HttpServerError } = require("common");

const { AdminOpsShareToken } = require("models");

const getAdminOpsShareTokenById = async (adminOpsShareTokenId) => {
  try {
    let adminOpsShareToken;

    if (Array.isArray(adminOpsShareTokenId)) {
      adminOpsShareToken = await AdminOpsShareToken.find({
        _id: { $in: adminOpsShareTokenId },
        isActive: true,
      });
    } else {
      adminOpsShareToken = await AdminOpsShareToken.findOne({
        _id: adminOpsShareTokenId,
        isActive: true,
      });
    }

    if (!adminOpsShareToken) {
      return null;
    }

    return Array.isArray(adminOpsShareTokenId)
      ? adminOpsShareToken.map((item) => item.getData())
      : adminOpsShareToken.getData();
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingAdminOpsShareTokenById",
      err,
    );
  }
};

module.exports = getAdminOpsShareTokenById;

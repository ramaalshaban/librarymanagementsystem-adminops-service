const { HttpServerError, BadRequestError } = require("common");

const { AdminOpsShareToken } = require("models");

const getAdminOpsShareTokenByQuery = async (query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }

    const adminOpsShareToken = await AdminOpsShareToken.findOne({
      ...query,
      isActive: true,
    });

    if (!adminOpsShareToken) return null;

    return adminOpsShareToken.getData();
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingAdminOpsShareTokenByQuery",
      err,
    );
  }
};

module.exports = getAdminOpsShareTokenByQuery;

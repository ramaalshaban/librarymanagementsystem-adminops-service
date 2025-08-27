const { HttpServerError, BadRequestError } = require("common");

const { Tregt } = require("models");

const getTregtByQuery = async (query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }

    const tregt = await Tregt.findOne({
      ...query,
      isActive: true,
    });

    if (!tregt) return null;

    return tregt.getData();
  } catch (err) {
    throw new HttpServerError("errMsg_dbErrorWhenRequestingTregtByQuery", err);
  }
};

module.exports = getTregtByQuery;

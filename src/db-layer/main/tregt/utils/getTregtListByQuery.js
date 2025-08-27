const { HttpServerError, BadRequestError, NotFoundError } = require("common");
const { Tregt } = require("models");

const getTregtListByQuery = async (query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }

    const tregt = await Tregt.find(query);

    if (!tregt || tregt.length === 0) return [];

    //should i add not found error or only return empty array?
    //      if (!tregt || tregt.length === 0) {
    //      throw new NotFoundError(
    //      `Tregt with the specified criteria not found`
    //  );
    //}

    return tregt.map((item) => item.getData());
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingTregtListByQuery",
      err,
    );
  }
};

module.exports = getTregtListByQuery;

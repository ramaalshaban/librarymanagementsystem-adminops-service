const { HttpServerError } = require("common");

const { Tregt } = require("models");

const getTregtById = async (tregtId) => {
  try {
    let tregt;

    if (Array.isArray(tregtId)) {
      tregt = await Tregt.find({
        _id: { $in: tregtId },
        isActive: true,
      });
    } else {
      tregt = await Tregt.findOne({
        _id: tregtId,
        isActive: true,
      });
    }

    if (!tregt) {
      return null;
    }

    return Array.isArray(tregtId)
      ? tregt.map((item) => item.getData())
      : tregt.getData();
  } catch (err) {
    throw new HttpServerError("errMsg_dbErrorWhenRequestingTregtById", err);
  }
};

module.exports = getTregtById;

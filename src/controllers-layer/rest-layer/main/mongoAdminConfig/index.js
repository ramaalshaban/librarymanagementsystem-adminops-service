const express = require("express");

// MongoAdminConfig Db Object Rest Api Router
const mongoAdminConfigRouter = express.Router();

// add MongoAdminConfig controllers

// getMongoAdminConfig controller
mongoAdminConfigRouter.get(
  "/mongoadminconfigs/:mongoAdminConfigId",
  require("./get-mongoadminconfig"),
);
// createMongoAdminConfig controller
mongoAdminConfigRouter.post(
  "/mongoadminconfigs",
  require("./create-mongoadminconfig"),
);
// updateMongoAdminConfig controller
mongoAdminConfigRouter.patch(
  "/mongoadminconfigs/:mongoAdminConfigId",
  require("./update-mongoadminconfig"),
);
// deleteMongoAdminConfig controller
mongoAdminConfigRouter.delete(
  "/mongoadminconfigs/:mongoAdminConfigId",
  require("./delete-mongoadminconfig"),
);
// listMongoAdminConfigs controller
mongoAdminConfigRouter.get(
  "/mongoadminconfigs",
  require("./list-mongoadminconfigs"),
);

module.exports = mongoAdminConfigRouter;

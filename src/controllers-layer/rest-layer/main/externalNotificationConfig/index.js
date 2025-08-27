const express = require("express");

// ExternalNotificationConfig Db Object Rest Api Router
const externalNotificationConfigRouter = express.Router();

// add ExternalNotificationConfig controllers

// getExternalNotificationConfig controller
externalNotificationConfigRouter.get(
  "/externalnotificationconfigs/:externalNotificationConfigId",
  require("./get-externalnotificationconfig"),
);
// createExternalNotificationConfig controller
externalNotificationConfigRouter.post(
  "/externalnotificationconfigs",
  require("./create-externalnotificationconfig"),
);
// updateExternalNotificationConfig controller
externalNotificationConfigRouter.patch(
  "/externalnotificationconfigs/:externalNotificationConfigId",
  require("./update-externalnotificationconfig"),
);
// deleteExternalNotificationConfig controller
externalNotificationConfigRouter.delete(
  "/externalnotificationconfigs/:externalNotificationConfigId",
  require("./delete-externalnotificationconfig"),
);
// listExternalNotificationConfigs controller
externalNotificationConfigRouter.get(
  "/externalnotificationconfigs",
  require("./list-externalnotificationconfigs"),
);

module.exports = externalNotificationConfigRouter;

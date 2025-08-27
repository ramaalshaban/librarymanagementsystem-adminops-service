module.exports = (headers) => {
  // ExternalNotificationConfig Db Object Rest Api Router
  const externalNotificationConfigMcpRouter = [];
  // getExternalNotificationConfig controller
  externalNotificationConfigMcpRouter.push(
    require("./get-externalnotificationconfig")(headers),
  );
  // createExternalNotificationConfig controller
  externalNotificationConfigMcpRouter.push(
    require("./create-externalnotificationconfig")(headers),
  );
  // updateExternalNotificationConfig controller
  externalNotificationConfigMcpRouter.push(
    require("./update-externalnotificationconfig")(headers),
  );
  // deleteExternalNotificationConfig controller
  externalNotificationConfigMcpRouter.push(
    require("./delete-externalnotificationconfig")(headers),
  );
  // listExternalNotificationConfigs controller
  externalNotificationConfigMcpRouter.push(
    require("./list-externalnotificationconfigs")(headers),
  );
  return externalNotificationConfigMcpRouter;
};

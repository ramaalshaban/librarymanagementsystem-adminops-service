module.exports = (headers) => {
  // MongoAdminConfig Db Object Rest Api Router
  const mongoAdminConfigMcpRouter = [];
  // getMongoAdminConfig controller
  mongoAdminConfigMcpRouter.push(require("./get-mongoadminconfig")(headers));
  // createMongoAdminConfig controller
  mongoAdminConfigMcpRouter.push(require("./create-mongoadminconfig")(headers));
  // updateMongoAdminConfig controller
  mongoAdminConfigMcpRouter.push(require("./update-mongoadminconfig")(headers));
  // deleteMongoAdminConfig controller
  mongoAdminConfigMcpRouter.push(require("./delete-mongoadminconfig")(headers));
  // listMongoAdminConfigs controller
  mongoAdminConfigMcpRouter.push(require("./list-mongoadminconfigs")(headers));
  return mongoAdminConfigMcpRouter;
};

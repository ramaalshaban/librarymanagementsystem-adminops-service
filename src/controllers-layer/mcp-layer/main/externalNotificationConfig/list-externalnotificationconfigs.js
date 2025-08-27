const { ListExternalNotificationConfigsManager } = require("managers");
const { z } = require("zod");

const AdminOpsMcpController = require("../../AdminOpsServiceMcpController");

class ListExternalNotificationConfigsMcpController extends AdminOpsMcpController {
  constructor(params) {
    super(
      "listExternalNotificationConfigs",
      "listexternalnotificationconfigs",
      params,
    );
    this.dataName = "externalNotificationConfigs";
    this.crudType = "getList";
  }

  createApiManager() {
    return new ListExternalNotificationConfigsManager(this.request, "mcp");
  }

  static getOutputSchema() {
    return z
      .object({
        status: z.string(),
        externalNotificationConfigs: z
          .object({
            id: z
              .string()
              .uuid()
              .describe("The unique primary key of the data object as UUID"),
            providerType: z
              .enum(["email", "sms", "push", "webhook", "other"])
              .describe(
                "Type of notification/publishing provider: 0=email, 1=SMS, 2=push, 3=webhook, 4=other",
              ),
            name: z
              .string()
              .max(255)
              .describe("Friendly display name for this config/connection."),
            settings: z
              .object()
              .describe(
                "Connection and credential object for this notification method: host, keyId, secret, endpoint, params, per provider.",
              ),
            status: z
              .enum(["enabled", "disabled", "pendingVerification", "error"])
              .describe(
                "Connection/config status: 0=enabled, 1=disabled, 2=pendingVerification, 3=error",
              ),
            isActive: z
              .boolean()
              .describe(
                "The active status of the data object to manage soft delete. False when deleted.",
              ),
          })
          .describe(
            "Connection/config object for external notification or publishing service integration (e.g. email, SMS, push, webhook, etc). Contains host, secrets, settings per method.",
          )
          .array(),
      })
      .describe("The response object of the crud route");
  }

  static getInputScheme() {
    return {
      accessToken: z
        .string()
        .optional()
        .describe(
          "The access token which is returned from a login request or given by user. This access token will override if there is any bearer or OAuth token in the mcp client. If not given the request will be made with the system (bearer or OAuth) token. For public routes you dont need to deifne any access token.",
        ),
    };
  }
}

module.exports = (headers) => {
  return {
    name: "listExternalNotificationConfigs",
    description:
      "List notification/publishing connections (filter by provider/type/status).",
    parameters: ListExternalNotificationConfigsMcpController.getInputScheme(),
    controller: async (mcpParams) => {
      mcpParams.headers = headers;
      const listExternalNotificationConfigsMcpController =
        new ListExternalNotificationConfigsMcpController(mcpParams);
      try {
        const result =
          await listExternalNotificationConfigsMcpController.processRequest();
        //return ListExternalNotificationConfigsMcpController.getOutputSchema().parse(result);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result),
            },
          ],
        };
      } catch (err) {
        return {
          isError: true,
          content: [
            {
              type: "text",
              text: `Error: ${err.message}`,
            },
          ],
        };
      }
    },
  };
};

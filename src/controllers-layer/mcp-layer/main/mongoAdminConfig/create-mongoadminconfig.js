const { CreateMongoAdminConfigManager } = require("managers");
const { z } = require("zod");

const AdminOpsMcpController = require("../../AdminOpsServiceMcpController");

class CreateMongoAdminConfigMcpController extends AdminOpsMcpController {
  constructor(params) {
    super("createMongoAdminConfig", "createmongoadminconfig", params);
    this.dataName = "mongoAdminConfig";
    this.crudType = "create";
  }

  createApiManager() {
    return new CreateMongoAdminConfigManager(this.request, "mcp");
  }

  static getOutputSchema() {
    return z
      .object({
        status: z.string(),
        mongoAdminConfig: z
          .object({
            id: z
              .string()
              .uuid()
              .describe("The unique primary key of the data object as UUID"),
            configType: z
              .enum([
                "index",
                "aggregation",
                "transaction",
                "replication",
                "archive",
                "other",
              ])
              .describe(
                "Type of MongoDB config: 0=index, 1=aggregation, 2=transaction, 3=replication, 4=archive, 5=other",
              ),
            targetObject: z
              .string()
              .max(255)
              .describe(
                "The data object or collection being configured (e.g., book, loan, review, branch, all, etc).",
              ),
            configDetails: z
              .object()
              .describe(
                "Flexible admin-supplied object describing config schema (JSON definition for index, aggregation, transaction, etc).",
              ),
            status: z
              .enum(["active", "inactive", "archived", "scheduled", "error"])
              .describe(
                "Config status: 0=active, 1=inactive, 2=archived, 3=scheduled, 4=error",
              ),
            isActive: z
              .boolean()
              .describe(
                "The active status of the data object to manage soft delete. False when deleted.",
              ),
          })
          .describe(
            "Represents advanced MongoDB configuration for admin (index settings, transaction rules, aggregation pipeline definitions, etc). Used for diagnostic and admin UX only.",
          ),
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
      configType: z
        .enum([])
        .describe(
          "Type of MongoDB config: 0=index, 1=aggregation, 2=transaction, 3=replication, 4=archive, 5=other",
        ),

      targetObject: z
        .string()
        .max(255)
        .describe(
          "The data object or collection being configured (e.g., book, loan, review, branch, all, etc).",
        ),

      configDetails: z
        .object({})
        .describe(
          "Flexible admin-supplied object describing config schema (JSON definition for index, aggregation, transaction, etc).",
        ),

      status: z
        .enum([])
        .describe(
          "Config status: 0=active, 1=inactive, 2=archived, 3=scheduled, 4=error",
        ),
    };
  }
}

module.exports = (headers) => {
  return {
    name: "createMongoAdminConfig",
    description:
      "Create new advanced MongoDB admin config or diagnostic setting.",
    parameters: CreateMongoAdminConfigMcpController.getInputScheme(),
    controller: async (mcpParams) => {
      mcpParams.headers = headers;
      const createMongoAdminConfigMcpController =
        new CreateMongoAdminConfigMcpController(mcpParams);
      try {
        const result =
          await createMongoAdminConfigMcpController.processRequest();
        //return CreateMongoAdminConfigMcpController.getOutputSchema().parse(result);
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

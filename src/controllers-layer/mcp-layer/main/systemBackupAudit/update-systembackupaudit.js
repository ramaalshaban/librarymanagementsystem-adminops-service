const { UpdateSystemBackupAuditManager } = require("managers");
const { z } = require("zod");

const AdminOpsMcpController = require("../../AdminOpsServiceMcpController");

class UpdateSystemBackupAuditMcpController extends AdminOpsMcpController {
  constructor(params) {
    super("updateSystemBackupAudit", "updatesystembackupaudit", params);
    this.dataName = "systemBackupAudit";
    this.crudType = "update";
  }

  createApiManager() {
    return new UpdateSystemBackupAuditManager(this.request, "mcp");
  }

  static getOutputSchema() {
    return z
      .object({
        status: z.string(),
        systemBackupAudit: z
          .object({
            id: z
              .string()
              .uuid()
              .describe("The unique primary key of the data object as UUID"),
            type: z
              .enum(["backup", "restore", "validate", "purge", "other"])
              .describe(
                "Type of backup job: 0=backup, 1=restore, 2=validate, 3=purge, 4=other",
              ),
            config: z
              .object()
              .describe(
                "Backup/restore config/settings: storage location, incremental/full, compression, etc.",
              ),
            initiatedByUserId: z
              .string()
              .uuid()
              .describe("Admin user who initiated the backup/restore job."),
            status: z
              .enum(["started", "success", "error", "partial", "aborted"])
              .describe(
                "Job status: 0=started, 1=success, 2=error, 3=partial, 4=aborted",
              ),
            resultDetails: z
              .object()
              .optional()
              .nullable()
              .describe(
                "Flexible result/log object: summary, run time, files, affected objects, error/warning info, logs.",
              ),
            isActive: z
              .boolean()
              .describe(
                "The active status of the data object to manage soft delete. False when deleted.",
              ),
          })
          .describe(
            "Tracks system backup and restore jobs/operations for audit and compliance (initiated by admin). Stores config, timing, initiator/results.",
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
      systemBackupAuditId: z
        .string()
        .uuid()
        .describe(
          "This id paremeter is used to select the required data object that will be updated",
        ),

      type: z
        .enum([])
        .describe(
          "Type of backup job: 0=backup, 1=restore, 2=validate, 3=purge, 4=other",
        ),

      config: z
        .object({})
        .optional()
        .describe(
          "Backup/restore config/settings: storage location, incremental/full, compression, etc.",
        ),

      status: z
        .enum([])
        .describe(
          "Job status: 0=started, 1=success, 2=error, 3=partial, 4=aborted",
        ),

      resultDetails: z
        .object({})
        .optional()
        .describe(
          "Flexible result/log object: summary, run time, files, affected objects, error/warning info, logs.",
        ),
    };
  }
}

module.exports = (headers) => {
  return {
    name: "updateSystemBackupAudit",
    description: "Update status/result for audit backup/restore job.",
    parameters: UpdateSystemBackupAuditMcpController.getInputScheme(),
    controller: async (mcpParams) => {
      mcpParams.headers = headers;
      const updateSystemBackupAuditMcpController =
        new UpdateSystemBackupAuditMcpController(mcpParams);
      try {
        const result =
          await updateSystemBackupAuditMcpController.processRequest();
        //return UpdateSystemBackupAuditMcpController.getOutputSchema().parse(result);
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

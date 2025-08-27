const { CreateIssueEscalationManager } = require("managers");
const { z } = require("zod");

const AdminOpsMcpController = require("../../AdminOpsServiceMcpController");

class CreateIssueEscalationMcpController extends AdminOpsMcpController {
  constructor(params) {
    super("createIssueEscalation", "createissueescalation", params);
    this.dataName = "issueEscalation";
    this.crudType = "create";
  }

  createApiManager() {
    return new CreateIssueEscalationManager(this.request, "mcp");
  }

  static getOutputSchema() {
    return z
      .object({
        status: z.string(),
        issueEscalation: z
          .object({
            id: z
              .string()
              .uuid()
              .describe("The unique primary key of the data object as UUID"),
            branchId: z
              .string()
              .uuid()
              .describe(
                "Branch related to issue; for escalation routing and reporting.",
              ),
            raisedByUserId: z
              .string()
              .uuid()
              .describe("User/member/staff who raised the issue."),
            assignedToUserId: z
              .string()
              .uuid()
              .optional()
              .nullable()
              .describe(
                "User assigned to handle the escalation/issue (e.g., branch manager/staff/other admin).",
              ),
            status: z
              .enum([
                "open",
                "assigned",
                "inProgress",
                "resolved",
                "closed",
                "canceled",
              ])
              .describe(
                "Escalation status: 0=open, 1=assigned, 2=inProgress, 3=resolved, 4=closed, 5=canceled",
              ),
            escalationType: z
              .enum([
                "service",
                "memberComplaint",
                "facility",
                "system",
                "other",
              ])
              .describe(
                "Type of issue: 0=service, 1=memberComplaint, 2=facility, 3=system, 4=other",
              ),
            description: z
              .string()
              .describe("Issue/escalation description/details."),
            log: z.array(
              z
                .object()
                .optional()
                .nullable()
                .describe(
                  "Chronological event log (assignments, status updates, notes) for escalation. Format: [{timestamp, userId, action, note}].",
                ),
            ),
            isActive: z
              .boolean()
              .describe(
                "The active status of the data object to manage soft delete. False when deleted.",
              ),
          })
          .describe(
            "Logs and manages member or staff issues escalated for resolution at the branch/administrative level. Tracks status, assignment(s), escalation reason, actions, and involved parties.",
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
      branchId: z
        .string()
        .uuid()
        .describe(
          "Branch related to issue; for escalation routing and reporting.",
        ),

      assignedToUserId: z
        .string()
        .uuid()
        .optional()
        .describe(
          "User assigned to handle the escalation/issue (e.g., branch manager/staff/other admin).",
        ),

      status: z
        .enum([])
        .describe(
          "Escalation status: 0=open, 1=assigned, 2=inProgress, 3=resolved, 4=closed, 5=canceled",
        ),

      escalationType: z
        .enum([])
        .describe(
          "Type of issue: 0=service, 1=memberComplaint, 2=facility, 3=system, 4=other",
        ),

      description: z.string().describe("Issue/escalation description/details."),

      log: z
        .object({})
        .optional()
        .describe(
          "Chronological event log (assignments, status updates, notes) for escalation. Format: [{timestamp, userId, action, note}].",
        ),
    };
  }
}

module.exports = (headers) => {
  return {
    name: "createIssueEscalation",
    description:
      "Create a branch/member/staff issue escalation record; begins the resolution process.",
    parameters: CreateIssueEscalationMcpController.getInputScheme(),
    controller: async (mcpParams) => {
      mcpParams.headers = headers;
      const createIssueEscalationMcpController =
        new CreateIssueEscalationMcpController(mcpParams);
      try {
        const result =
          await createIssueEscalationMcpController.processRequest();
        //return CreateIssueEscalationMcpController.getOutputSchema().parse(result);
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

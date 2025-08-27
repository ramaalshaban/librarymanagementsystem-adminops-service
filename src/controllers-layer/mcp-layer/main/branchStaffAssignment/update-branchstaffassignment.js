const { UpdateBranchStaffAssignmentManager } = require("managers");
const { z } = require("zod");

const AdminOpsMcpController = require("../../AdminOpsServiceMcpController");

class UpdateBranchStaffAssignmentMcpController extends AdminOpsMcpController {
  constructor(params) {
    super("updateBranchStaffAssignment", "updatebranchstaffassignment", params);
    this.dataName = "branchStaffAssignment";
    this.crudType = "update";
  }

  createApiManager() {
    return new UpdateBranchStaffAssignmentManager(this.request, "mcp");
  }

  static getOutputSchema() {
    return z
      .object({
        status: z.string(),
        branchStaffAssignment: z
          .object({
            id: z
              .string()
              .uuid()
              .describe("The unique primary key of the data object as UUID"),
            branchId: z
              .string()
              .uuid()
              .describe("Branch the staff/librarian is assigned to."),
            userId: z
              .string()
              .uuid()
              .describe(
                "User assigned as staff/librarian; links to user object.",
              ),
            role: z
              .enum(["librarian", "manager", "assistant", "regionalAdmin"])
              .describe(
                "Role of staff at branch: 0=librarian, 1=manager, 2=assistant, 3=regionalAdmin (for advanced permission control)",
              ),
            assignedByUserId: z
              .string()
              .uuid()
              .describe(
                "User who created/assigned this staff record (typically branch manager)",
              ),
            isActive: z
              .boolean()
              .describe(
                "The active status of the data object to manage soft delete. False when deleted.",
              ),
          })
          .describe(
            "Links a staff/librarian user to a branch, capturing assignment history, staff role, active status, and branch-level permissions. Enables branch manager to add, update, or remove staff from a branch/team.",
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
      branchStaffAssignmentId: z
        .string()
        .uuid()
        .describe(
          "This id paremeter is used to select the required data object that will be updated",
        ),

      branchId: z
        .string()
        .uuid()
        .optional()
        .describe("Branch the staff/librarian is assigned to."),

      userId: z
        .string()
        .uuid()
        .optional()
        .describe("User assigned as staff/librarian; links to user object."),

      role: z
        .enum([])
        .describe(
          "Role of staff at branch: 0=librarian, 1=manager, 2=assistant, 3=regionalAdmin (for advanced permission control)",
        ),
    };
  }
}

module.exports = (headers) => {
  return {
    name: "updateBranchStaffAssignment",
    description: "Update staff assignment/role at branch.",
    parameters: UpdateBranchStaffAssignmentMcpController.getInputScheme(),
    controller: async (mcpParams) => {
      mcpParams.headers = headers;
      const updateBranchStaffAssignmentMcpController =
        new UpdateBranchStaffAssignmentMcpController(mcpParams);
      try {
        const result =
          await updateBranchStaffAssignmentMcpController.processRequest();
        //return UpdateBranchStaffAssignmentMcpController.getOutputSchema().parse(result);
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

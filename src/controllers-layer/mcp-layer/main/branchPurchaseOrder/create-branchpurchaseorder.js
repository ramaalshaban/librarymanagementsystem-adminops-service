const { CreateBranchPurchaseOrderManager } = require("managers");
const { z } = require("zod");

const AdminOpsMcpController = require("../../AdminOpsServiceMcpController");

class CreateBranchPurchaseOrderMcpController extends AdminOpsMcpController {
  constructor(params) {
    super("createBranchPurchaseOrder", "createbranchpurchaseorder", params);
    this.dataName = "branchPurchaseOrder";
    this.crudType = "create";
  }

  createApiManager() {
    return new CreateBranchPurchaseOrderManager(this.request, "mcp");
  }

  static getOutputSchema() {
    return z
      .object({
        status: z.string(),
        branchPurchaseOrder: z
          .object({
            id: z
              .string()
              .uuid()
              .describe("The unique primary key of the data object as UUID"),
            branchId: z
              .string()
              .uuid()
              .describe("Branch making the acquisition request."),
            requestedByUserId: z
              .string()
              .uuid()
              .describe(
                "User (librarian/manager) who requested this purchase order.",
              ),
            items: z.array(
              z
                .object()
                .describe(
                  "List of items/books to be procured: [{bookId, quantity, note}].",
                ),
            ),
            status: z
              .enum([
                "pending",
                "approved",
                "rejected",
                "inProgress",
                "fulfilled",
                "canceled",
              ])
              .describe(
                "Purchase order status: 0=pending, 1=approved, 2=rejected, 3=inProgress, 4=fulfilled, 5=canceled",
              ),
            approvedByUserId: z
              .string()
              .uuid()
              .optional()
              .nullable()
              .describe("Branch manager who approved or rejected order."),
            approvalDate: z
              .string()
              .optional()
              .nullable()
              .describe("Date/time of approval or rejection."),
            note: z
              .string()
              .optional()
              .nullable()
              .describe(
                "Optional note/justification for order, or approval decision.",
              ),
            isActive: z
              .boolean()
              .describe(
                "The active status of the data object to manage soft delete. False when deleted.",
              ),
          })
          .describe(
            "Represents a library branch's proposed acquisition (purchase order) for new books/materials; supports manager approval workflow and procurement status.",
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
        .describe("Branch making the acquisition request."),

      items: z
        .object({})
        .describe(
          "List of items/books to be procured: [{bookId, quantity, note}].",
        ),

      status: z
        .enum([])
        .describe(
          "Purchase order status: 0=pending, 1=approved, 2=rejected, 3=inProgress, 4=fulfilled, 5=canceled",
        ),

      approvedByUserId: z
        .string()
        .uuid()
        .optional()
        .describe("Branch manager who approved or rejected order."),

      approvalDate: z
        .string()
        .optional()
        .describe("Date/time of approval or rejection."),

      note: z
        .string()
        .optional()
        .describe(
          "Optional note/justification for order, or approval decision.",
        ),
    };
  }
}

module.exports = (headers) => {
  return {
    name: "createBranchPurchaseOrder",
    description:
      "Create a branch&#39;s requested purchase order for acquisition/procurement approval.",
    parameters: CreateBranchPurchaseOrderMcpController.getInputScheme(),
    controller: async (mcpParams) => {
      mcpParams.headers = headers;
      const createBranchPurchaseOrderMcpController =
        new CreateBranchPurchaseOrderMcpController(mcpParams);
      try {
        const result =
          await createBranchPurchaseOrderMcpController.processRequest();
        //return CreateBranchPurchaseOrderMcpController.getOutputSchema().parse(result);
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

const { inject } = require("mindbricks-api-face");

module.exports = (app) => {
  const authUrl = (process.env.SERVICE_URL ?? "mindbricks.com").replace(
    process.env.SERVICE_SHORT_NAME,
    "auth",
  );

  const config = {
    name: "librarymanagementsystem - adminOps",
    brand: {
      name: "librarymanagementsystem",
      image: "https://mindbricks.com/favicon.ico",
      moduleName: "adminOps",
      version: process.env.SERVICE_VERSION || "1.0.0",
    },
    auth: {
      url: authUrl,
      loginPath: "/login",
      logoutPath: "/logout",
      currentUserPath: "/currentuser",
      authStrategy: "external",
      initialAuth: true,
    },
    dataObjects: [
      {
        name: "BranchStaffAssignment",
        description:
          "Links a staff/librarian user to a branch, capturing assignment history, staff role, active status, and branch-level permissions. Enables branch manager to add, update, or remove staff from a branch/team.",
        reference: {
          tableName: "branchStaffAssignment",
          properties: [
            {
              name: "branchId",
              type: "ID",
            },

            {
              name: "userId",
              type: "ID",
            },

            {
              name: "role",
              type: "Enum",
            },

            {
              name: "assignedByUserId",
              type: "ID",
            },
          ],
        },
        endpoints: [
          {
            isAuth: true,
            method: "GET",
            url: "/branchstaffassignments/{branchStaffAssignmentId}",
            title: "getBranchStaffAssignment",
            query: [],

            parameters: [
              {
                key: "branchStaffAssignmentId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "POST",
            url: "/branchstaffassignments",
            title: "createBranchStaffAssignment",
            query: [],

            body: {
              type: "json",
              content: {
                branchId: "ID",
                userId: "ID",
                role: "Enum",
              },
            },

            parameters: [],
            headers: [],
          },

          {
            isAuth: true,
            method: "PATCH",
            url: "/branchstaffassignments/{branchStaffAssignmentId}",
            title: "updateBranchStaffAssignment",
            query: [],

            body: {
              type: "json",
              content: {
                branchId: "ID",
                userId: "ID",
                role: "Enum",
              },
            },

            parameters: [
              {
                key: "branchStaffAssignmentId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "DELETE",
            url: "/branchstaffassignments/{branchStaffAssignmentId}",
            title: "deleteBranchStaffAssignment",
            query: [],

            body: {
              type: "json",
              content: {},
            },

            parameters: [
              {
                key: "branchStaffAssignmentId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "GET",
            url: "/branchstaffassignments",
            title: "listBranchStaffAssignments",
            query: [],

            parameters: [],
            headers: [],
          },
        ],
      },

      {
        name: "IssueEscalation",
        description:
          "Logs and manages member or staff issues escalated for resolution at the branch/administrative level. Tracks status, assignment(s), escalation reason, actions, and involved parties.",
        reference: {
          tableName: "issueEscalation",
          properties: [
            {
              name: "branchId",
              type: "ID",
            },

            {
              name: "raisedByUserId",
              type: "ID",
            },

            {
              name: "assignedToUserId",
              type: "ID",
            },

            {
              name: "status",
              type: "Enum",
            },

            {
              name: "escalationType",
              type: "Enum",
            },

            {
              name: "description",
              type: "Text",
            },

            {
              name: "log",
              type: "[Object]",
            },
          ],
        },
        endpoints: [
          {
            isAuth: true,
            method: "GET",
            url: "/issueescalations/{issueEscalationId}",
            title: "getIssueEscalation",
            query: [],

            parameters: [
              {
                key: "issueEscalationId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "POST",
            url: "/issueescalations",
            title: "createIssueEscalation",
            query: [],

            body: {
              type: "json",
              content: {
                branchId: "ID",
                assignedToUserId: "ID",
                status: "Enum",
                escalationType: "Enum",
                description: "Text",
                log: "Object",
              },
            },

            parameters: [],
            headers: [],
          },

          {
            isAuth: true,
            method: "PATCH",
            url: "/issueescalations/{issueEscalationId}",
            title: "updateIssueEscalation",
            query: [],

            body: {
              type: "json",
              content: {
                branchId: "ID",
                assignedToUserId: "ID",
                status: "Enum",
                escalationType: "Enum",
                description: "Text",
                log: "Object",
              },
            },

            parameters: [
              {
                key: "issueEscalationId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "DELETE",
            url: "/issueescalations/{issueEscalationId}",
            title: "deleteIssueEscalation",
            query: [],

            body: {
              type: "json",
              content: {},
            },

            parameters: [
              {
                key: "issueEscalationId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "GET",
            url: "/issueescalations",
            title: "listIssueEscalations",
            query: [],

            parameters: [],
            headers: [],
          },
        ],
      },

      {
        name: "MongoAdminConfig",
        description:
          "Represents advanced MongoDB configuration for admin (index settings, transaction rules, aggregation pipeline definitions, etc). Used for diagnostic and admin UX only.",
        reference: {
          tableName: "mongoAdminConfig",
          properties: [
            {
              name: "configType",
              type: "Enum",
            },

            {
              name: "targetObject",
              type: "String",
            },

            {
              name: "configDetails",
              type: "Object",
            },

            {
              name: "status",
              type: "Enum",
            },
          ],
        },
        endpoints: [
          {
            isAuth: true,
            method: "GET",
            url: "/mongoadminconfigs/{mongoAdminConfigId}",
            title: "getMongoAdminConfig",
            query: [],

            parameters: [
              {
                key: "mongoAdminConfigId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "POST",
            url: "/mongoadminconfigs",
            title: "createMongoAdminConfig",
            query: [],

            body: {
              type: "json",
              content: {
                configType: "Enum",
                targetObject: "String",
                configDetails: "Object",
                status: "Enum",
              },
            },

            parameters: [],
            headers: [],
          },

          {
            isAuth: true,
            method: "PATCH",
            url: "/mongoadminconfigs/{mongoAdminConfigId}",
            title: "updateMongoAdminConfig",
            query: [],

            body: {
              type: "json",
              content: {
                configType: "Enum",
                targetObject: "String",
                configDetails: "Object",
                status: "Enum",
              },
            },

            parameters: [
              {
                key: "mongoAdminConfigId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "DELETE",
            url: "/mongoadminconfigs/{mongoAdminConfigId}",
            title: "deleteMongoAdminConfig",
            query: [],

            body: {
              type: "json",
              content: {},
            },

            parameters: [
              {
                key: "mongoAdminConfigId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "GET",
            url: "/mongoadminconfigs",
            title: "listMongoAdminConfigs",
            query: [],

            parameters: [],
            headers: [],
          },
        ],
      },

      {
        name: "ExternalNotificationConfig",
        description:
          "Connection/config object for external notification or publishing service integration (e.g. email, SMS, push, webhook, etc). Contains host, secrets, settings per method.",
        reference: {
          tableName: "externalNotificationConfig",
          properties: [
            {
              name: "providerType",
              type: "Enum",
            },

            {
              name: "name",
              type: "String",
            },

            {
              name: "settings",
              type: "Object",
            },

            {
              name: "status",
              type: "Enum",
            },
          ],
        },
        endpoints: [
          {
            isAuth: true,
            method: "GET",
            url: "/externalnotificationconfigs/{externalNotificationConfigId}",
            title: "getExternalNotificationConfig",
            query: [],

            parameters: [
              {
                key: "externalNotificationConfigId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "POST",
            url: "/externalnotificationconfigs",
            title: "createExternalNotificationConfig",
            query: [],

            body: {
              type: "json",
              content: {
                providerType: "Enum",
                name: "String",
                settings: "Object",
                status: "Enum",
              },
            },

            parameters: [],
            headers: [],
          },

          {
            isAuth: true,
            method: "PATCH",
            url: "/externalnotificationconfigs/{externalNotificationConfigId}",
            title: "updateExternalNotificationConfig",
            query: [],

            body: {
              type: "json",
              content: {
                providerType: "Enum",
                name: "String",
                settings: "Object",
                status: "Enum",
              },
            },

            parameters: [
              {
                key: "externalNotificationConfigId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "DELETE",
            url: "/externalnotificationconfigs/{externalNotificationConfigId}",
            title: "deleteExternalNotificationConfig",
            query: [],

            body: {
              type: "json",
              content: {},
            },

            parameters: [
              {
                key: "externalNotificationConfigId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "GET",
            url: "/externalnotificationconfigs",
            title: "listExternalNotificationConfigs",
            query: [],

            parameters: [],
            headers: [],
          },
        ],
      },

      {
        name: "SystemBackupAudit",
        description:
          "Tracks system backup and restore jobs/operations for audit and compliance (initiated by admin). Stores config, timing, initiator/results.",
        reference: {
          tableName: "systemBackupAudit",
          properties: [
            {
              name: "type",
              type: "Enum",
            },

            {
              name: "config",
              type: "Object",
            },

            {
              name: "initiatedByUserId",
              type: "ID",
            },

            {
              name: "status",
              type: "Enum",
            },

            {
              name: "resultDetails",
              type: "Object",
            },
          ],
        },
        endpoints: [
          {
            isAuth: true,
            method: "GET",
            url: "/systembackupaudits/{systemBackupAuditId}",
            title: "getSystemBackupAudit",
            query: [],

            parameters: [
              {
                key: "systemBackupAuditId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "POST",
            url: "/systembackupaudits",
            title: "createSystemBackupAudit",
            query: [],

            body: {
              type: "json",
              content: {
                type: "Enum",
                config: "Object",
                status: "Enum",
                resultDetails: "Object",
              },
            },

            parameters: [],
            headers: [],
          },

          {
            isAuth: true,
            method: "PATCH",
            url: "/systembackupaudits/{systemBackupAuditId}",
            title: "updateSystemBackupAudit",
            query: [],

            body: {
              type: "json",
              content: {
                type: "Enum",
                config: "Object",
                status: "Enum",
                resultDetails: "Object",
              },
            },

            parameters: [
              {
                key: "systemBackupAuditId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "DELETE",
            url: "/systembackupaudits/{systemBackupAuditId}",
            title: "deleteSystemBackupAudit",
            query: [],

            body: {
              type: "json",
              content: {},
            },

            parameters: [
              {
                key: "systemBackupAuditId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "GET",
            url: "/systembackupaudits",
            title: "listSystemBackupAudits",
            query: [],

            parameters: [],
            headers: [],
          },
        ],
      },

      {
        name: "BranchPurchaseOrder",
        description:
          "Represents a library branch&#39;s proposed acquisition (purchase order) for new books/materials; supports manager approval workflow and procurement status.",
        reference: {
          tableName: "branchPurchaseOrder",
          properties: [
            {
              name: "branchId",
              type: "ID",
            },

            {
              name: "requestedByUserId",
              type: "ID",
            },

            {
              name: "items",
              type: "[Object]",
            },

            {
              name: "status",
              type: "Enum",
            },

            {
              name: "approvedByUserId",
              type: "ID",
            },

            {
              name: "approvalDate",
              type: "Date",
            },

            {
              name: "note",
              type: "Text",
            },
          ],
        },
        endpoints: [
          {
            isAuth: true,
            method: "GET",
            url: "/branchpurchaseorders/{branchPurchaseOrderId}",
            title: "getBranchPurchaseOrder",
            query: [],

            parameters: [
              {
                key: "branchPurchaseOrderId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "POST",
            url: "/branchpurchaseorders",
            title: "createBranchPurchaseOrder",
            query: [],

            body: {
              type: "json",
              content: {
                branchId: "ID",
                items: "Object",
                status: "Enum",
                approvedByUserId: "ID",
                approvalDate: "Date",
                note: "Text",
              },
            },

            parameters: [],
            headers: [],
          },

          {
            isAuth: true,
            method: "PATCH",
            url: "/branchpurchaseorders/{branchPurchaseOrderId}",
            title: "updateBranchPurchaseOrder",
            query: [],

            body: {
              type: "json",
              content: {
                items: "Object",
                status: "Enum",
                approvedByUserId: "ID",
                approvalDate: "Date",
                note: "Text",
              },
            },

            parameters: [
              {
                key: "branchPurchaseOrderId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "DELETE",
            url: "/branchpurchaseorders/{branchPurchaseOrderId}",
            title: "deleteBranchPurchaseOrder",
            query: [],

            body: {
              type: "json",
              content: {},
            },

            parameters: [
              {
                key: "branchPurchaseOrderId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "GET",
            url: "/branchpurchaseorders",
            title: "listBranchPurchaseOrders",
            query: [],

            parameters: [],
            headers: [],
          },
        ],
      },

      {
        name: "Tregt",
        description: "treter",
        reference: {
          tableName: "tregt",
          properties: [],
        },
        endpoints: [],
      },

      {
        name: "AdminOpsShareToken",
        description:
          "A data object that stores the share tokens for tokenized access to shared objects.",
        reference: {
          tableName: "adminOpsShareToken",
          properties: [
            {
              name: "configName",
              type: "String",
            },

            {
              name: "objectName",
              type: "String",
            },

            {
              name: "objectId",
              type: "ID",
            },

            {
              name: "ownerId",
              type: "ID",
            },

            {
              name: "peopleOption",
              type: "String",
            },

            {
              name: "tokenPermissions",
              type: "",
            },

            {
              name: "allowedEmails",
              type: "",
            },

            {
              name: "expireDate",
              type: "Date",
            },
          ],
        },
        endpoints: [],
      },
    ],
  };

  inject(app, config);
};

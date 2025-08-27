# REST API GUIDE

## librarymanagementsystem-adminops-service

Handles operational and administrative workflows for library staff and administrators, including branch staff account management, issue escalation/resolution, advanced MongoDB configuration, external notification platform integration settings, system backup/restore/disaster recovery audit, and procurement/acquisition approval for library branches.

## Architectural Design Credit and Contact Information

The architectural design of this microservice is credited to .
For inquiries, feedback, or further information regarding the architecture, please direct your communication to:

Email:

We encourage open communication and welcome any questions or discussions related to the architectural aspects of this microservice.

## Documentation Scope

Welcome to the official documentation for the AdminOps Service's REST API. This document is designed to provide a comprehensive guide to interfacing with our AdminOps Service exclusively through RESTful API endpoints.

**Intended Audience**

This documentation is intended for developers and integrators who are looking to interact with the AdminOps Service via HTTP requests for purposes such as creating, updating, deleting and querying AdminOps objects.

**Overview**

Within these pages, you will find detailed information on how to effectively utilize the REST API, including authentication methods, request and response formats, endpoint descriptions, and examples of common use cases.

Beyond REST
It's important to note that the AdminOps Service also supports alternative methods of interaction, such as gRPC and messaging via a Message Broker. These communication methods are beyond the scope of this document. For information regarding these protocols, please refer to their respective documentation.

## Authentication And Authorization

To ensure secure access to the AdminOps service's protected endpoints, a project-wide access token is required. This token serves as the primary method for authenticating requests to our service. However, it's important to note that access control varies across different routes:

**Protected Routes**:
Certain routes require specific authorization levels. Access to these routes is contingent upon the possession of a valid access token that meets the route-specific authorization criteria. Unauthorized requests to these routes will be rejected.

**Public Routes**:
The service also includes routes that are accessible without authentication. These public endpoints are designed for open access and do not require an access token.

### Token Locations

When including your access token in a request, ensure it is placed in one of the following specified locations. The service will sequentially search these locations for the token, utilizing the first one it encounters.

| Location             | Token Name / Param Name              |
| -------------------- | ------------------------------------ |
| Query                | access_token                         |
| Authorization Header | Bearer                               |
| Header               | librarymanagementsystem-access-token |
| Cookie               | librarymanagementsystem-access-token |

Please ensure the token is correctly placed in one of these locations, using the appropriate label as indicated. The service prioritizes these locations in the order listed, processing the first token it successfully identifies.

## Api Definitions

This section outlines the API endpoints available within the AdminOps service. Each endpoint can receive parameters through various methods, meticulously described in the following definitions. It's important to understand the flexibility in how parameters can be included in requests to effectively interact with the AdminOps service.

This service is configured to listen for HTTP requests on port `3004`,
serving both the main API interface and default administrative endpoints.

The following routes are available by default:

- **API Test Interface (API Face):** `/`
- **Swagger Documentation:** `/swagger`
- **Postman Collection Download:** `/getPostmanCollection`
- **Health Checks:** `/health` and `/admin/health`
- **Current Session Info:** `/currentuser`
- **Favicon:** `/favicon.ico`

This service is accessible via the following environment-specific URLs:

- **Preview:** `https://adminOps-api.librarymanagementsystem.prw.mindbricks.com`
- **Staging:** `https://adminOps-api.librarymanagementsystem.staging.mindbricks.com`
- **Production:** `https://adminOps-api.librarymanagementsystem.prod.mindbricks.com`

**Parameter Inclusion Methods:**
Parameters can be incorporated into API requests in several ways, each with its designated location. Understanding these methods is crucial for correctly constructing your requests:

**Query Parameters:** Included directly in the URL's query string.

**Path Parameters:** Embedded within the URL's path.

**Body Parameters:** Sent within the JSON body of the request.

**Session Parameters:** Automatically read from the session object. This method is used for parameters that are intrinsic to the user's session, such as userId. When using an API that involves session parameters, you can omit these from your request. The service will automatically bind them to the route, provided that a session is associated with your request.

**Note on Session Parameters:**
Session parameters represent a unique method of parameter inclusion, relying on the context of the user's session. A common example of a session parameter is userId, which the service automatically associates with your request when a session exists. This feature ensures seamless integration of user-specific data without manual input for each request.

By adhering to the specified parameter inclusion methods, you can effectively utilize the AdminOps service's API endpoints. For detailed information on each endpoint, including required parameters and their accepted locations, refer to the individual API definitions below.

### Common Parameters

The `AdminOps` service's routes support several common parameters designed to modify and enhance the behavior of API requests. These parameters are not individually listed in the API route definitions to avoid repetition. Instead, refer to this section to understand how to leverage these common behaviors across different routes. Note that all common parameters should be included in the query part of the URL.

### Supported Common Parameters:

- **getJoins (BOOLEAN)**: Controls whether to retrieve associated objects along with the main object. By default, `getJoins` is assumed to be `true`. Set it to `false` if you prefer to receive only the main fields of an object, excluding its associations.

- **excludeCQRS (BOOLEAN)**: Applicable only when `getJoins` is `true`. By default, `excludeCQRS` is set to `false`. Enabling this parameter (`true`) omits non-local associations, which are typically more resource-intensive as they require querying external services like ElasticSearch for additional information. Use this to optimize response times and resource usage.

- **requestId (String)**: Identifies a request to enable tracking through the service's log chain. A random hex string of 32 characters is assigned by default. If you wish to use a custom `requestId`, simply include it in your query parameters.

- **caching (BOOLEAN)**: Determines the use of caching for query routes. By default, caching is enabled (`true`). To ensure the freshest data directly from the database, set this parameter to `false`, bypassing the cache.

- **cacheTTL (Integer)**: Specifies the Time-To-Live (TTL) for query caching, in seconds. This is particularly useful for adjusting the default caching duration (5 minutes) for `get list` queries. Setting a custom `cacheTTL` allows you to fine-tune the cache lifespan to meet your needs.

- **pageNumber (Integer)**: For paginated `get list` routes, this parameter selects which page of results to retrieve. The default is `1`, indicating the first page. To disable pagination and retrieve all results, set `pageNumber` to `0`.

- **pageRowCount (Integer)**: In conjunction with paginated routes, this parameter defines the number of records per page. The default value is `25`. Adjusting `pageRowCount` allows you to control the volume of data returned in a single request.

By utilizing these common parameters, you can tailor the behavior of API requests to suit your specific requirements, ensuring optimal performance and usability of the `AdminOps` service.

### Error Response

If a request encounters an issue, whether due to a logical fault or a technical problem, the service responds with a standardized JSON error structure. The HTTP status code within this response indicates the nature of the error, utilizing commonly recognized codes for clarity:

- **400 Bad Request**: The request was improperly formatted or contained invalid parameters, preventing the server from processing it.
- **401 Unauthorized**: The request lacked valid authentication credentials or the credentials provided do not grant access to the requested resource.
- **404 Not Found**: The requested resource was not found on the server.
- **500 Internal Server Error**: The server encountered an unexpected condition that prevented it from fulfilling the request.

Each error response is structured to provide meaningful insight into the problem, assisting in diagnosing and resolving issues efficiently.

```js
{
  "result": "ERR",
  "status": 400,
  "message": "errMsg_organizationIdisNotAValidID",
  "errCode": 400,
  "date": "2024-03-19T12:13:54.124Z",
  "detail": "String"
}
```

### Object Structure of a Successfull Response

When the `AdminOps` service processes requests successfully, it wraps the requested resource(s) within a JSON envelope. This envelope not only contains the data but also includes essential metadata, such as configuration details and pagination information, to enrich the response and provide context to the client.

**Key Characteristics of the Response Envelope:**

- **Data Presentation**: Depending on the nature of the request, the service returns either a single data object or an array of objects encapsulated within the JSON envelope.
  - **Creation and Update Routes**: These routes return the unmodified (pure) form of the data object(s), without any associations to other data objects.
  - **Delete Routes**: Even though the data is removed from the database, the last known state of the data object(s) is returned in its pure form.
  - **Get Requests**: A single data object is returned in JSON format.
  - **Get List Requests**: An array of data objects is provided, reflecting a collection of resources.

- **Data Structure and Joins**: The complexity of the data structure in the response can vary based on the route's architectural design and the join options specified in the request. The architecture might inherently limit join operations, or they might be dynamically controlled through query parameters.
  - **Pure Data Forms**: In some cases, the response mirrors the exact structure found in the primary data table, without extensions.
  - **Extended Data Forms**: Alternatively, responses might include data extended through joins with tables within the same service or aggregated from external sources, such as ElasticSearch indices related to other services.
  - **Join Varieties**: The extensions might involve one-to-one joins, resulting in single object associations, or one-to-many joins, leading to an array of objects. In certain instances, the data might even feature nested inclusions from other data objects.

**Design Considerations**: The structure of a route's response data is meticulously crafted during the service's architectural planning. This design ensures that responses adequately reflect the intended data relationships and service logic, providing clients with rich and meaningful information.

**Brief Data**: Certain routes return a condensed version of the object data, intentionally selecting only specific fields deemed useful for that request. In such instances, the route documentation will detail the properties included in the response, guiding developers on what to expect.

### API Response Structure

The API utilizes a standardized JSON envelope to encapsulate responses. This envelope is designed to consistently deliver both the requested data and essential metadata, ensuring that clients can efficiently interpret and utilize the response.

**HTTP Status Codes:**

- **200 OK**: This status code is returned for successful GET, GETLIST, UPDATE, or DELETE operations, indicating that the request has been processed successfully.
- **201 Created**: This status code is specific to CREATE operations, signifying that the requested resource has been successfully created.

**Success Response Format:**

For successful operations, the response includes a `"status": "OK"` property, signaling the successful execution of the request. The structure of a successful response is outlined below:

```json
{
  "status":"OK",
  "statusCode": 200,
  "elapsedMs":126,
  "ssoTime":120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName":"products",
  "method":"GET",
  "action":"getList",
  "appVersion":"Version",
  "rowCount":3
  "products":[{},{},{}],
  "paging": {
    "pageNumber":1,
    "pageRowCount":25,
    "totalRowCount":3,
    "pageCount":1
  },
  "filters": [],
  "uiPermissions": []
}
```

- **`products`**: In this example, this key contains the actual response content, which may be a single object or an array of objects depending on the operation performed.

**Handling Errors:**

For details on handling error scenarios and understanding the structure of error responses, please refer to the "Error Response" section provided earlier in this documentation. It outlines how error conditions are communicated, including the use of HTTP status codes and standardized JSON structures for error messages.

**Route Validation Layers:**

Route Validations may be executed in 4 different layers. The layer is a kind of time definition in the route life cycle. Note that while conditional check times are defined by layers, the fetch actions are defined by access times.

`layer1`: "The first layer of route life cycle which is just after the request parameters are validated and the request is in controller. Any script, validation or data operation in this layer can access the route parameters only. The beforeInstance data is not ready yet."

`layer2`: "The second layer of route life cycle which is just after beforeInstance data is collected before the main operation of the route and the main operation is not started yet. In this layer the collected supplementary data is accessable with the route parameters."

`layer3`: "The third layer of route life cycle which is just after the main operation of the route is completed. In this layer the main operation result is accessable with the beforeInstance data and route parameters. Note that the afterInstance data is not ready yet."

`layer4`: "The last layer of route life cycle which is just after afterInstance supplementary data is collected. In this layer the afterInstance data is accessable with the main operation result, beforeInstance data and route parameters."

## Resources

AdminOps service provides the following resources which are stored in its own database as a data object. Note that a resource for an api access is a data object for the service.

### BranchStaffAssignment resource

_Resource Definition_ : Links a staff/librarian user to a branch, capturing assignment history, staff role, active status, and branch-level permissions. Enables branch manager to add, update, or remove staff from a branch/team.
_BranchStaffAssignment Resource Properties_
| Name | Type | Required | Default | Definition |
| ---- | ---- | -------- | ------- | ---------- |
| **branchId** | ID | | | _Branch the staff/librarian is assigned to._ |
| **userId** | ID | | | _User assigned as staff/librarian; links to user object._ |
| **role** | Enum | | | _Role of staff at branch: 0=librarian, 1=manager, 2=assistant, 3=regionalAdmin (for advanced permission control)_ |
| **assignedByUserId** | ID | | | _User who created/assigned this staff record (typically branch manager)_ |

#### Enum Properties

Enum properties are represented as Small Integer values (0-255) in the database. The values are mapped to their corresponding names in the application layer.

##### role Enum Property

_Enum Options_
| Name | Value | Index |
| ---- | ----- | ----- |
| **librarian** | `"librarian""` | 0 |
| **manager** | `"manager""` | 1 |
| **assistant** | `"assistant""` | 2 |
| **regionalAdmin** | `"regionalAdmin""` | 3 |

### IssueEscalation resource

_Resource Definition_ : Logs and manages member or staff issues escalated for resolution at the branch/administrative level. Tracks status, assignment(s), escalation reason, actions, and involved parties.
_IssueEscalation Resource Properties_
| Name | Type | Required | Default | Definition |
| ---- | ---- | -------- | ------- | ---------- |
| **branchId** | ID | | | _Branch related to issue; for escalation routing and reporting._ |
| **raisedByUserId** | ID | | | _User/member/staff who raised the issue._ |
| **assignedToUserId** | ID | | | _User assigned to handle the escalation/issue (e.g., branch manager/staff/other admin)._ |
| **status** | Enum | | | _Escalation status: 0=open, 1=assigned, 2=inProgress, 3=resolved, 4=closed, 5=canceled_ |
| **escalationType** | Enum | | | _Type of issue: 0=service, 1=memberComplaint, 2=facility, 3=system, 4=other_ |
| **description** | Text | | | _Issue/escalation description/details._ |
| **log** | Object | | | _Chronological event log (assignments, status updates, notes) for escalation. Format: [{timestamp, userId, action, note}]._ |

#### Enum Properties

Enum properties are represented as Small Integer values (0-255) in the database. The values are mapped to their corresponding names in the application layer.

##### status Enum Property

_Enum Options_
| Name | Value | Index |
| ---- | ----- | ----- |
| **open** | `"open""` | 0 |
| **assigned** | `"assigned""` | 1 |
| **inProgress** | `"inProgress""` | 2 |
| **resolved** | `"resolved""` | 3 |
| **closed** | `"closed""` | 4 |
| **canceled** | `"canceled""` | 5 |

##### escalationType Enum Property

_Enum Options_
| Name | Value | Index |
| ---- | ----- | ----- |
| **service** | `"service""` | 0 |
| **memberComplaint** | `"memberComplaint""` | 1 |
| **facility** | `"facility""` | 2 |
| **system** | `"system""` | 3 |
| **other** | `"other""` | 4 |

### MongoAdminConfig resource

_Resource Definition_ : Represents advanced MongoDB configuration for admin (index settings, transaction rules, aggregation pipeline definitions, etc). Used for diagnostic and admin UX only.
_MongoAdminConfig Resource Properties_
| Name | Type | Required | Default | Definition |
| ---- | ---- | -------- | ------- | ---------- |
| **configType** | Enum | | | _Type of MongoDB config: 0=index, 1=aggregation, 2=transaction, 3=replication, 4=archive, 5=other_ |
| **targetObject** | String | | | _The data object or collection being configured (e.g., book, loan, review, branch, all, etc)._ |
| **configDetails** | Object | | | _Flexible admin-supplied object describing config schema (JSON definition for index, aggregation, transaction, etc)._ |
| **status** | Enum | | | _Config status: 0=active, 1=inactive, 2=archived, 3=scheduled, 4=error_ |

#### Enum Properties

Enum properties are represented as Small Integer values (0-255) in the database. The values are mapped to their corresponding names in the application layer.

##### configType Enum Property

_Enum Options_
| Name | Value | Index |
| ---- | ----- | ----- |
| **index** | `"index""` | 0 |
| **aggregation** | `"aggregation""` | 1 |
| **transaction** | `"transaction""` | 2 |
| **replication** | `"replication""` | 3 |
| **archive** | `"archive""` | 4 |
| **other** | `"other""` | 5 |

##### status Enum Property

_Enum Options_
| Name | Value | Index |
| ---- | ----- | ----- |
| **active** | `"active""` | 0 |
| **inactive** | `"inactive""` | 1 |
| **archived** | `"archived""` | 2 |
| **scheduled** | `"scheduled""` | 3 |
| **error** | `"error""` | 4 |

### ExternalNotificationConfig resource

_Resource Definition_ : Connection/config object for external notification or publishing service integration (e.g. email, SMS, push, webhook, etc). Contains host, secrets, settings per method.
_ExternalNotificationConfig Resource Properties_
| Name | Type | Required | Default | Definition |
| ---- | ---- | -------- | ------- | ---------- |
| **providerType** | Enum | | | _Type of notification/publishing provider: 0=email, 1=SMS, 2=push, 3=webhook, 4=other_ |
| **name** | String | | | _Friendly display name for this config/connection._ |
| **settings** | Object | | | _Connection and credential object for this notification method: host, keyId, secret, endpoint, params, per provider._ |
| **status** | Enum | | | _Connection/config status: 0=enabled, 1=disabled, 2=pendingVerification, 3=error_ |

#### Enum Properties

Enum properties are represented as Small Integer values (0-255) in the database. The values are mapped to their corresponding names in the application layer.

##### providerType Enum Property

_Enum Options_
| Name | Value | Index |
| ---- | ----- | ----- |
| **email** | `"email""` | 0 |
| **sms** | `"sms""` | 1 |
| **push** | `"push""` | 2 |
| **webhook** | `"webhook""` | 3 |
| **other** | `"other""` | 4 |

##### status Enum Property

_Enum Options_
| Name | Value | Index |
| ---- | ----- | ----- |
| **enabled** | `"enabled""` | 0 |
| **disabled** | `"disabled""` | 1 |
| **pendingVerification** | `"pendingVerification""` | 2 |
| **error** | `"error""` | 3 |

### SystemBackupAudit resource

_Resource Definition_ : Tracks system backup and restore jobs/operations for audit and compliance (initiated by admin). Stores config, timing, initiator/results.
_SystemBackupAudit Resource Properties_
| Name | Type | Required | Default | Definition |
| ---- | ---- | -------- | ------- | ---------- |
| **type** | Enum | | | _Type of backup job: 0=backup, 1=restore, 2=validate, 3=purge, 4=other_ |
| **config** | Object | | | _Backup/restore config/settings: storage location, incremental/full, compression, etc._ |
| **initiatedByUserId** | ID | | | _Admin user who initiated the backup/restore job._ |
| **status** | Enum | | | _Job status: 0=started, 1=success, 2=error, 3=partial, 4=aborted_ |
| **resultDetails** | Object | | | _Flexible result/log object: summary, run time, files, affected objects, error/warning info, logs._ |

#### Enum Properties

Enum properties are represented as Small Integer values (0-255) in the database. The values are mapped to their corresponding names in the application layer.

##### type Enum Property

_Enum Options_
| Name | Value | Index |
| ---- | ----- | ----- |
| **backup** | `"backup""` | 0 |
| **restore** | `"restore""` | 1 |
| **validate** | `"validate""` | 2 |
| **purge** | `"purge""` | 3 |
| **other** | `"other""` | 4 |

##### status Enum Property

_Enum Options_
| Name | Value | Index |
| ---- | ----- | ----- |
| **started** | `"started""` | 0 |
| **success** | `"success""` | 1 |
| **error** | `"error""` | 2 |
| **partial** | `"partial""` | 3 |
| **aborted** | `"aborted""` | 4 |

### BranchPurchaseOrder resource

_Resource Definition_ : Represents a library branch&#39;s proposed acquisition (purchase order) for new books/materials; supports manager approval workflow and procurement status.
_BranchPurchaseOrder Resource Properties_
| Name | Type | Required | Default | Definition |
| ---- | ---- | -------- | ------- | ---------- |
| **branchId** | ID | | | _Branch making the acquisition request._ |
| **requestedByUserId** | ID | | | _User (librarian/manager) who requested this purchase order._ |
| **items** | Object | | | _List of items/books to be procured: [{bookId, quantity, note}]._ |
| **status** | Enum | | | _Purchase order status: 0=pending, 1=approved, 2=rejected, 3=inProgress, 4=fulfilled, 5=canceled_ |
| **approvedByUserId** | ID | | | _Branch manager who approved or rejected order._ |
| **approvalDate** | Date | | | _Date/time of approval or rejection._ |
| **note** | Text | | | _Optional note/justification for order, or approval decision._ |

#### Enum Properties

Enum properties are represented as Small Integer values (0-255) in the database. The values are mapped to their corresponding names in the application layer.

##### status Enum Property

_Enum Options_
| Name | Value | Index |
| ---- | ----- | ----- |
| **pending** | `"pending""` | 0 |
| **approved** | `"approved""` | 1 |
| **rejected** | `"rejected""` | 2 |
| **inProgress** | `"inProgress""` | 3 |
| **fulfilled** | `"fulfilled""` | 4 |
| **canceled** | `"canceled""` | 5 |

### Tregt resource

_Resource Definition_ : treter
_Tregt Resource Properties_
| Name | Type | Required | Default | Definition |
| ---- | ---- | -------- | ------- | ---------- |

### AdminOpsShareToken resource

_Resource Definition_ : A data object that stores the share tokens for tokenized access to shared objects.
_AdminOpsShareToken Resource Properties_
| Name | Type | Required | Default | Definition |
| ---- | ---- | -------- | ------- | ---------- |
| **configName** | String | | | _A string value to represent the related configuration of the shared token._ |
| **objectName** | String | | | _A string value to represent the type name of the shared object like `report`, `document`._ |
| **objectId** | ID | | | _An ID value to represent the shared target data object instance._ |
| **ownerId** | ID | | | _An ID value to represent the user who shared the object by creating this token._ |
| **peopleOption** | String | | | _A string value to represent the access option of the share token. It can be either anyoneWithLink or specificEmails._ |
| **tokenPermissions** | | | | _A string array to store the names of permissions (or roles) by the sharing user._ |
| **allowedEmails** | | | | _A string array to store the allowed emails if the peopleOption is specificEmails._ |
| **expireDate** | Date | | | _A date value to specify the expire date of the token. Null for infinite token._ |

## Crud Routes

### Route: getBranchStaffAssignment

_Route Definition_ : Fetch one branch staff assignment by ID.

_Route Type_ : get

_Default access route_ : _GET_ `/branchstaffassignments/:branchStaffAssignmentId`

#### Parameters

The getBranchStaffAssignment api has got 1 parameter

| Parameter               | Type | Required | Population                              |
| ----------------------- | ---- | -------- | --------------------------------------- |
| branchStaffAssignmentId | ID   | true     | request.params?.branchStaffAssignmentId |

To access the api you can use the **REST** controller with the path **GET /branchstaffassignments/:branchStaffAssignmentId**

```js
axios({
  method: "GET",
  url: `/branchstaffassignments/${branchStaffAssignmentId}`,
  data: {},
  params: {},
});
```

The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, getlist, update, or delete requests, and 201 for create requests. Each successful response includes a `"status": "OK"` property. For error handling, refer to the "Error Response" section.

Following JSON represents the most comprehensive form of the **`branchStaffAssignment`** object in the respones. However, some properties may be omitted based on the object's internal logic.

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "branchStaffAssignment",
  "action": "get",
  "appVersion": "Version",
  "rowCount": 1,
  "branchStaffAssignment": { "id": "ID", "isActive": true }
}
```

### Route: createBranchStaffAssignment

_Route Definition_ : Assign a staff/librarian to a branch (by branch manager).

_Route Type_ : create

_Default access route_ : _POST_ `/branchstaffassignments`

#### Parameters

The createBranchStaffAssignment api has got 3 parameters

| Parameter | Type | Required | Population             |
| --------- | ---- | -------- | ---------------------- |
| branchId  | ID   | true     | request.body?.branchId |
| userId    | ID   | true     | request.body?.userId   |
| role      | Enum | true     | request.body?.role     |

To access the api you can use the **REST** controller with the path **POST /branchstaffassignments**

```js
axios({
  method: "POST",
  url: "/branchstaffassignments",
  data: {
    branchId: "ID",
    userId: "ID",
    role: "Enum",
  },
  params: {},
});
```

The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, getlist, update, or delete requests, and 201 for create requests. Each successful response includes a `"status": "OK"` property. For error handling, refer to the "Error Response" section.

Following JSON represents the most comprehensive form of the **`branchStaffAssignment`** object in the respones. However, some properties may be omitted based on the object's internal logic.

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "branchStaffAssignment",
  "action": "create",
  "appVersion": "Version",
  "rowCount": 1,
  "branchStaffAssignment": { "id": "ID", "isActive": true }
}
```

### Route: updateBranchStaffAssignment

_Route Definition_ : Update staff assignment/role at branch.

_Route Type_ : update

_Default access route_ : _PATCH_ `/branchstaffassignments/:branchStaffAssignmentId`

#### Parameters

The updateBranchStaffAssignment api has got 4 parameters

| Parameter               | Type | Required | Population                              |
| ----------------------- | ---- | -------- | --------------------------------------- |
| branchStaffAssignmentId | ID   | true     | request.params?.branchStaffAssignmentId |
| branchId                | ID   | false    | request.body?.branchId                  |
| userId                  | ID   | false    | request.body?.userId                    |
| role                    | Enum | true     | request.body?.role                      |

To access the api you can use the **REST** controller with the path **PATCH /branchstaffassignments/:branchStaffAssignmentId**

```js
axios({
  method: "PATCH",
  url: `/branchstaffassignments/${branchStaffAssignmentId}`,
  data: {
    branchId: "ID",
    userId: "ID",
    role: "Enum",
  },
  params: {},
});
```

The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, getlist, update, or delete requests, and 201 for create requests. Each successful response includes a `"status": "OK"` property. For error handling, refer to the "Error Response" section.

Following JSON represents the most comprehensive form of the **`branchStaffAssignment`** object in the respones. However, some properties may be omitted based on the object's internal logic.

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "branchStaffAssignment",
  "action": "update",
  "appVersion": "Version",
  "rowCount": 1,
  "branchStaffAssignment": { "id": "ID", "isActive": true }
}
```

### Route: deleteBranchStaffAssignment

_Route Definition_ : Delete or deactivate staff assignment from branch (soft delete).

_Route Type_ : delete

_Default access route_ : _DELETE_ `/branchstaffassignments/:branchStaffAssignmentId`

#### Parameters

The deleteBranchStaffAssignment api has got 1 parameter

| Parameter               | Type | Required | Population                              |
| ----------------------- | ---- | -------- | --------------------------------------- |
| branchStaffAssignmentId | ID   | true     | request.params?.branchStaffAssignmentId |

To access the api you can use the **REST** controller with the path **DELETE /branchstaffassignments/:branchStaffAssignmentId**

```js
axios({
  method: "DELETE",
  url: `/branchstaffassignments/${branchStaffAssignmentId}`,
  data: {},
  params: {},
});
```

The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, getlist, update, or delete requests, and 201 for create requests. Each successful response includes a `"status": "OK"` property. For error handling, refer to the "Error Response" section.

Following JSON represents the most comprehensive form of the **`branchStaffAssignment`** object in the respones. However, some properties may be omitted based on the object's internal logic.

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "branchStaffAssignment",
  "action": "delete",
  "appVersion": "Version",
  "rowCount": 1,
  "branchStaffAssignment": { "id": "ID", "isActive": false }
}
```

### Route: listBranchStaffAssignments

_Route Definition_ : List staff users assigned to a branch, filter by role/user.

_Route Type_ : getList

_Default access route_ : _GET_ `/branchstaffassignments`

The listBranchStaffAssignments api has got no parameters.

To access the api you can use the **REST** controller with the path **GET /branchstaffassignments**

```js
axios({
  method: "GET",
  url: "/branchstaffassignments",
  data: {},
  params: {},
});
```

The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, getlist, update, or delete requests, and 201 for create requests. Each successful response includes a `"status": "OK"` property. For error handling, refer to the "Error Response" section.

Following JSON represents the most comprehensive form of the **`branchStaffAssignments`** object in the respones. However, some properties may be omitted based on the object's internal logic.

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "branchStaffAssignments",
  "action": "getList",
  "appVersion": "Version",
  "rowCount": "\"Number\"",
  "branchStaffAssignments": [{ "id": "ID", "isActive": true }, {}, {}],
  "paging": {
    "pageNumber": "Number",
    "pageRowCount": "NUmber",
    "totalRowCount": "Number",
    "pageCount": "Number"
  },
  "filters": [],
  "uiPermissions": []
}
```

### Route: getIssueEscalation

_Route Definition_ : Fetch a branch or member escalation issue by ID.

_Route Type_ : get

_Default access route_ : _GET_ `/issueescalations/:issueEscalationId`

#### Parameters

The getIssueEscalation api has got 1 parameter

| Parameter         | Type | Required | Population                        |
| ----------------- | ---- | -------- | --------------------------------- |
| issueEscalationId | ID   | true     | request.params?.issueEscalationId |

To access the api you can use the **REST** controller with the path **GET /issueescalations/:issueEscalationId**

```js
axios({
  method: "GET",
  url: `/issueescalations/${issueEscalationId}`,
  data: {},
  params: {},
});
```

The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, getlist, update, or delete requests, and 201 for create requests. Each successful response includes a `"status": "OK"` property. For error handling, refer to the "Error Response" section.

Following JSON represents the most comprehensive form of the **`issueEscalation`** object in the respones. However, some properties may be omitted based on the object's internal logic.

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "issueEscalation",
  "action": "get",
  "appVersion": "Version",
  "rowCount": 1,
  "issueEscalation": { "id": "ID", "isActive": true }
}
```

### Route: createIssueEscalation

_Route Definition_ : Create a branch/member/staff issue escalation record; begins the resolution process.

_Route Type_ : create

_Default access route_ : _POST_ `/issueescalations`

#### Parameters

The createIssueEscalation api has got 6 parameters

| Parameter        | Type   | Required | Population                     |
| ---------------- | ------ | -------- | ------------------------------ |
| branchId         | ID     | true     | request.body?.branchId         |
| assignedToUserId | ID     | false    | request.body?.assignedToUserId |
| status           | Enum   | true     | request.body?.status           |
| escalationType   | Enum   | true     | request.body?.escalationType   |
| description      | Text   | true     | request.body?.description      |
| log              | Object | false    | request.body?.log              |

To access the api you can use the **REST** controller with the path **POST /issueescalations**

```js
axios({
  method: "POST",
  url: "/issueescalations",
  data: {
    branchId: "ID",
    assignedToUserId: "ID",
    status: "Enum",
    escalationType: "Enum",
    description: "Text",
    log: "Object",
  },
  params: {},
});
```

The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, getlist, update, or delete requests, and 201 for create requests. Each successful response includes a `"status": "OK"` property. For error handling, refer to the "Error Response" section.

Following JSON represents the most comprehensive form of the **`issueEscalation`** object in the respones. However, some properties may be omitted based on the object's internal logic.

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "issueEscalation",
  "action": "create",
  "appVersion": "Version",
  "rowCount": 1,
  "issueEscalation": { "id": "ID", "isActive": true }
}
```

### Route: updateIssueEscalation

_Route Definition_ : Update status, assignment or add log entry/details for escalation issue.

_Route Type_ : update

_Default access route_ : _PATCH_ `/issueescalations/:issueEscalationId`

#### Parameters

The updateIssueEscalation api has got 7 parameters

| Parameter         | Type   | Required | Population                        |
| ----------------- | ------ | -------- | --------------------------------- |
| issueEscalationId | ID     | true     | request.params?.issueEscalationId |
| branchId          | ID     | false    | request.body?.branchId            |
| assignedToUserId  | ID     | false    | request.body?.assignedToUserId    |
| status            | Enum   | true     | request.body?.status              |
| escalationType    | Enum   | false    | request.body?.escalationType      |
| description       | Text   | false    | request.body?.description         |
| log               | Object | false    | request.body?.log                 |

To access the api you can use the **REST** controller with the path **PATCH /issueescalations/:issueEscalationId**

```js
axios({
  method: "PATCH",
  url: `/issueescalations/${issueEscalationId}`,
  data: {
    branchId: "ID",
    assignedToUserId: "ID",
    status: "Enum",
    escalationType: "Enum",
    description: "Text",
    log: "Object",
  },
  params: {},
});
```

The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, getlist, update, or delete requests, and 201 for create requests. Each successful response includes a `"status": "OK"` property. For error handling, refer to the "Error Response" section.

Following JSON represents the most comprehensive form of the **`issueEscalation`** object in the respones. However, some properties may be omitted based on the object's internal logic.

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "issueEscalation",
  "action": "update",
  "appVersion": "Version",
  "rowCount": 1,
  "issueEscalation": { "id": "ID", "isActive": true }
}
```

### Route: deleteIssueEscalation

_Route Definition_ : Close, resolve, or deactivate an escalation/issue (soft delete).

_Route Type_ : delete

_Default access route_ : _DELETE_ `/issueescalations/:issueEscalationId`

#### Parameters

The deleteIssueEscalation api has got 1 parameter

| Parameter         | Type | Required | Population                        |
| ----------------- | ---- | -------- | --------------------------------- |
| issueEscalationId | ID   | true     | request.params?.issueEscalationId |

To access the api you can use the **REST** controller with the path **DELETE /issueescalations/:issueEscalationId**

```js
axios({
  method: "DELETE",
  url: `/issueescalations/${issueEscalationId}`,
  data: {},
  params: {},
});
```

The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, getlist, update, or delete requests, and 201 for create requests. Each successful response includes a `"status": "OK"` property. For error handling, refer to the "Error Response" section.

Following JSON represents the most comprehensive form of the **`issueEscalation`** object in the respones. However, some properties may be omitted based on the object's internal logic.

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "issueEscalation",
  "action": "delete",
  "appVersion": "Version",
  "rowCount": 1,
  "issueEscalation": { "id": "ID", "isActive": false }
}
```

### Route: listIssueEscalations

_Route Definition_ : List escalated issues (filter by branch, user, status, type, assignment).

_Route Type_ : getList

_Default access route_ : _GET_ `/issueescalations`

The listIssueEscalations api has got no parameters.

To access the api you can use the **REST** controller with the path **GET /issueescalations**

```js
axios({
  method: "GET",
  url: "/issueescalations",
  data: {},
  params: {},
});
```

The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, getlist, update, or delete requests, and 201 for create requests. Each successful response includes a `"status": "OK"` property. For error handling, refer to the "Error Response" section.

Following JSON represents the most comprehensive form of the **`issueEscalations`** object in the respones. However, some properties may be omitted based on the object's internal logic.

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "issueEscalations",
  "action": "getList",
  "appVersion": "Version",
  "rowCount": "\"Number\"",
  "issueEscalations": [{ "id": "ID", "isActive": true }, {}, {}],
  "paging": {
    "pageNumber": "Number",
    "pageRowCount": "NUmber",
    "totalRowCount": "Number",
    "pageCount": "Number"
  },
  "filters": [],
  "uiPermissions": []
}
```

### Route: getMongoAdminConfig

_Route Definition_ : Fetch one advanced MongoDB admin config by ID.

_Route Type_ : get

_Default access route_ : _GET_ `/mongoadminconfigs/:mongoAdminConfigId`

#### Parameters

The getMongoAdminConfig api has got 1 parameter

| Parameter          | Type | Required | Population                         |
| ------------------ | ---- | -------- | ---------------------------------- |
| mongoAdminConfigId | ID   | true     | request.params?.mongoAdminConfigId |

To access the api you can use the **REST** controller with the path **GET /mongoadminconfigs/:mongoAdminConfigId**

```js
axios({
  method: "GET",
  url: `/mongoadminconfigs/${mongoAdminConfigId}`,
  data: {},
  params: {},
});
```

The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, getlist, update, or delete requests, and 201 for create requests. Each successful response includes a `"status": "OK"` property. For error handling, refer to the "Error Response" section.

Following JSON represents the most comprehensive form of the **`mongoAdminConfig`** object in the respones. However, some properties may be omitted based on the object's internal logic.

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "mongoAdminConfig",
  "action": "get",
  "appVersion": "Version",
  "rowCount": 1,
  "mongoAdminConfig": { "id": "ID", "isActive": true }
}
```

### Route: createMongoAdminConfig

_Route Definition_ : Create new advanced MongoDB admin config or diagnostic setting.

_Route Type_ : create

_Default access route_ : _POST_ `/mongoadminconfigs`

#### Parameters

The createMongoAdminConfig api has got 4 parameters

| Parameter     | Type   | Required | Population                  |
| ------------- | ------ | -------- | --------------------------- |
| configType    | Enum   | true     | request.body?.configType    |
| targetObject  | String | true     | request.body?.targetObject  |
| configDetails | Object | true     | request.body?.configDetails |
| status        | Enum   | true     | request.body?.status        |

To access the api you can use the **REST** controller with the path **POST /mongoadminconfigs**

```js
axios({
  method: "POST",
  url: "/mongoadminconfigs",
  data: {
    configType: "Enum",
    targetObject: "String",
    configDetails: "Object",
    status: "Enum",
  },
  params: {},
});
```

The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, getlist, update, or delete requests, and 201 for create requests. Each successful response includes a `"status": "OK"` property. For error handling, refer to the "Error Response" section.

Following JSON represents the most comprehensive form of the **`mongoAdminConfig`** object in the respones. However, some properties may be omitted based on the object's internal logic.

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "mongoAdminConfig",
  "action": "create",
  "appVersion": "Version",
  "rowCount": 1,
  "mongoAdminConfig": { "id": "ID", "isActive": true }
}
```

### Route: updateMongoAdminConfig

_Route Definition_ : Update status/settings of advanced MongoDB admin config or diagnostic record.

_Route Type_ : update

_Default access route_ : _PATCH_ `/mongoadminconfigs/:mongoAdminConfigId`

#### Parameters

The updateMongoAdminConfig api has got 5 parameters

| Parameter          | Type   | Required | Population                         |
| ------------------ | ------ | -------- | ---------------------------------- |
| mongoAdminConfigId | ID     | true     | request.params?.mongoAdminConfigId |
| configType         | Enum   | true     | request.body?.configType           |
| targetObject       | String | false    | request.body?.targetObject         |
| configDetails      | Object | false    | request.body?.configDetails        |
| status             | Enum   | true     | request.body?.status               |

To access the api you can use the **REST** controller with the path **PATCH /mongoadminconfigs/:mongoAdminConfigId**

```js
axios({
  method: "PATCH",
  url: `/mongoadminconfigs/${mongoAdminConfigId}`,
  data: {
    configType: "Enum",
    targetObject: "String",
    configDetails: "Object",
    status: "Enum",
  },
  params: {},
});
```

The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, getlist, update, or delete requests, and 201 for create requests. Each successful response includes a `"status": "OK"` property. For error handling, refer to the "Error Response" section.

Following JSON represents the most comprehensive form of the **`mongoAdminConfig`** object in the respones. However, some properties may be omitted based on the object's internal logic.

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "mongoAdminConfig",
  "action": "update",
  "appVersion": "Version",
  "rowCount": 1,
  "mongoAdminConfig": { "id": "ID", "isActive": true }
}
```

### Route: deleteMongoAdminConfig

_Route Definition_ : Archive or delete a MongoDB admin config or diagnostic entry (soft delete).

_Route Type_ : delete

_Default access route_ : _DELETE_ `/mongoadminconfigs/:mongoAdminConfigId`

#### Parameters

The deleteMongoAdminConfig api has got 1 parameter

| Parameter          | Type | Required | Population                         |
| ------------------ | ---- | -------- | ---------------------------------- |
| mongoAdminConfigId | ID   | true     | request.params?.mongoAdminConfigId |

To access the api you can use the **REST** controller with the path **DELETE /mongoadminconfigs/:mongoAdminConfigId**

```js
axios({
  method: "DELETE",
  url: `/mongoadminconfigs/${mongoAdminConfigId}`,
  data: {},
  params: {},
});
```

The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, getlist, update, or delete requests, and 201 for create requests. Each successful response includes a `"status": "OK"` property. For error handling, refer to the "Error Response" section.

Following JSON represents the most comprehensive form of the **`mongoAdminConfig`** object in the respones. However, some properties may be omitted based on the object's internal logic.

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "mongoAdminConfig",
  "action": "delete",
  "appVersion": "Version",
  "rowCount": 1,
  "mongoAdminConfig": { "id": "ID", "isActive": false }
}
```

### Route: listMongoAdminConfigs

_Route Definition_ : List all advanced MongoDB admin configs and diagnostic records (by type, object, status).

_Route Type_ : getList

_Default access route_ : _GET_ `/mongoadminconfigs`

The listMongoAdminConfigs api has got no parameters.

To access the api you can use the **REST** controller with the path **GET /mongoadminconfigs**

```js
axios({
  method: "GET",
  url: "/mongoadminconfigs",
  data: {},
  params: {},
});
```

The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, getlist, update, or delete requests, and 201 for create requests. Each successful response includes a `"status": "OK"` property. For error handling, refer to the "Error Response" section.

Following JSON represents the most comprehensive form of the **`mongoAdminConfigs`** object in the respones. However, some properties may be omitted based on the object's internal logic.

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "mongoAdminConfigs",
  "action": "getList",
  "appVersion": "Version",
  "rowCount": "\"Number\"",
  "mongoAdminConfigs": [{ "id": "ID", "isActive": true }, {}, {}],
  "paging": {
    "pageNumber": "Number",
    "pageRowCount": "NUmber",
    "totalRowCount": "Number",
    "pageCount": "Number"
  },
  "filters": [],
  "uiPermissions": []
}
```

### Route: getExternalNotificationConfig

_Route Definition_ : Fetch notification/publishing service config by ID.

_Route Type_ : get

_Default access route_ : _GET_ `/externalnotificationconfigs/:externalNotificationConfigId`

#### Parameters

The getExternalNotificationConfig api has got 1 parameter

| Parameter                    | Type | Required | Population                                   |
| ---------------------------- | ---- | -------- | -------------------------------------------- |
| externalNotificationConfigId | ID   | true     | request.params?.externalNotificationConfigId |

To access the api you can use the **REST** controller with the path **GET /externalnotificationconfigs/:externalNotificationConfigId**

```js
axios({
  method: "GET",
  url: `/externalnotificationconfigs/${externalNotificationConfigId}`,
  data: {},
  params: {},
});
```

The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, getlist, update, or delete requests, and 201 for create requests. Each successful response includes a `"status": "OK"` property. For error handling, refer to the "Error Response" section.

Following JSON represents the most comprehensive form of the **`externalNotificationConfig`** object in the respones. However, some properties may be omitted based on the object's internal logic.

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "externalNotificationConfig",
  "action": "get",
  "appVersion": "Version",
  "rowCount": 1,
  "externalNotificationConfig": { "id": "ID", "isActive": true }
}
```

### Route: createExternalNotificationConfig

_Route Definition_ : Create notification/publishing service config &amp; credentials for integration.

_Route Type_ : create

_Default access route_ : _POST_ `/externalnotificationconfigs`

#### Parameters

The createExternalNotificationConfig api has got 4 parameters

| Parameter    | Type   | Required | Population                 |
| ------------ | ------ | -------- | -------------------------- |
| providerType | Enum   | true     | request.body?.providerType |
| name         | String | true     | request.body?.name         |
| settings     | Object | true     | request.body?.settings     |
| status       | Enum   | true     | request.body?.status       |

To access the api you can use the **REST** controller with the path **POST /externalnotificationconfigs**

```js
axios({
  method: "POST",
  url: "/externalnotificationconfigs",
  data: {
    providerType: "Enum",
    name: "String",
    settings: "Object",
    status: "Enum",
  },
  params: {},
});
```

The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, getlist, update, or delete requests, and 201 for create requests. Each successful response includes a `"status": "OK"` property. For error handling, refer to the "Error Response" section.

Following JSON represents the most comprehensive form of the **`externalNotificationConfig`** object in the respones. However, some properties may be omitted based on the object's internal logic.

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "externalNotificationConfig",
  "action": "create",
  "appVersion": "Version",
  "rowCount": 1,
  "externalNotificationConfig": { "id": "ID", "isActive": true }
}
```

### Route: updateExternalNotificationConfig

_Route Definition_ : Update config, credentials, or status for notification/publishing integration.

_Route Type_ : update

_Default access route_ : _PATCH_ `/externalnotificationconfigs/:externalNotificationConfigId`

#### Parameters

The updateExternalNotificationConfig api has got 5 parameters

| Parameter                    | Type   | Required | Population                                   |
| ---------------------------- | ------ | -------- | -------------------------------------------- |
| externalNotificationConfigId | ID     | true     | request.params?.externalNotificationConfigId |
| providerType                 | Enum   | true     | request.body?.providerType                   |
| name                         | String | false    | request.body?.name                           |
| settings                     | Object | false    | request.body?.settings                       |
| status                       | Enum   | true     | request.body?.status                         |

To access the api you can use the **REST** controller with the path **PATCH /externalnotificationconfigs/:externalNotificationConfigId**

```js
axios({
  method: "PATCH",
  url: `/externalnotificationconfigs/${externalNotificationConfigId}`,
  data: {
    providerType: "Enum",
    name: "String",
    settings: "Object",
    status: "Enum",
  },
  params: {},
});
```

The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, getlist, update, or delete requests, and 201 for create requests. Each successful response includes a `"status": "OK"` property. For error handling, refer to the "Error Response" section.

Following JSON represents the most comprehensive form of the **`externalNotificationConfig`** object in the respones. However, some properties may be omitted based on the object's internal logic.

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "externalNotificationConfig",
  "action": "update",
  "appVersion": "Version",
  "rowCount": 1,
  "externalNotificationConfig": { "id": "ID", "isActive": true }
}
```

### Route: deleteExternalNotificationConfig

_Route Definition_ : Disable, archive, or delete notification/publishing config (soft delete).

_Route Type_ : delete

_Default access route_ : _DELETE_ `/externalnotificationconfigs/:externalNotificationConfigId`

#### Parameters

The deleteExternalNotificationConfig api has got 1 parameter

| Parameter                    | Type | Required | Population                                   |
| ---------------------------- | ---- | -------- | -------------------------------------------- |
| externalNotificationConfigId | ID   | true     | request.params?.externalNotificationConfigId |

To access the api you can use the **REST** controller with the path **DELETE /externalnotificationconfigs/:externalNotificationConfigId**

```js
axios({
  method: "DELETE",
  url: `/externalnotificationconfigs/${externalNotificationConfigId}`,
  data: {},
  params: {},
});
```

The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, getlist, update, or delete requests, and 201 for create requests. Each successful response includes a `"status": "OK"` property. For error handling, refer to the "Error Response" section.

Following JSON represents the most comprehensive form of the **`externalNotificationConfig`** object in the respones. However, some properties may be omitted based on the object's internal logic.

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "externalNotificationConfig",
  "action": "delete",
  "appVersion": "Version",
  "rowCount": 1,
  "externalNotificationConfig": { "id": "ID", "isActive": false }
}
```

### Route: listExternalNotificationConfigs

_Route Definition_ : List notification/publishing connections (filter by provider/type/status).

_Route Type_ : getList

_Default access route_ : _GET_ `/externalnotificationconfigs`

The listExternalNotificationConfigs api has got no parameters.

To access the api you can use the **REST** controller with the path **GET /externalnotificationconfigs**

```js
axios({
  method: "GET",
  url: "/externalnotificationconfigs",
  data: {},
  params: {},
});
```

The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, getlist, update, or delete requests, and 201 for create requests. Each successful response includes a `"status": "OK"` property. For error handling, refer to the "Error Response" section.

Following JSON represents the most comprehensive form of the **`externalNotificationConfigs`** object in the respones. However, some properties may be omitted based on the object's internal logic.

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "externalNotificationConfigs",
  "action": "getList",
  "appVersion": "Version",
  "rowCount": "\"Number\"",
  "externalNotificationConfigs": [{ "id": "ID", "isActive": true }, {}, {}],
  "paging": {
    "pageNumber": "Number",
    "pageRowCount": "NUmber",
    "totalRowCount": "Number",
    "pageCount": "Number"
  },
  "filters": [],
  "uiPermissions": []
}
```

### Route: getSystemBackupAudit

_Route Definition_ : Fetch system backup/restore audit job by ID.

_Route Type_ : get

_Default access route_ : _GET_ `/systembackupaudits/:systemBackupAuditId`

#### Parameters

The getSystemBackupAudit api has got 1 parameter

| Parameter           | Type | Required | Population                          |
| ------------------- | ---- | -------- | ----------------------------------- |
| systemBackupAuditId | ID   | true     | request.params?.systemBackupAuditId |

To access the api you can use the **REST** controller with the path **GET /systembackupaudits/:systemBackupAuditId**

```js
axios({
  method: "GET",
  url: `/systembackupaudits/${systemBackupAuditId}`,
  data: {},
  params: {},
});
```

The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, getlist, update, or delete requests, and 201 for create requests. Each successful response includes a `"status": "OK"` property. For error handling, refer to the "Error Response" section.

Following JSON represents the most comprehensive form of the **`systemBackupAudit`** object in the respones. However, some properties may be omitted based on the object's internal logic.

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "systemBackupAudit",
  "action": "get",
  "appVersion": "Version",
  "rowCount": 1,
  "systemBackupAudit": { "id": "ID", "isActive": true }
}
```

### Route: createSystemBackupAudit

_Route Definition_ : Create system backup/restore or data operation job audit entry.

_Route Type_ : create

_Default access route_ : _POST_ `/systembackupaudits`

#### Parameters

The createSystemBackupAudit api has got 4 parameters

| Parameter     | Type   | Required | Population                  |
| ------------- | ------ | -------- | --------------------------- |
| type          | Enum   | true     | request.body?.type          |
| config        | Object | true     | request.body?.config        |
| status        | Enum   | true     | request.body?.status        |
| resultDetails | Object | false    | request.body?.resultDetails |

To access the api you can use the **REST** controller with the path **POST /systembackupaudits**

```js
axios({
  method: "POST",
  url: "/systembackupaudits",
  data: {
    type: "Enum",
    config: "Object",
    status: "Enum",
    resultDetails: "Object",
  },
  params: {},
});
```

The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, getlist, update, or delete requests, and 201 for create requests. Each successful response includes a `"status": "OK"` property. For error handling, refer to the "Error Response" section.

Following JSON represents the most comprehensive form of the **`systemBackupAudit`** object in the respones. However, some properties may be omitted based on the object's internal logic.

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "systemBackupAudit",
  "action": "create",
  "appVersion": "Version",
  "rowCount": 1,
  "systemBackupAudit": { "id": "ID", "isActive": true }
}
```

### Route: updateSystemBackupAudit

_Route Definition_ : Update status/result for audit backup/restore job.

_Route Type_ : update

_Default access route_ : _PATCH_ `/systembackupaudits/:systemBackupAuditId`

#### Parameters

The updateSystemBackupAudit api has got 5 parameters

| Parameter           | Type   | Required | Population                          |
| ------------------- | ------ | -------- | ----------------------------------- |
| systemBackupAuditId | ID     | true     | request.params?.systemBackupAuditId |
| type                | Enum   | true     | request.body?.type                  |
| config              | Object | false    | request.body?.config                |
| status              | Enum   | true     | request.body?.status                |
| resultDetails       | Object | false    | request.body?.resultDetails         |

To access the api you can use the **REST** controller with the path **PATCH /systembackupaudits/:systemBackupAuditId**

```js
axios({
  method: "PATCH",
  url: `/systembackupaudits/${systemBackupAuditId}`,
  data: {
    type: "Enum",
    config: "Object",
    status: "Enum",
    resultDetails: "Object",
  },
  params: {},
});
```

The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, getlist, update, or delete requests, and 201 for create requests. Each successful response includes a `"status": "OK"` property. For error handling, refer to the "Error Response" section.

Following JSON represents the most comprehensive form of the **`systemBackupAudit`** object in the respones. However, some properties may be omitted based on the object's internal logic.

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "systemBackupAudit",
  "action": "update",
  "appVersion": "Version",
  "rowCount": 1,
  "systemBackupAudit": { "id": "ID", "isActive": true }
}
```

### Route: deleteSystemBackupAudit

_Route Definition_ : Archive, close, or delete a backup/restore operation audit record (soft delete).

_Route Type_ : delete

_Default access route_ : _DELETE_ `/systembackupaudits/:systemBackupAuditId`

#### Parameters

The deleteSystemBackupAudit api has got 1 parameter

| Parameter           | Type | Required | Population                          |
| ------------------- | ---- | -------- | ----------------------------------- |
| systemBackupAuditId | ID   | true     | request.params?.systemBackupAuditId |

To access the api you can use the **REST** controller with the path **DELETE /systembackupaudits/:systemBackupAuditId**

```js
axios({
  method: "DELETE",
  url: `/systembackupaudits/${systemBackupAuditId}`,
  data: {},
  params: {},
});
```

The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, getlist, update, or delete requests, and 201 for create requests. Each successful response includes a `"status": "OK"` property. For error handling, refer to the "Error Response" section.

Following JSON represents the most comprehensive form of the **`systemBackupAudit`** object in the respones. However, some properties may be omitted based on the object's internal logic.

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "systemBackupAudit",
  "action": "delete",
  "appVersion": "Version",
  "rowCount": 1,
  "systemBackupAudit": { "id": "ID", "isActive": false }
}
```

### Route: listSystemBackupAudits

_Route Definition_ : List system backup, restore, or audit jobs (filter by type/status etc).

_Route Type_ : getList

_Default access route_ : _GET_ `/systembackupaudits`

The listSystemBackupAudits api has got no parameters.

To access the api you can use the **REST** controller with the path **GET /systembackupaudits**

```js
axios({
  method: "GET",
  url: "/systembackupaudits",
  data: {},
  params: {},
});
```

The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, getlist, update, or delete requests, and 201 for create requests. Each successful response includes a `"status": "OK"` property. For error handling, refer to the "Error Response" section.

Following JSON represents the most comprehensive form of the **`systemBackupAudits`** object in the respones. However, some properties may be omitted based on the object's internal logic.

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "systemBackupAudits",
  "action": "getList",
  "appVersion": "Version",
  "rowCount": "\"Number\"",
  "systemBackupAudits": [{ "id": "ID", "isActive": true }, {}, {}],
  "paging": {
    "pageNumber": "Number",
    "pageRowCount": "NUmber",
    "totalRowCount": "Number",
    "pageCount": "Number"
  },
  "filters": [],
  "uiPermissions": []
}
```

### Route: getBranchPurchaseOrder

_Route Definition_ : Fetch a library branch acquisition (purchase order) record by ID.

_Route Type_ : get

_Default access route_ : _GET_ `/branchpurchaseorders/:branchPurchaseOrderId`

#### Parameters

The getBranchPurchaseOrder api has got 1 parameter

| Parameter             | Type | Required | Population                            |
| --------------------- | ---- | -------- | ------------------------------------- |
| branchPurchaseOrderId | ID   | true     | request.params?.branchPurchaseOrderId |

To access the api you can use the **REST** controller with the path **GET /branchpurchaseorders/:branchPurchaseOrderId**

```js
axios({
  method: "GET",
  url: `/branchpurchaseorders/${branchPurchaseOrderId}`,
  data: {},
  params: {},
});
```

The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, getlist, update, or delete requests, and 201 for create requests. Each successful response includes a `"status": "OK"` property. For error handling, refer to the "Error Response" section.

Following JSON represents the most comprehensive form of the **`branchPurchaseOrder`** object in the respones. However, some properties may be omitted based on the object's internal logic.

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "branchPurchaseOrder",
  "action": "get",
  "appVersion": "Version",
  "rowCount": 1,
  "branchPurchaseOrder": { "id": "ID", "isActive": true }
}
```

### Route: createBranchPurchaseOrder

_Route Definition_ : Create a branch&#39;s requested purchase order for acquisition/procurement approval.

_Route Type_ : create

_Default access route_ : _POST_ `/branchpurchaseorders`

#### Parameters

The createBranchPurchaseOrder api has got 6 parameters

| Parameter        | Type   | Required | Population                     |
| ---------------- | ------ | -------- | ------------------------------ |
| branchId         | ID     | true     | request.body?.branchId         |
| items            | Object | true     | request.body?.items            |
| status           | Enum   | true     | request.body?.status           |
| approvedByUserId | ID     | false    | request.body?.approvedByUserId |
| approvalDate     | Date   | false    | request.body?.approvalDate     |
| note             | Text   | false    | request.body?.note             |

To access the api you can use the **REST** controller with the path **POST /branchpurchaseorders**

```js
axios({
  method: "POST",
  url: "/branchpurchaseorders",
  data: {
    branchId: "ID",
    items: "Object",
    status: "Enum",
    approvedByUserId: "ID",
    approvalDate: "Date",
    note: "Text",
  },
  params: {},
});
```

The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, getlist, update, or delete requests, and 201 for create requests. Each successful response includes a `"status": "OK"` property. For error handling, refer to the "Error Response" section.

Following JSON represents the most comprehensive form of the **`branchPurchaseOrder`** object in the respones. However, some properties may be omitted based on the object's internal logic.

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "branchPurchaseOrder",
  "action": "create",
  "appVersion": "Version",
  "rowCount": 1,
  "branchPurchaseOrder": { "id": "ID", "isActive": true }
}
```

### Route: updateBranchPurchaseOrder

_Route Definition_ : Approve, reject, or update status/details of branch acquisition request.

_Route Type_ : update

_Default access route_ : _PATCH_ `/branchpurchaseorders/:branchPurchaseOrderId`

#### Parameters

The updateBranchPurchaseOrder api has got 6 parameters

| Parameter             | Type   | Required | Population                            |
| --------------------- | ------ | -------- | ------------------------------------- |
| branchPurchaseOrderId | ID     | true     | request.params?.branchPurchaseOrderId |
| items                 | Object | false    | request.body?.items                   |
| status                | Enum   | true     | request.body?.status                  |
| approvedByUserId      | ID     | false    | request.body?.approvedByUserId        |
| approvalDate          | Date   | false    | request.body?.approvalDate            |
| note                  | Text   | false    | request.body?.note                    |

To access the api you can use the **REST** controller with the path **PATCH /branchpurchaseorders/:branchPurchaseOrderId**

```js
axios({
  method: "PATCH",
  url: `/branchpurchaseorders/${branchPurchaseOrderId}`,
  data: {
    items: "Object",
    status: "Enum",
    approvedByUserId: "ID",
    approvalDate: "Date",
    note: "Text",
  },
  params: {},
});
```

The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, getlist, update, or delete requests, and 201 for create requests. Each successful response includes a `"status": "OK"` property. For error handling, refer to the "Error Response" section.

Following JSON represents the most comprehensive form of the **`branchPurchaseOrder`** object in the respones. However, some properties may be omitted based on the object's internal logic.

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "branchPurchaseOrder",
  "action": "update",
  "appVersion": "Version",
  "rowCount": 1,
  "branchPurchaseOrder": { "id": "ID", "isActive": true }
}
```

### Route: deleteBranchPurchaseOrder

_Route Definition_ : Cancel or archive acquisition purchase order (soft delete).

_Route Type_ : delete

_Default access route_ : _DELETE_ `/branchpurchaseorders/:branchPurchaseOrderId`

#### Parameters

The deleteBranchPurchaseOrder api has got 1 parameter

| Parameter             | Type | Required | Population                            |
| --------------------- | ---- | -------- | ------------------------------------- |
| branchPurchaseOrderId | ID   | true     | request.params?.branchPurchaseOrderId |

To access the api you can use the **REST** controller with the path **DELETE /branchpurchaseorders/:branchPurchaseOrderId**

```js
axios({
  method: "DELETE",
  url: `/branchpurchaseorders/${branchPurchaseOrderId}`,
  data: {},
  params: {},
});
```

The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, getlist, update, or delete requests, and 201 for create requests. Each successful response includes a `"status": "OK"` property. For error handling, refer to the "Error Response" section.

Following JSON represents the most comprehensive form of the **`branchPurchaseOrder`** object in the respones. However, some properties may be omitted based on the object's internal logic.

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "branchPurchaseOrder",
  "action": "delete",
  "appVersion": "Version",
  "rowCount": 1,
  "branchPurchaseOrder": { "id": "ID", "isActive": false }
}
```

### Route: listBranchPurchaseOrders

_Route Definition_ : List branch procurement/acquisition purchase orders (filter by status/branch/approval etc).

_Route Type_ : getList

_Default access route_ : _GET_ `/branchpurchaseorders`

The listBranchPurchaseOrders api has got no parameters.

To access the api you can use the **REST** controller with the path **GET /branchpurchaseorders**

```js
axios({
  method: "GET",
  url: "/branchpurchaseorders",
  data: {},
  params: {},
});
```

The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, getlist, update, or delete requests, and 201 for create requests. Each successful response includes a `"status": "OK"` property. For error handling, refer to the "Error Response" section.

Following JSON represents the most comprehensive form of the **`branchPurchaseOrders`** object in the respones. However, some properties may be omitted based on the object's internal logic.

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "branchPurchaseOrders",
  "action": "getList",
  "appVersion": "Version",
  "rowCount": "\"Number\"",
  "branchPurchaseOrders": [{ "id": "ID", "isActive": true }, {}, {}],
  "paging": {
    "pageNumber": "Number",
    "pageRowCount": "NUmber",
    "totalRowCount": "Number",
    "pageCount": "Number"
  },
  "filters": [],
  "uiPermissions": []
}
```

### Authentication Specific Routes

### Common Routes

### Route: currentuser

_Route Definition_: Retrieves the currently authenticated user's session information.

_Route Type_: sessionInfo

_Access Route_: `GET /currentuser`

#### Parameters

This route does **not** require any request parameters.

#### Behavior

- Returns the authenticated session object associated with the current access token.
- If no valid session exists, responds with a 401 Unauthorized.

```js
// Sample GET /currentuser call
axios.get("/currentuser", {
  headers: {
    Authorization: "Bearer your-jwt-token",
  },
});
```

**Success Response**
Returns the session object, including user-related data and token information.

```
{
  "sessionId": "9cf23fa8-07d4-4e7c-80a6-ec6d6ac96bb9",
  "userId": "d92b9d4c-9b1e-4e95-842e-3fb9c8c1df38",
  "email": "user@example.com",
  "fullname": "John Doe",
  "roleId": "user",
  "tenantId": "abc123",
  "accessToken": "jwt-token-string",
  ...
}
```

**Error Response**
**401 Unauthorized:** No active session found.

```
{
  "status": "ERR",
  "message": "No login found"
}
```

**Notes**

- This route is typically used by frontend or mobile applications to fetch the current session state after login.
- The returned session includes key user identity fields, tenant information (if applicable), and the access token for further authenticated requests.
- Always ensure a valid access token is provided in the request to retrieve the session.

### Route: permissions

`*Route Definition*`: Retrieves all effective permission records assigned to the currently authenticated user.

`*Route Type*`: permissionFetch

_Access Route_: `GET /permissions`

#### Parameters

This route does **not** require any request parameters.

#### Behavior

- Fetches all active permission records (`givenPermissions` entries) associated with the current user session.
- Returns a full array of permission objects.
- Requires a valid session (`access token`) to be available.

```js
// Sample GET /permissions call
axios.get("/permissions", {
  headers: {
    Authorization: "Bearer your-jwt-token",
  },
});
```

**Success Response**

Returns an array of permission objects.

```json
[
  {
    "id": "perm1",
    "permissionName": "adminPanel.access",
    "roleId": "admin",
    "subjectUserId": "d92b9d4c-9b1e-4e95-842e-3fb9c8c1df38",
    "subjectUserGroupId": null,
    "objectId": null,
    "canDo": true,
    "tenantCodename": "store123"
  },
  {
    "id": "perm2",
    "permissionName": "orders.manage",
    "roleId": null,
    "subjectUserId": "d92b9d4c-9b1e-4e95-842e-3fb9c8c1df38",
    "subjectUserGroupId": null,
    "objectId": null,
    "canDo": true,
    "tenantCodename": "store123"
  }
]
```

Each object reflects a single permission grant, aligned with the givenPermissions model:

- `**permissionName**`: The permission the user has.
- `**roleId**`: If the permission was granted through a role. -` **subjectUserId**`: If directly granted to the user.
- `**subjectUserGroupId**`: If granted through a group.
- `**objectId**`: If tied to a specific object (OBAC).
- `**canDo**`: True or false flag to represent if permission is active or restricted.

**Error Responses**

- **401 Unauthorized**: No active session found.

```json
{
  "status": "ERR",
  "message": "No login found"
}
```

- **500 Internal Server Error**: Unexpected error fetching permissions.

**Notes**

- The /permissions route is available across all backend services generated by Mindbricks, not just the auth service.
- Auth service: Fetches permissions freshly from the live database (givenPermissions table).
- Other services: Typically use a cached or projected view of permissions stored in a common ElasticSearch store, optimized for faster authorization checks.

> **Tip**:
> Applications can cache permission results client-side or server-side, but should occasionally refresh by calling this endpoint, especially after login or permission-changing operations.

### Route: permissions/:permissionName

_Route Definition_: Checks whether the current user has access to a specific permission, and provides a list of scoped object exceptions or inclusions.

_Route Type_: permissionScopeCheck

_Access Route_: `GET /permissions/:permissionName`

#### Parameters

| Parameter      | Type   | Required | Population                      |
| -------------- | ------ | -------- | ------------------------------- |
| permissionName | String | Yes      | `request.params.permissionName` |

#### Behavior

- Evaluates whether the current user **has access** to the given `permissionName`.
- Returns a structured object indicating:
  - Whether the permission is generally granted (`canDo`)
  - Which object IDs are explicitly included or excluded from access (`exceptions`)
- Requires a valid session (`access token`).

```js
// Sample GET /permissions/orders.manage
axios.get("/permissions/orders.manage", {
  headers: {
    Authorization: "Bearer your-jwt-token",
  },
});
```

**Success Response**

```json
{
  "canDo": true,
  "exceptions": [
    "a1f2e3d4-xxxx-yyyy-zzzz-object1",
    "b2c3d4e5-xxxx-yyyy-zzzz-object2"
  ]
}
```

- If `canDo` is `true`, the user generally has the permission, but not for the objects listed in `exceptions` (i.e., restrictions).
- If `canDo` is `false`, the user does not have the permission by default — but only for the objects in `exceptions`, they do have permission (i.e., selective overrides).
- The exceptions array contains valid **UUID strings**, each corresponding to an object ID (typically from the data model targeted by the permission).

## Copyright

All sources, documents and other digital materials are copyright of .

## About Us

For more information please visit our website: .

.
.

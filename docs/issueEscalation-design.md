# Service Design Specification - Object Design for issueEscalation

**librarymanagementsystem-adminops-service** documentation

## Document Overview

This document outlines the object design for the `issueEscalation` model in our application. It includes details about the model's attributes, relationships, and any specific validation or business logic that applies.

## issueEscalation Data Object

### Object Overview

**Description:** Logs and manages member or staff issues escalated for resolution at the branch/administrative level. Tracks status, assignment(s), escalation reason, actions, and involved parties.

This object represents a core data structure within the service and acts as the blueprint for database interaction, API generation, and business logic enforcement.
It is defined using the `ObjectSettings` pattern, which governs its behavior, access control, caching strategy, and integration points with other systems such as Stripe and Redis.

### Core Configuration

- **Soft Delete:** Enabled — Determines whether records are marked inactive (`isActive = false`) instead of being physically deleted.
- **Public Access:** No — If enabled, anonymous users may access this object’s data depending on route-level rules.

### Properties Schema

| Property           | Type   | Required | Description                                                                                                               |
| ------------------ | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------- |
| `branchId`         | ID     | Yes      | Branch related to issue; for escalation routing and reporting.                                                            |
| `raisedByUserId`   | ID     | Yes      | User/member/staff who raised the issue.                                                                                   |
| `assignedToUserId` | ID     | No       | User assigned to handle the escalation/issue (e.g., branch manager/staff/other admin).                                    |
| `status`           | Enum   | Yes      | Escalation status: 0=open, 1=assigned, 2=inProgress, 3=resolved, 4=closed, 5=canceled                                     |
| `escalationType`   | Enum   | Yes      | Type of issue: 0=service, 1=memberComplaint, 2=facility, 3=system, 4=other                                                |
| `description`      | Text   | Yes      | Issue/escalation description/details.                                                                                     |
| `log`              | Object | No       | Chronological event log (assignments, status updates, notes) for escalation. Format: [{timestamp, userId, action, note}]. |

- Required properties are mandatory for creating objects and must be provided in the request body if no default value is set.

### Array Properties

`log`

Array properties can hold multiple values and are indicated by the `[]` suffix in their type. Avoid using arrays in properties that are used for relations, as they will not work correctly.
Note that using connection objects instead of arrays is recommended for relations, as they provide better performance and flexibility.

### Default Values

Default values are automatically assigned to properties when a new object is created, if no value is provided in the request body.
Since default values are applied on db level, they should be literal values, not expressions.If you want to use expressions, you can use transposed parameters in any crud route to set default values dynamically.

- **escalationType**: 4

### Constant Properties

`raisedByUserId`

Constant properties are defined to be immutable after creation, meaning they cannot be updated or changed once set. They are typically used for properties that should remain constant throughout the object's lifecycle.
A property is set to be constant if the `Allow Update` option is set to `false`.

### Auto Update Properties

`branchId` `assignedToUserId` `status` `escalationType` `description` `log`

An update crud route created with the option `Auto Params` enabled will automatically update these properties with the provided values in the request body.
If you want to update any property in your own business logic not by user input, you can set the `Allow Auto Update` option to false.
These properties will be added to the update route's body parameters and can be updated by the user if any value is provided in the request body.

### Enum Properties

Enum properties are defined with a set of allowed values, ensuring that only valid options can be assigned to them.
The enum options value will be stored as strings in the database,
but when a data object is created an addtional property with the same name plus an idx suffix will be created, which will hold the index of the selected enum option.
You can use the index property to sort by the enum value or when your enum options represent a sequence of values.

- **status**: [open, assigned, inProgress, resolved, closed, canceled]

- **escalationType**: [service, memberComplaint, facility, system, other]

### Elastic Search Indexing

`branchId` `status` `escalationType`

Properties that are indexed in Elastic Search will be searchable via the Elastic Search API.
While all properties are stored in the elastic search index of the data object, only those marked for Elastic Search indexing will be available for search queries.

### Database Indexing

`branchId`

Properties that are indexed in the database will be optimized for query performance, allowing for faster data retrieval.
Make a property indexed in the database if you want to use it frequently in query filters or sorting.

### Relation Properties

`branchId` `raisedByUserId` `assignedToUserId`

Mindbricks supports relations between data objects, allowing you to define how objects are linked together.
You can define relations in the data object properties, which will be used to create foreign key constraints in the database.
For complex joins operations, Mindbricks supportsa BFF pattern, where you can view dynamic and static views based on Elastic Search Indexes.
Use db level relations for simple one-to-one or one-to-many relationships, and use BFF views for complex joins that require multiple data objects to be joined together.

- **branchId**: ID
  Relation to `branch`.id

The target object is a parent object, meaning that the relation is a one-to-many relationship from target to this object.

On Delete: Set Null
Required: Yes

- **raisedByUserId**: ID
  Relation to `user`.id

The target object is a sibling object, meaning that the relation is a many-to-one or one-to-one relationship from this object to the target.

On Delete: Set Null
Required: No

- **assignedToUserId**: ID
  Relation to `user`.id

The target object is a sibling object, meaning that the relation is a many-to-one or one-to-one relationship from this object to the target.

On Delete: Set Null
Required: No

### Session Data Properties

`raisedByUserId`

Session data properties are used to store data that is specific to the user session, allowing for personalized experiences and temporary data storage.
If a property is configured as session data, it will be automatically mapped to the related field in the user session during CRUD operations.
Note that session data properties can not be mutated by the user, but only by the system.

- **raisedByUserId**: ID property will be mapped to the session parameter `userId`.

### Filter Properties

`branchId` `assignedToUserId` `status` `escalationType`

Filter properties are used to define parameters that can be used in query filters, allowing for dynamic data retrieval based on user input or predefined criteria.
These properties are automatically mapped as route parameters in the listing CRUD routes that have "Auto Params" enabled.

- **branchId**: ID has a filter named `branchId`

- **assignedToUserId**: ID has a filter named `assignedToUserId`

- **status**: Enum has a filter named `status`

- **escalationType**: Enum has a filter named `escalationType`

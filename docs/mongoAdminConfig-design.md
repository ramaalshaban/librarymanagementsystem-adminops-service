# Service Design Specification - Object Design for mongoAdminConfig

**librarymanagementsystem-adminops-service** documentation

## Document Overview

This document outlines the object design for the `mongoAdminConfig` model in our application. It includes details about the model's attributes, relationships, and any specific validation or business logic that applies.

## mongoAdminConfig Data Object

### Object Overview

**Description:** Represents advanced MongoDB configuration for admin (index settings, transaction rules, aggregation pipeline definitions, etc). Used for diagnostic and admin UX only.

This object represents a core data structure within the service and acts as the blueprint for database interaction, API generation, and business logic enforcement.
It is defined using the `ObjectSettings` pattern, which governs its behavior, access control, caching strategy, and integration points with other systems such as Stripe and Redis.

### Core Configuration

- **Soft Delete:** Enabled — Determines whether records are marked inactive (`isActive = false`) instead of being physically deleted.
- **Public Access:** No — If enabled, anonymous users may access this object’s data depending on route-level rules.

### Properties Schema

| Property        | Type   | Required | Description                                                                                                         |
| --------------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------- |
| `configType`    | Enum   | Yes      | Type of MongoDB config: 0=index, 1=aggregation, 2=transaction, 3=replication, 4=archive, 5=other                    |
| `targetObject`  | String | Yes      | The data object or collection being configured (e.g., book, loan, review, branch, all, etc).                        |
| `configDetails` | Object | Yes      | Flexible admin-supplied object describing config schema (JSON definition for index, aggregation, transaction, etc). |
| `status`        | Enum   | Yes      | Config status: 0=active, 1=inactive, 2=archived, 3=scheduled, 4=error                                               |

- Required properties are mandatory for creating objects and must be provided in the request body if no default value is set.

### Default Values

Default values are automatically assigned to properties when a new object is created, if no value is provided in the request body.
Since default values are applied on db level, they should be literal values, not expressions.If you want to use expressions, you can use transposed parameters in any crud route to set default values dynamically.

- **configType**: 5

### Auto Update Properties

`configType` `targetObject` `configDetails` `status`

An update crud route created with the option `Auto Params` enabled will automatically update these properties with the provided values in the request body.
If you want to update any property in your own business logic not by user input, you can set the `Allow Auto Update` option to false.
These properties will be added to the update route's body parameters and can be updated by the user if any value is provided in the request body.

### Enum Properties

Enum properties are defined with a set of allowed values, ensuring that only valid options can be assigned to them.
The enum options value will be stored as strings in the database,
but when a data object is created an addtional property with the same name plus an idx suffix will be created, which will hold the index of the selected enum option.
You can use the index property to sort by the enum value or when your enum options represent a sequence of values.

- **configType**: [index, aggregation, transaction, replication, archive, other]

- **status**: [active, inactive, archived, scheduled, error]

### Elastic Search Indexing

`configType` `targetObject` `status`

Properties that are indexed in Elastic Search will be searchable via the Elastic Search API.
While all properties are stored in the elastic search index of the data object, only those marked for Elastic Search indexing will be available for search queries.

### Filter Properties

`configType` `targetObject` `status`

Filter properties are used to define parameters that can be used in query filters, allowing for dynamic data retrieval based on user input or predefined criteria.
These properties are automatically mapped as route parameters in the listing CRUD routes that have "Auto Params" enabled.

- **configType**: Enum has a filter named `configType`

- **targetObject**: String has a filter named `targetObject`

- **status**: Enum has a filter named `status`

# Service Design Specification - Object Design for externalNotificationConfig

**librarymanagementsystem-adminops-service** documentation

## Document Overview

This document outlines the object design for the `externalNotificationConfig` model in our application. It includes details about the model's attributes, relationships, and any specific validation or business logic that applies.

## externalNotificationConfig Data Object

### Object Overview

**Description:** Connection/config object for external notification or publishing service integration (e.g. email, SMS, push, webhook, etc). Contains host, secrets, settings per method.

This object represents a core data structure within the service and acts as the blueprint for database interaction, API generation, and business logic enforcement.
It is defined using the `ObjectSettings` pattern, which governs its behavior, access control, caching strategy, and integration points with other systems such as Stripe and Redis.

### Core Configuration

- **Soft Delete:** Enabled — Determines whether records are marked inactive (`isActive = false`) instead of being physically deleted.
- **Public Access:** No — If enabled, anonymous users may access this object’s data depending on route-level rules.

### Properties Schema

| Property       | Type   | Required | Description                                                                                                         |
| -------------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------- |
| `providerType` | Enum   | Yes      | Type of notification/publishing provider: 0=email, 1=SMS, 2=push, 3=webhook, 4=other                                |
| `name`         | String | Yes      | Friendly display name for this config/connection.                                                                   |
| `settings`     | Object | Yes      | Connection and credential object for this notification method: host, keyId, secret, endpoint, params, per provider. |
| `status`       | Enum   | Yes      | Connection/config status: 0=enabled, 1=disabled, 2=pendingVerification, 3=error                                     |

- Required properties are mandatory for creating objects and must be provided in the request body if no default value is set.

### Auto Update Properties

`providerType` `name` `settings` `status`

An update crud route created with the option `Auto Params` enabled will automatically update these properties with the provided values in the request body.
If you want to update any property in your own business logic not by user input, you can set the `Allow Auto Update` option to false.
These properties will be added to the update route's body parameters and can be updated by the user if any value is provided in the request body.

### Enum Properties

Enum properties are defined with a set of allowed values, ensuring that only valid options can be assigned to them.
The enum options value will be stored as strings in the database,
but when a data object is created an addtional property with the same name plus an idx suffix will be created, which will hold the index of the selected enum option.
You can use the index property to sort by the enum value or when your enum options represent a sequence of values.

- **providerType**: [email, sms, push, webhook, other]

- **status**: [enabled, disabled, pendingVerification, error]

### Elastic Search Indexing

`providerType` `name` `status`

Properties that are indexed in Elastic Search will be searchable via the Elastic Search API.
While all properties are stored in the elastic search index of the data object, only those marked for Elastic Search indexing will be available for search queries.

### Filter Properties

`providerType` `name` `status`

Filter properties are used to define parameters that can be used in query filters, allowing for dynamic data retrieval based on user input or predefined criteria.
These properties are automatically mapped as route parameters in the listing CRUD routes that have "Auto Params" enabled.

- **providerType**: Enum has a filter named `providerType`

- **name**: String has a filter named `name`

- **status**: Enum has a filter named `status`

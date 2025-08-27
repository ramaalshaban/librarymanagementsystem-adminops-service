# EVENT GUIDE

## librarymanagementsystem-adminops-service

Handles operational and administrative workflows for library staff and administrators, including branch staff account management, issue escalation/resolution, advanced MongoDB configuration, external notification platform integration settings, system backup/restore/disaster recovery audit, and procurement/acquisition approval for library branches.

## Architectural Design Credit and Contact Information

The architectural design of this microservice is credited to . For inquiries, feedback, or further information regarding the architecture, please direct your communication to:

Email:

We encourage open communication and welcome any questions or discussions related to the architectural aspects of this microservice.

# Documentation Scope

Welcome to the official documentation for the `AdminOps` Service Event descriptions. This guide is dedicated to detailing how to subscribe to and listen for state changes within the `AdminOps` Service, offering an exclusive focus on event subscription mechanisms.

**Intended Audience**

This documentation is aimed at developers and integrators looking to monitor `AdminOps` Service state changes. It is especially relevant for those wishing to implement or enhance business logic based on interactions with `AdminOps` objects.

**Overview**

This section provides detailed instructions on monitoring service events, covering payload structures and demonstrating typical use cases through examples.

# Authentication and Authorization

Access to the `AdminOps` service's events is facilitated through the project's Kafka server, which is not accessible to the public. Subscription to a Kafka topic requires being on the same network and possessing valid Kafka user credentials. This document presupposes that readers have existing access to the Kafka server.

Additionally, the service offers a public subscription option via REST for real-time data management in frontend applications, secured through REST API authentication and authorization mechanisms. To subscribe to service events via the REST API, please consult the Realtime REST API Guide.

# Database Events

Database events are triggered at the database layer, automatically and atomically, in response to any modifications at the data level. These events serve to notify subscribers about the creation, update, or deletion of objects within the database, distinct from any overarching business logic.

Listening to database events is particularly beneficial for those focused on tracking changes at the database level. A typical use case for subscribing to database events is to replicate the data store of one service within another service's scope, ensuring data consistency and syncronization across services.

For example, while a business operation such as "approve membership" might generate a high-level business event like `membership-approved`, the underlying database changes could involve multiple state updates to different entities. These might be published as separate events, such as `dbevent-member-updated` and `dbevent-user-updated`, reflecting the granular changes at the database level.

Such detailed eventing provides a robust foundation for building responsive, data-driven applications, enabling fine-grained observability and reaction to the dynamics of the data landscape. It also facilitates the architectural pattern of event sourcing, where state changes are captured as a sequence of events, allowing for high-fidelity data replication and history replay for analytical or auditing purposes.

## DbEvent branchStaffAssignment-created

**Event topic**: `librarymanagementsystem-adminops-service-dbevent-branchstaffassignment-created`

This event is triggered upon the creation of a `branchStaffAssignment` data object in the database. The event payload encompasses the newly created data, encapsulated within the root of the paylod.

**Event payload**:

```json
{
  "id": "ID",
  "_owner": "ID",
  "branchId": "ID",
  "userId": "ID",
  "role": "Enum",
  "role_": "String",
  "assignedByUserId": "ID",
  "isActive": true,
  "recordVersion": "Integer",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## DbEvent branchStaffAssignment-updated

**Event topic**: `librarymanagementsystem-adminops-service-dbevent-branchstaffassignment-updated`

Activation of this event follows the update of a `branchStaffAssignment` data object. The payload contains the updated information under the `branchStaffAssignment` attribute, along with the original data prior to update, labeled as `old_branchStaffAssignment`.

**Event payload**:

```json
{
  "old_branchStaffAssignment": {
    "id": "ID",
    "_owner": "ID",
    "branchId": "ID",
    "userId": "ID",
    "role": "Enum",
    "role_": "String",
    "assignedByUserId": "ID",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  },
  "branchStaffAssignment": {
    "id": "ID",
    "_owner": "ID",
    "branchId": "ID",
    "userId": "ID",
    "role": "Enum",
    "role_": "String",
    "assignedByUserId": "ID",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

## DbEvent branchStaffAssignment-deleted

**Event topic**: `librarymanagementsystem-adminops-service-dbevent-branchstaffassignment-deleted`

This event announces the deletion of a `branchStaffAssignment` data object, covering both hard deletions (permanent removal) and soft deletions (where the `isActive` attribute is set to false). Regardless of the deletion type, the event payload will present the data as it was immediately before deletion, highlighting an `isActive` status of false for soft deletions.

**Event payload**:

```json
{
  "id": "ID",
  "_owner": "ID",
  "branchId": "ID",
  "userId": "ID",
  "role": "Enum",
  "role_": "String",
  "assignedByUserId": "ID",
  "isActive": false,
  "recordVersion": "Integer",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## DbEvent issueEscalation-created

**Event topic**: `librarymanagementsystem-adminops-service-dbevent-issueescalation-created`

This event is triggered upon the creation of a `issueEscalation` data object in the database. The event payload encompasses the newly created data, encapsulated within the root of the paylod.

**Event payload**:

```json
{
  "id": "ID",
  "_owner": "ID",
  "branchId": "ID",
  "raisedByUserId": "ID",
  "assignedToUserId": "ID",
  "status": "Enum",
  "status_": "String",
  "escalationType": "Enum",
  "escalationType_": "String",
  "description": "Text",
  "log": "Object",
  "isActive": true,
  "recordVersion": "Integer",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## DbEvent issueEscalation-updated

**Event topic**: `librarymanagementsystem-adminops-service-dbevent-issueescalation-updated`

Activation of this event follows the update of a `issueEscalation` data object. The payload contains the updated information under the `issueEscalation` attribute, along with the original data prior to update, labeled as `old_issueEscalation`.

**Event payload**:

```json
{
  "old_issueEscalation": {
    "id": "ID",
    "_owner": "ID",
    "branchId": "ID",
    "raisedByUserId": "ID",
    "assignedToUserId": "ID",
    "status": "Enum",
    "status_": "String",
    "escalationType": "Enum",
    "escalationType_": "String",
    "description": "Text",
    "log": "Object",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  },
  "issueEscalation": {
    "id": "ID",
    "_owner": "ID",
    "branchId": "ID",
    "raisedByUserId": "ID",
    "assignedToUserId": "ID",
    "status": "Enum",
    "status_": "String",
    "escalationType": "Enum",
    "escalationType_": "String",
    "description": "Text",
    "log": "Object",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

## DbEvent issueEscalation-deleted

**Event topic**: `librarymanagementsystem-adminops-service-dbevent-issueescalation-deleted`

This event announces the deletion of a `issueEscalation` data object, covering both hard deletions (permanent removal) and soft deletions (where the `isActive` attribute is set to false). Regardless of the deletion type, the event payload will present the data as it was immediately before deletion, highlighting an `isActive` status of false for soft deletions.

**Event payload**:

```json
{
  "id": "ID",
  "_owner": "ID",
  "branchId": "ID",
  "raisedByUserId": "ID",
  "assignedToUserId": "ID",
  "status": "Enum",
  "status_": "String",
  "escalationType": "Enum",
  "escalationType_": "String",
  "description": "Text",
  "log": "Object",
  "isActive": false,
  "recordVersion": "Integer",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## DbEvent mongoAdminConfig-created

**Event topic**: `librarymanagementsystem-adminops-service-dbevent-mongoadminconfig-created`

This event is triggered upon the creation of a `mongoAdminConfig` data object in the database. The event payload encompasses the newly created data, encapsulated within the root of the paylod.

**Event payload**:

```json
{
  "id": "ID",
  "_owner": "ID",
  "configType": "Enum",
  "configType_": "String",
  "targetObject": "String",
  "configDetails": "Object",
  "status": "Enum",
  "status_": "String",
  "isActive": true,
  "recordVersion": "Integer",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## DbEvent mongoAdminConfig-updated

**Event topic**: `librarymanagementsystem-adminops-service-dbevent-mongoadminconfig-updated`

Activation of this event follows the update of a `mongoAdminConfig` data object. The payload contains the updated information under the `mongoAdminConfig` attribute, along with the original data prior to update, labeled as `old_mongoAdminConfig`.

**Event payload**:

```json
{
  "old_mongoAdminConfig": {
    "id": "ID",
    "_owner": "ID",
    "configType": "Enum",
    "configType_": "String",
    "targetObject": "String",
    "configDetails": "Object",
    "status": "Enum",
    "status_": "String",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  },
  "mongoAdminConfig": {
    "id": "ID",
    "_owner": "ID",
    "configType": "Enum",
    "configType_": "String",
    "targetObject": "String",
    "configDetails": "Object",
    "status": "Enum",
    "status_": "String",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

## DbEvent mongoAdminConfig-deleted

**Event topic**: `librarymanagementsystem-adminops-service-dbevent-mongoadminconfig-deleted`

This event announces the deletion of a `mongoAdminConfig` data object, covering both hard deletions (permanent removal) and soft deletions (where the `isActive` attribute is set to false). Regardless of the deletion type, the event payload will present the data as it was immediately before deletion, highlighting an `isActive` status of false for soft deletions.

**Event payload**:

```json
{
  "id": "ID",
  "_owner": "ID",
  "configType": "Enum",
  "configType_": "String",
  "targetObject": "String",
  "configDetails": "Object",
  "status": "Enum",
  "status_": "String",
  "isActive": false,
  "recordVersion": "Integer",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## DbEvent externalNotificationConfig-created

**Event topic**: `librarymanagementsystem-adminops-service-dbevent-externalnotificationconfig-created`

This event is triggered upon the creation of a `externalNotificationConfig` data object in the database. The event payload encompasses the newly created data, encapsulated within the root of the paylod.

**Event payload**:

```json
{
  "id": "ID",
  "_owner": "ID",
  "providerType": "Enum",
  "providerType_": "String",
  "name": "String",
  "settings": "Object",
  "status": "Enum",
  "status_": "String",
  "isActive": true,
  "recordVersion": "Integer",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## DbEvent externalNotificationConfig-updated

**Event topic**: `librarymanagementsystem-adminops-service-dbevent-externalnotificationconfig-updated`

Activation of this event follows the update of a `externalNotificationConfig` data object. The payload contains the updated information under the `externalNotificationConfig` attribute, along with the original data prior to update, labeled as `old_externalNotificationConfig`.

**Event payload**:

```json
{
  "old_externalNotificationConfig": {
    "id": "ID",
    "_owner": "ID",
    "providerType": "Enum",
    "providerType_": "String",
    "name": "String",
    "settings": "Object",
    "status": "Enum",
    "status_": "String",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  },
  "externalNotificationConfig": {
    "id": "ID",
    "_owner": "ID",
    "providerType": "Enum",
    "providerType_": "String",
    "name": "String",
    "settings": "Object",
    "status": "Enum",
    "status_": "String",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

## DbEvent externalNotificationConfig-deleted

**Event topic**: `librarymanagementsystem-adminops-service-dbevent-externalnotificationconfig-deleted`

This event announces the deletion of a `externalNotificationConfig` data object, covering both hard deletions (permanent removal) and soft deletions (where the `isActive` attribute is set to false). Regardless of the deletion type, the event payload will present the data as it was immediately before deletion, highlighting an `isActive` status of false for soft deletions.

**Event payload**:

```json
{
  "id": "ID",
  "_owner": "ID",
  "providerType": "Enum",
  "providerType_": "String",
  "name": "String",
  "settings": "Object",
  "status": "Enum",
  "status_": "String",
  "isActive": false,
  "recordVersion": "Integer",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## DbEvent systemBackupAudit-created

**Event topic**: `librarymanagementsystem-adminops-service-dbevent-systembackupaudit-created`

This event is triggered upon the creation of a `systemBackupAudit` data object in the database. The event payload encompasses the newly created data, encapsulated within the root of the paylod.

**Event payload**:

```json
{
  "id": "ID",
  "_owner": "ID",
  "type": "Enum",
  "type_": "String",
  "config": "Object",
  "initiatedByUserId": "ID",
  "status": "Enum",
  "status_": "String",
  "resultDetails": "Object",
  "isActive": true,
  "recordVersion": "Integer",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## DbEvent systemBackupAudit-updated

**Event topic**: `librarymanagementsystem-adminops-service-dbevent-systembackupaudit-updated`

Activation of this event follows the update of a `systemBackupAudit` data object. The payload contains the updated information under the `systemBackupAudit` attribute, along with the original data prior to update, labeled as `old_systemBackupAudit`.

**Event payload**:

```json
{
  "old_systemBackupAudit": {
    "id": "ID",
    "_owner": "ID",
    "type": "Enum",
    "type_": "String",
    "config": "Object",
    "initiatedByUserId": "ID",
    "status": "Enum",
    "status_": "String",
    "resultDetails": "Object",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  },
  "systemBackupAudit": {
    "id": "ID",
    "_owner": "ID",
    "type": "Enum",
    "type_": "String",
    "config": "Object",
    "initiatedByUserId": "ID",
    "status": "Enum",
    "status_": "String",
    "resultDetails": "Object",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

## DbEvent systemBackupAudit-deleted

**Event topic**: `librarymanagementsystem-adminops-service-dbevent-systembackupaudit-deleted`

This event announces the deletion of a `systemBackupAudit` data object, covering both hard deletions (permanent removal) and soft deletions (where the `isActive` attribute is set to false). Regardless of the deletion type, the event payload will present the data as it was immediately before deletion, highlighting an `isActive` status of false for soft deletions.

**Event payload**:

```json
{
  "id": "ID",
  "_owner": "ID",
  "type": "Enum",
  "type_": "String",
  "config": "Object",
  "initiatedByUserId": "ID",
  "status": "Enum",
  "status_": "String",
  "resultDetails": "Object",
  "isActive": false,
  "recordVersion": "Integer",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## DbEvent branchPurchaseOrder-created

**Event topic**: `librarymanagementsystem-adminops-service-dbevent-branchpurchaseorder-created`

This event is triggered upon the creation of a `branchPurchaseOrder` data object in the database. The event payload encompasses the newly created data, encapsulated within the root of the paylod.

**Event payload**:

```json
{
  "id": "ID",
  "_owner": "ID",
  "branchId": "ID",
  "requestedByUserId": "ID",
  "items": "Object",
  "status": "Enum",
  "status_": "String",
  "approvedByUserId": "ID",
  "approvalDate": "Date",
  "note": "Text",
  "isActive": true,
  "recordVersion": "Integer",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## DbEvent branchPurchaseOrder-updated

**Event topic**: `librarymanagementsystem-adminops-service-dbevent-branchpurchaseorder-updated`

Activation of this event follows the update of a `branchPurchaseOrder` data object. The payload contains the updated information under the `branchPurchaseOrder` attribute, along with the original data prior to update, labeled as `old_branchPurchaseOrder`.

**Event payload**:

```json
{
  "old_branchPurchaseOrder": {
    "id": "ID",
    "_owner": "ID",
    "branchId": "ID",
    "requestedByUserId": "ID",
    "items": "Object",
    "status": "Enum",
    "status_": "String",
    "approvedByUserId": "ID",
    "approvalDate": "Date",
    "note": "Text",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  },
  "branchPurchaseOrder": {
    "id": "ID",
    "_owner": "ID",
    "branchId": "ID",
    "requestedByUserId": "ID",
    "items": "Object",
    "status": "Enum",
    "status_": "String",
    "approvedByUserId": "ID",
    "approvalDate": "Date",
    "note": "Text",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

## DbEvent branchPurchaseOrder-deleted

**Event topic**: `librarymanagementsystem-adminops-service-dbevent-branchpurchaseorder-deleted`

This event announces the deletion of a `branchPurchaseOrder` data object, covering both hard deletions (permanent removal) and soft deletions (where the `isActive` attribute is set to false). Regardless of the deletion type, the event payload will present the data as it was immediately before deletion, highlighting an `isActive` status of false for soft deletions.

**Event payload**:

```json
{
  "id": "ID",
  "_owner": "ID",
  "branchId": "ID",
  "requestedByUserId": "ID",
  "items": "Object",
  "status": "Enum",
  "status_": "String",
  "approvedByUserId": "ID",
  "approvalDate": "Date",
  "note": "Text",
  "isActive": false,
  "recordVersion": "Integer",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## DbEvent tregt-created

**Event topic**: `librarymanagementsystem-adminops-service-dbevent-tregt-created`

This event is triggered upon the creation of a `tregt` data object in the database. The event payload encompasses the newly created data, encapsulated within the root of the paylod.

**Event payload**:

```json
{
  "id": "ID",
  "_owner": "ID",
  "isActive": true,
  "recordVersion": "Integer",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## DbEvent tregt-updated

**Event topic**: `librarymanagementsystem-adminops-service-dbevent-tregt-updated`

Activation of this event follows the update of a `tregt` data object. The payload contains the updated information under the `tregt` attribute, along with the original data prior to update, labeled as `old_tregt`.

**Event payload**:

```json
{
  "old_tregt": {
    "id": "ID",
    "_owner": "ID",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  },
  "tregt": {
    "id": "ID",
    "_owner": "ID",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

## DbEvent tregt-deleted

**Event topic**: `librarymanagementsystem-adminops-service-dbevent-tregt-deleted`

This event announces the deletion of a `tregt` data object, covering both hard deletions (permanent removal) and soft deletions (where the `isActive` attribute is set to false). Regardless of the deletion type, the event payload will present the data as it was immediately before deletion, highlighting an `isActive` status of false for soft deletions.

**Event payload**:

```json
{
  "id": "ID",
  "_owner": "ID",
  "isActive": false,
  "recordVersion": "Integer",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## DbEvent adminOpsShareToken-created

**Event topic**: `librarymanagementsystem-adminops-service-dbevent-adminopssharetoken-created`

This event is triggered upon the creation of a `adminOpsShareToken` data object in the database. The event payload encompasses the newly created data, encapsulated within the root of the paylod.

**Event payload**:

```json
{
  "id": "ID",
  "_owner": "ID",
  "configName": "String",
  "objectName": "String",
  "objectId": "ID",
  "ownerId": "ID",
  "peopleOption": "String",
  "tokenPermissions": null,
  "allowedEmails": null,
  "expireDate": "Date",
  "isActive": true,
  "recordVersion": "Integer",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## DbEvent adminOpsShareToken-updated

**Event topic**: `librarymanagementsystem-adminops-service-dbevent-adminopssharetoken-updated`

Activation of this event follows the update of a `adminOpsShareToken` data object. The payload contains the updated information under the `adminOpsShareToken` attribute, along with the original data prior to update, labeled as `old_adminOpsShareToken`.

**Event payload**:

```json
{
  "old_adminOpsShareToken": {
    "id": "ID",
    "_owner": "ID",
    "configName": "String",
    "objectName": "String",
    "objectId": "ID",
    "ownerId": "ID",
    "peopleOption": "String",
    "tokenPermissions": null,
    "allowedEmails": null,
    "expireDate": "Date",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  },
  "adminOpsShareToken": {
    "id": "ID",
    "_owner": "ID",
    "configName": "String",
    "objectName": "String",
    "objectId": "ID",
    "ownerId": "ID",
    "peopleOption": "String",
    "tokenPermissions": null,
    "allowedEmails": null,
    "expireDate": "Date",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

## DbEvent adminOpsShareToken-deleted

**Event topic**: `librarymanagementsystem-adminops-service-dbevent-adminopssharetoken-deleted`

This event announces the deletion of a `adminOpsShareToken` data object, covering both hard deletions (permanent removal) and soft deletions (where the `isActive` attribute is set to false). Regardless of the deletion type, the event payload will present the data as it was immediately before deletion, highlighting an `isActive` status of false for soft deletions.

**Event payload**:

```json
{
  "id": "ID",
  "_owner": "ID",
  "configName": "String",
  "objectName": "String",
  "objectId": "ID",
  "ownerId": "ID",
  "peopleOption": "String",
  "tokenPermissions": null,
  "allowedEmails": null,
  "expireDate": "Date",
  "isActive": false,
  "recordVersion": "Integer",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

# ElasticSearch Index Events

Within the `AdminOps` service, most data objects are mirrored in ElasticSearch indices, ensuring these indices remain syncronized with their database counterparts through creation, updates, and deletions. These indices serve dual purposes: they act as a data source for external services and furnish aggregated data tailored to enhance frontend user experiences. Consequently, an ElasticSearch index might encapsulate data in its original form or aggregate additional information from other data objects.

These aggregations can include both one-to-one and one-to-many relationships not only with database objects within the same service but also across different services. This capability allows developers to access comprehensive, aggregated data efficiently. By subscribing to ElasticSearch index events, developers are notified when an index is updated and can directly obtain the aggregated entity within the event payload, bypassing the need for separate ElasticSearch queries.

It's noteworthy that some services may augment another service's index by appending to the entity’s `extends` object. In such scenarios, an `*-extended` event will contain only the newly added data. Should you require the complete dataset, you would need to retrieve the full ElasticSearch index entity using the provided ID.

This approach to indexing and event handling facilitates a modular, interconnected architecture where services can seamlessly integrate and react to changes, enriching the overall data ecosystem and enabling more dynamic, responsive applications.

## Index Event branchstaffassignment-created

**Event topic**: `elastic-index-librarymanagementsystem_branchstaffassignment-created`

**Event payload**:

```json
{
  "id": "ID",
  "_owner": "ID",
  "branchId": "ID",
  "userId": "ID",
  "role": "Enum",
  "role_": "String",
  "assignedByUserId": "ID",
  "isActive": true,
  "recordVersion": "Integer",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## Index Event branchstaffassignment-updated

**Event topic**: `elastic-index-librarymanagementsystem_branchstaffassignment-created`

**Event payload**:

```json
{
  "id": "ID",
  "_owner": "ID",
  "branchId": "ID",
  "userId": "ID",
  "role": "Enum",
  "role_": "String",
  "assignedByUserId": "ID",
  "isActive": true,
  "recordVersion": "Integer",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## Index Event branchstaffassignment-deleted

**Event topic**: `elastic-index-librarymanagementsystem_branchstaffassignment-deleted`

**Event payload**:

```json
{
  "id": "ID",
  "_owner": "ID",
  "branchId": "ID",
  "userId": "ID",
  "role": "Enum",
  "role_": "String",
  "assignedByUserId": "ID",
  "isActive": true,
  "recordVersion": "Integer",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## Index Event branchstaffassignment-extended

**Event topic**: `elastic-index-librarymanagementsystem_branchstaffassignment-extended`

**Event payload**:

```js
{
  id: id,
  extends: {
    [extendName]: "Object",
    [extendName + "_count"]: "Number",
  },
}
```

# Route Events

Route events are emitted following the successful execution of a route. While most routes perform CRUD (Create, Read, Update, Delete) operations on data objects, resulting in route events that closely resemble database events, there are distinctions worth noting. A single route execution might trigger multiple CRUD actions and ElasticSearch indexing operations. However, for those primarily concerned with the overarching business logic and its outcomes, listening to the consolidated route event, published once at the conclusion of the route's execution, is more pertinent.

Moreover, routes often deliver aggregated data beyond the primary database object, catering to specific client needs. For instance, creating a data object via a route might not only return the entity's data but also route-specific metrics, such as the executing user's permissions related to the entity. Alternatively, a route might automatically generate default child entities following the creation of a parent object. Consequently, the route event encapsulates a unified dataset encompassing both the parent and its children, in contrast to individual events triggered for each entity created. Therefore, subscribing to route events can offer a richer, more contextually relevant set of information aligned with business logic.

The payload of a route event mirrors the REST response JSON of the route, providing a direct and comprehensive reflection of the data and metadata communicated to the client. This ensures that subscribers to route events receive a payload that encapsulates both the primary data involved and any additional information deemed significant at the business level, facilitating a deeper understanding and integration of the service's functional outcomes.

## Route Event branchstaffassignment-created

**Event topic** : `librarymanagementsystem-adminops-service-branchstaffassignment-created`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `branchStaffAssignment` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`branchStaffAssignment`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event branchstaffassignment-updated

**Event topic** : `librarymanagementsystem-adminops-service-branchstaffassignment-updated`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `branchStaffAssignment` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`branchStaffAssignment`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event branchstaffassignment-deleted

**Event topic** : `librarymanagementsystem-adminops-service-branchstaffassignment-deleted`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `branchStaffAssignment` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`branchStaffAssignment`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event issueescalation-created

**Event topic** : `librarymanagementsystem-adminops-service-issueescalation-created`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `issueEscalation` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`issueEscalation`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event issueescalation-updated

**Event topic** : `librarymanagementsystem-adminops-service-issueescalation-updated`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `issueEscalation` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`issueEscalation`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event issueescalation-deleted

**Event topic** : `librarymanagementsystem-adminops-service-issueescalation-deleted`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `issueEscalation` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`issueEscalation`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event mongoadminconfig-created

**Event topic** : `librarymanagementsystem-adminops-service-mongoadminconfig-created`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `mongoAdminConfig` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`mongoAdminConfig`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event mongoadminconfig-updated

**Event topic** : `librarymanagementsystem-adminops-service-mongoadminconfig-updated`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `mongoAdminConfig` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`mongoAdminConfig`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event mongoadminconfig-deleted

**Event topic** : `librarymanagementsystem-adminops-service-mongoadminconfig-deleted`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `mongoAdminConfig` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`mongoAdminConfig`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event externalnotificationconfig-created

**Event topic** : `librarymanagementsystem-adminops-service-externalnotificationconfig-created`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `externalNotificationConfig` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`externalNotificationConfig`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event externalnotificationconfig-updated

**Event topic** : `librarymanagementsystem-adminops-service-externalnotificationconfig-updated`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `externalNotificationConfig` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`externalNotificationConfig`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event externalnotificationconfig-deleted

**Event topic** : `librarymanagementsystem-adminops-service-externalnotificationconfig-deleted`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `externalNotificationConfig` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`externalNotificationConfig`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event systembackupaudit-created

**Event topic** : `librarymanagementsystem-adminops-service-systembackupaudit-created`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `systemBackupAudit` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`systemBackupAudit`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event systembackupaudit-updated

**Event topic** : `librarymanagementsystem-adminops-service-systembackupaudit-updated`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `systemBackupAudit` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`systemBackupAudit`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event systembackupaudit-deleted

**Event topic** : `librarymanagementsystem-adminops-service-systembackupaudit-deleted`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `systemBackupAudit` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`systemBackupAudit`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event branchpurchaseorder-created

**Event topic** : `librarymanagementsystem-adminops-service-branchpurchaseorder-created`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `branchPurchaseOrder` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`branchPurchaseOrder`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event branchpurchaseorder-updated

**Event topic** : `librarymanagementsystem-adminops-service-branchpurchaseorder-updated`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `branchPurchaseOrder` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`branchPurchaseOrder`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event branchpurchaseorder-deleted

**Event topic** : `librarymanagementsystem-adminops-service-branchpurchaseorder-deleted`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `branchPurchaseOrder` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`branchPurchaseOrder`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Index Event issueescalation-created

**Event topic**: `elastic-index-librarymanagementsystem_issueescalation-created`

**Event payload**:

```json
{
  "id": "ID",
  "_owner": "ID",
  "branchId": "ID",
  "raisedByUserId": "ID",
  "assignedToUserId": "ID",
  "status": "Enum",
  "status_": "String",
  "escalationType": "Enum",
  "escalationType_": "String",
  "description": "Text",
  "log": "Object",
  "isActive": true,
  "recordVersion": "Integer",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## Index Event issueescalation-updated

**Event topic**: `elastic-index-librarymanagementsystem_issueescalation-created`

**Event payload**:

```json
{
  "id": "ID",
  "_owner": "ID",
  "branchId": "ID",
  "raisedByUserId": "ID",
  "assignedToUserId": "ID",
  "status": "Enum",
  "status_": "String",
  "escalationType": "Enum",
  "escalationType_": "String",
  "description": "Text",
  "log": "Object",
  "isActive": true,
  "recordVersion": "Integer",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## Index Event issueescalation-deleted

**Event topic**: `elastic-index-librarymanagementsystem_issueescalation-deleted`

**Event payload**:

```json
{
  "id": "ID",
  "_owner": "ID",
  "branchId": "ID",
  "raisedByUserId": "ID",
  "assignedToUserId": "ID",
  "status": "Enum",
  "status_": "String",
  "escalationType": "Enum",
  "escalationType_": "String",
  "description": "Text",
  "log": "Object",
  "isActive": true,
  "recordVersion": "Integer",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## Index Event issueescalation-extended

**Event topic**: `elastic-index-librarymanagementsystem_issueescalation-extended`

**Event payload**:

```js
{
  id: id,
  extends: {
    [extendName]: "Object",
    [extendName + "_count"]: "Number",
  },
}
```

# Route Events

Route events are emitted following the successful execution of a route. While most routes perform CRUD (Create, Read, Update, Delete) operations on data objects, resulting in route events that closely resemble database events, there are distinctions worth noting. A single route execution might trigger multiple CRUD actions and ElasticSearch indexing operations. However, for those primarily concerned with the overarching business logic and its outcomes, listening to the consolidated route event, published once at the conclusion of the route's execution, is more pertinent.

Moreover, routes often deliver aggregated data beyond the primary database object, catering to specific client needs. For instance, creating a data object via a route might not only return the entity's data but also route-specific metrics, such as the executing user's permissions related to the entity. Alternatively, a route might automatically generate default child entities following the creation of a parent object. Consequently, the route event encapsulates a unified dataset encompassing both the parent and its children, in contrast to individual events triggered for each entity created. Therefore, subscribing to route events can offer a richer, more contextually relevant set of information aligned with business logic.

The payload of a route event mirrors the REST response JSON of the route, providing a direct and comprehensive reflection of the data and metadata communicated to the client. This ensures that subscribers to route events receive a payload that encapsulates both the primary data involved and any additional information deemed significant at the business level, facilitating a deeper understanding and integration of the service's functional outcomes.

## Route Event branchstaffassignment-created

**Event topic** : `librarymanagementsystem-adminops-service-branchstaffassignment-created`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `branchStaffAssignment` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`branchStaffAssignment`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event branchstaffassignment-updated

**Event topic** : `librarymanagementsystem-adminops-service-branchstaffassignment-updated`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `branchStaffAssignment` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`branchStaffAssignment`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event branchstaffassignment-deleted

**Event topic** : `librarymanagementsystem-adminops-service-branchstaffassignment-deleted`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `branchStaffAssignment` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`branchStaffAssignment`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event issueescalation-created

**Event topic** : `librarymanagementsystem-adminops-service-issueescalation-created`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `issueEscalation` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`issueEscalation`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event issueescalation-updated

**Event topic** : `librarymanagementsystem-adminops-service-issueescalation-updated`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `issueEscalation` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`issueEscalation`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event issueescalation-deleted

**Event topic** : `librarymanagementsystem-adminops-service-issueescalation-deleted`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `issueEscalation` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`issueEscalation`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event mongoadminconfig-created

**Event topic** : `librarymanagementsystem-adminops-service-mongoadminconfig-created`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `mongoAdminConfig` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`mongoAdminConfig`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event mongoadminconfig-updated

**Event topic** : `librarymanagementsystem-adminops-service-mongoadminconfig-updated`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `mongoAdminConfig` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`mongoAdminConfig`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event mongoadminconfig-deleted

**Event topic** : `librarymanagementsystem-adminops-service-mongoadminconfig-deleted`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `mongoAdminConfig` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`mongoAdminConfig`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event externalnotificationconfig-created

**Event topic** : `librarymanagementsystem-adminops-service-externalnotificationconfig-created`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `externalNotificationConfig` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`externalNotificationConfig`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event externalnotificationconfig-updated

**Event topic** : `librarymanagementsystem-adminops-service-externalnotificationconfig-updated`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `externalNotificationConfig` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`externalNotificationConfig`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event externalnotificationconfig-deleted

**Event topic** : `librarymanagementsystem-adminops-service-externalnotificationconfig-deleted`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `externalNotificationConfig` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`externalNotificationConfig`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event systembackupaudit-created

**Event topic** : `librarymanagementsystem-adminops-service-systembackupaudit-created`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `systemBackupAudit` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`systemBackupAudit`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event systembackupaudit-updated

**Event topic** : `librarymanagementsystem-adminops-service-systembackupaudit-updated`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `systemBackupAudit` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`systemBackupAudit`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event systembackupaudit-deleted

**Event topic** : `librarymanagementsystem-adminops-service-systembackupaudit-deleted`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `systemBackupAudit` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`systemBackupAudit`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event branchpurchaseorder-created

**Event topic** : `librarymanagementsystem-adminops-service-branchpurchaseorder-created`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `branchPurchaseOrder` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`branchPurchaseOrder`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event branchpurchaseorder-updated

**Event topic** : `librarymanagementsystem-adminops-service-branchpurchaseorder-updated`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `branchPurchaseOrder` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`branchPurchaseOrder`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event branchpurchaseorder-deleted

**Event topic** : `librarymanagementsystem-adminops-service-branchpurchaseorder-deleted`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `branchPurchaseOrder` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`branchPurchaseOrder`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Index Event mongoadminconfig-created

**Event topic**: `elastic-index-librarymanagementsystem_mongoadminconfig-created`

**Event payload**:

```json
{
  "id": "ID",
  "_owner": "ID",
  "configType": "Enum",
  "configType_": "String",
  "targetObject": "String",
  "configDetails": "Object",
  "status": "Enum",
  "status_": "String",
  "isActive": true,
  "recordVersion": "Integer",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## Index Event mongoadminconfig-updated

**Event topic**: `elastic-index-librarymanagementsystem_mongoadminconfig-created`

**Event payload**:

```json
{
  "id": "ID",
  "_owner": "ID",
  "configType": "Enum",
  "configType_": "String",
  "targetObject": "String",
  "configDetails": "Object",
  "status": "Enum",
  "status_": "String",
  "isActive": true,
  "recordVersion": "Integer",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## Index Event mongoadminconfig-deleted

**Event topic**: `elastic-index-librarymanagementsystem_mongoadminconfig-deleted`

**Event payload**:

```json
{
  "id": "ID",
  "_owner": "ID",
  "configType": "Enum",
  "configType_": "String",
  "targetObject": "String",
  "configDetails": "Object",
  "status": "Enum",
  "status_": "String",
  "isActive": true,
  "recordVersion": "Integer",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## Index Event mongoadminconfig-extended

**Event topic**: `elastic-index-librarymanagementsystem_mongoadminconfig-extended`

**Event payload**:

```js
{
  id: id,
  extends: {
    [extendName]: "Object",
    [extendName + "_count"]: "Number",
  },
}
```

# Route Events

Route events are emitted following the successful execution of a route. While most routes perform CRUD (Create, Read, Update, Delete) operations on data objects, resulting in route events that closely resemble database events, there are distinctions worth noting. A single route execution might trigger multiple CRUD actions and ElasticSearch indexing operations. However, for those primarily concerned with the overarching business logic and its outcomes, listening to the consolidated route event, published once at the conclusion of the route's execution, is more pertinent.

Moreover, routes often deliver aggregated data beyond the primary database object, catering to specific client needs. For instance, creating a data object via a route might not only return the entity's data but also route-specific metrics, such as the executing user's permissions related to the entity. Alternatively, a route might automatically generate default child entities following the creation of a parent object. Consequently, the route event encapsulates a unified dataset encompassing both the parent and its children, in contrast to individual events triggered for each entity created. Therefore, subscribing to route events can offer a richer, more contextually relevant set of information aligned with business logic.

The payload of a route event mirrors the REST response JSON of the route, providing a direct and comprehensive reflection of the data and metadata communicated to the client. This ensures that subscribers to route events receive a payload that encapsulates both the primary data involved and any additional information deemed significant at the business level, facilitating a deeper understanding and integration of the service's functional outcomes.

## Route Event branchstaffassignment-created

**Event topic** : `librarymanagementsystem-adminops-service-branchstaffassignment-created`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `branchStaffAssignment` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`branchStaffAssignment`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event branchstaffassignment-updated

**Event topic** : `librarymanagementsystem-adminops-service-branchstaffassignment-updated`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `branchStaffAssignment` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`branchStaffAssignment`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event branchstaffassignment-deleted

**Event topic** : `librarymanagementsystem-adminops-service-branchstaffassignment-deleted`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `branchStaffAssignment` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`branchStaffAssignment`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event issueescalation-created

**Event topic** : `librarymanagementsystem-adminops-service-issueescalation-created`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `issueEscalation` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`issueEscalation`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event issueescalation-updated

**Event topic** : `librarymanagementsystem-adminops-service-issueescalation-updated`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `issueEscalation` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`issueEscalation`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event issueescalation-deleted

**Event topic** : `librarymanagementsystem-adminops-service-issueescalation-deleted`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `issueEscalation` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`issueEscalation`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event mongoadminconfig-created

**Event topic** : `librarymanagementsystem-adminops-service-mongoadminconfig-created`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `mongoAdminConfig` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`mongoAdminConfig`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event mongoadminconfig-updated

**Event topic** : `librarymanagementsystem-adminops-service-mongoadminconfig-updated`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `mongoAdminConfig` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`mongoAdminConfig`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event mongoadminconfig-deleted

**Event topic** : `librarymanagementsystem-adminops-service-mongoadminconfig-deleted`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `mongoAdminConfig` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`mongoAdminConfig`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event externalnotificationconfig-created

**Event topic** : `librarymanagementsystem-adminops-service-externalnotificationconfig-created`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `externalNotificationConfig` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`externalNotificationConfig`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event externalnotificationconfig-updated

**Event topic** : `librarymanagementsystem-adminops-service-externalnotificationconfig-updated`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `externalNotificationConfig` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`externalNotificationConfig`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event externalnotificationconfig-deleted

**Event topic** : `librarymanagementsystem-adminops-service-externalnotificationconfig-deleted`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `externalNotificationConfig` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`externalNotificationConfig`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event systembackupaudit-created

**Event topic** : `librarymanagementsystem-adminops-service-systembackupaudit-created`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `systemBackupAudit` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`systemBackupAudit`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event systembackupaudit-updated

**Event topic** : `librarymanagementsystem-adminops-service-systembackupaudit-updated`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `systemBackupAudit` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`systemBackupAudit`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event systembackupaudit-deleted

**Event topic** : `librarymanagementsystem-adminops-service-systembackupaudit-deleted`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `systemBackupAudit` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`systemBackupAudit`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event branchpurchaseorder-created

**Event topic** : `librarymanagementsystem-adminops-service-branchpurchaseorder-created`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `branchPurchaseOrder` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`branchPurchaseOrder`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event branchpurchaseorder-updated

**Event topic** : `librarymanagementsystem-adminops-service-branchpurchaseorder-updated`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `branchPurchaseOrder` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`branchPurchaseOrder`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event branchpurchaseorder-deleted

**Event topic** : `librarymanagementsystem-adminops-service-branchpurchaseorder-deleted`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `branchPurchaseOrder` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`branchPurchaseOrder`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Index Event externalnotificationconfig-created

**Event topic**: `elastic-index-librarymanagementsystem_externalnotificationconfig-created`

**Event payload**:

```json
{
  "id": "ID",
  "_owner": "ID",
  "providerType": "Enum",
  "providerType_": "String",
  "name": "String",
  "settings": "Object",
  "status": "Enum",
  "status_": "String",
  "isActive": true,
  "recordVersion": "Integer",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## Index Event externalnotificationconfig-updated

**Event topic**: `elastic-index-librarymanagementsystem_externalnotificationconfig-created`

**Event payload**:

```json
{
  "id": "ID",
  "_owner": "ID",
  "providerType": "Enum",
  "providerType_": "String",
  "name": "String",
  "settings": "Object",
  "status": "Enum",
  "status_": "String",
  "isActive": true,
  "recordVersion": "Integer",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## Index Event externalnotificationconfig-deleted

**Event topic**: `elastic-index-librarymanagementsystem_externalnotificationconfig-deleted`

**Event payload**:

```json
{
  "id": "ID",
  "_owner": "ID",
  "providerType": "Enum",
  "providerType_": "String",
  "name": "String",
  "settings": "Object",
  "status": "Enum",
  "status_": "String",
  "isActive": true,
  "recordVersion": "Integer",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## Index Event externalnotificationconfig-extended

**Event topic**: `elastic-index-librarymanagementsystem_externalnotificationconfig-extended`

**Event payload**:

```js
{
  id: id,
  extends: {
    [extendName]: "Object",
    [extendName + "_count"]: "Number",
  },
}
```

# Route Events

Route events are emitted following the successful execution of a route. While most routes perform CRUD (Create, Read, Update, Delete) operations on data objects, resulting in route events that closely resemble database events, there are distinctions worth noting. A single route execution might trigger multiple CRUD actions and ElasticSearch indexing operations. However, for those primarily concerned with the overarching business logic and its outcomes, listening to the consolidated route event, published once at the conclusion of the route's execution, is more pertinent.

Moreover, routes often deliver aggregated data beyond the primary database object, catering to specific client needs. For instance, creating a data object via a route might not only return the entity's data but also route-specific metrics, such as the executing user's permissions related to the entity. Alternatively, a route might automatically generate default child entities following the creation of a parent object. Consequently, the route event encapsulates a unified dataset encompassing both the parent and its children, in contrast to individual events triggered for each entity created. Therefore, subscribing to route events can offer a richer, more contextually relevant set of information aligned with business logic.

The payload of a route event mirrors the REST response JSON of the route, providing a direct and comprehensive reflection of the data and metadata communicated to the client. This ensures that subscribers to route events receive a payload that encapsulates both the primary data involved and any additional information deemed significant at the business level, facilitating a deeper understanding and integration of the service's functional outcomes.

## Route Event branchstaffassignment-created

**Event topic** : `librarymanagementsystem-adminops-service-branchstaffassignment-created`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `branchStaffAssignment` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`branchStaffAssignment`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event branchstaffassignment-updated

**Event topic** : `librarymanagementsystem-adminops-service-branchstaffassignment-updated`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `branchStaffAssignment` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`branchStaffAssignment`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event branchstaffassignment-deleted

**Event topic** : `librarymanagementsystem-adminops-service-branchstaffassignment-deleted`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `branchStaffAssignment` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`branchStaffAssignment`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event issueescalation-created

**Event topic** : `librarymanagementsystem-adminops-service-issueescalation-created`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `issueEscalation` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`issueEscalation`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event issueescalation-updated

**Event topic** : `librarymanagementsystem-adminops-service-issueescalation-updated`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `issueEscalation` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`issueEscalation`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event issueescalation-deleted

**Event topic** : `librarymanagementsystem-adminops-service-issueescalation-deleted`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `issueEscalation` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`issueEscalation`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event mongoadminconfig-created

**Event topic** : `librarymanagementsystem-adminops-service-mongoadminconfig-created`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `mongoAdminConfig` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`mongoAdminConfig`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event mongoadminconfig-updated

**Event topic** : `librarymanagementsystem-adminops-service-mongoadminconfig-updated`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `mongoAdminConfig` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`mongoAdminConfig`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event mongoadminconfig-deleted

**Event topic** : `librarymanagementsystem-adminops-service-mongoadminconfig-deleted`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `mongoAdminConfig` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`mongoAdminConfig`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event externalnotificationconfig-created

**Event topic** : `librarymanagementsystem-adminops-service-externalnotificationconfig-created`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `externalNotificationConfig` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`externalNotificationConfig`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event externalnotificationconfig-updated

**Event topic** : `librarymanagementsystem-adminops-service-externalnotificationconfig-updated`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `externalNotificationConfig` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`externalNotificationConfig`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event externalnotificationconfig-deleted

**Event topic** : `librarymanagementsystem-adminops-service-externalnotificationconfig-deleted`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `externalNotificationConfig` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`externalNotificationConfig`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event systembackupaudit-created

**Event topic** : `librarymanagementsystem-adminops-service-systembackupaudit-created`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `systemBackupAudit` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`systemBackupAudit`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event systembackupaudit-updated

**Event topic** : `librarymanagementsystem-adminops-service-systembackupaudit-updated`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `systemBackupAudit` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`systemBackupAudit`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event systembackupaudit-deleted

**Event topic** : `librarymanagementsystem-adminops-service-systembackupaudit-deleted`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `systemBackupAudit` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`systemBackupAudit`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event branchpurchaseorder-created

**Event topic** : `librarymanagementsystem-adminops-service-branchpurchaseorder-created`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `branchPurchaseOrder` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`branchPurchaseOrder`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event branchpurchaseorder-updated

**Event topic** : `librarymanagementsystem-adminops-service-branchpurchaseorder-updated`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `branchPurchaseOrder` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`branchPurchaseOrder`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event branchpurchaseorder-deleted

**Event topic** : `librarymanagementsystem-adminops-service-branchpurchaseorder-deleted`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `branchPurchaseOrder` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`branchPurchaseOrder`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Index Event systembackupaudit-created

**Event topic**: `elastic-index-librarymanagementsystem_systembackupaudit-created`

**Event payload**:

```json
{
  "id": "ID",
  "_owner": "ID",
  "type": "Enum",
  "type_": "String",
  "config": "Object",
  "initiatedByUserId": "ID",
  "status": "Enum",
  "status_": "String",
  "resultDetails": "Object",
  "isActive": true,
  "recordVersion": "Integer",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## Index Event systembackupaudit-updated

**Event topic**: `elastic-index-librarymanagementsystem_systembackupaudit-created`

**Event payload**:

```json
{
  "id": "ID",
  "_owner": "ID",
  "type": "Enum",
  "type_": "String",
  "config": "Object",
  "initiatedByUserId": "ID",
  "status": "Enum",
  "status_": "String",
  "resultDetails": "Object",
  "isActive": true,
  "recordVersion": "Integer",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## Index Event systembackupaudit-deleted

**Event topic**: `elastic-index-librarymanagementsystem_systembackupaudit-deleted`

**Event payload**:

```json
{
  "id": "ID",
  "_owner": "ID",
  "type": "Enum",
  "type_": "String",
  "config": "Object",
  "initiatedByUserId": "ID",
  "status": "Enum",
  "status_": "String",
  "resultDetails": "Object",
  "isActive": true,
  "recordVersion": "Integer",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## Index Event systembackupaudit-extended

**Event topic**: `elastic-index-librarymanagementsystem_systembackupaudit-extended`

**Event payload**:

```js
{
  id: id,
  extends: {
    [extendName]: "Object",
    [extendName + "_count"]: "Number",
  },
}
```

# Route Events

Route events are emitted following the successful execution of a route. While most routes perform CRUD (Create, Read, Update, Delete) operations on data objects, resulting in route events that closely resemble database events, there are distinctions worth noting. A single route execution might trigger multiple CRUD actions and ElasticSearch indexing operations. However, for those primarily concerned with the overarching business logic and its outcomes, listening to the consolidated route event, published once at the conclusion of the route's execution, is more pertinent.

Moreover, routes often deliver aggregated data beyond the primary database object, catering to specific client needs. For instance, creating a data object via a route might not only return the entity's data but also route-specific metrics, such as the executing user's permissions related to the entity. Alternatively, a route might automatically generate default child entities following the creation of a parent object. Consequently, the route event encapsulates a unified dataset encompassing both the parent and its children, in contrast to individual events triggered for each entity created. Therefore, subscribing to route events can offer a richer, more contextually relevant set of information aligned with business logic.

The payload of a route event mirrors the REST response JSON of the route, providing a direct and comprehensive reflection of the data and metadata communicated to the client. This ensures that subscribers to route events receive a payload that encapsulates both the primary data involved and any additional information deemed significant at the business level, facilitating a deeper understanding and integration of the service's functional outcomes.

## Route Event branchstaffassignment-created

**Event topic** : `librarymanagementsystem-adminops-service-branchstaffassignment-created`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `branchStaffAssignment` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`branchStaffAssignment`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event branchstaffassignment-updated

**Event topic** : `librarymanagementsystem-adminops-service-branchstaffassignment-updated`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `branchStaffAssignment` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`branchStaffAssignment`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event branchstaffassignment-deleted

**Event topic** : `librarymanagementsystem-adminops-service-branchstaffassignment-deleted`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `branchStaffAssignment` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`branchStaffAssignment`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event issueescalation-created

**Event topic** : `librarymanagementsystem-adminops-service-issueescalation-created`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `issueEscalation` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`issueEscalation`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event issueescalation-updated

**Event topic** : `librarymanagementsystem-adminops-service-issueescalation-updated`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `issueEscalation` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`issueEscalation`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event issueescalation-deleted

**Event topic** : `librarymanagementsystem-adminops-service-issueescalation-deleted`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `issueEscalation` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`issueEscalation`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event mongoadminconfig-created

**Event topic** : `librarymanagementsystem-adminops-service-mongoadminconfig-created`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `mongoAdminConfig` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`mongoAdminConfig`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event mongoadminconfig-updated

**Event topic** : `librarymanagementsystem-adminops-service-mongoadminconfig-updated`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `mongoAdminConfig` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`mongoAdminConfig`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event mongoadminconfig-deleted

**Event topic** : `librarymanagementsystem-adminops-service-mongoadminconfig-deleted`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `mongoAdminConfig` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`mongoAdminConfig`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event externalnotificationconfig-created

**Event topic** : `librarymanagementsystem-adminops-service-externalnotificationconfig-created`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `externalNotificationConfig` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`externalNotificationConfig`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event externalnotificationconfig-updated

**Event topic** : `librarymanagementsystem-adminops-service-externalnotificationconfig-updated`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `externalNotificationConfig` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`externalNotificationConfig`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event externalnotificationconfig-deleted

**Event topic** : `librarymanagementsystem-adminops-service-externalnotificationconfig-deleted`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `externalNotificationConfig` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`externalNotificationConfig`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event systembackupaudit-created

**Event topic** : `librarymanagementsystem-adminops-service-systembackupaudit-created`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `systemBackupAudit` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`systemBackupAudit`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event systembackupaudit-updated

**Event topic** : `librarymanagementsystem-adminops-service-systembackupaudit-updated`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `systemBackupAudit` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`systemBackupAudit`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event systembackupaudit-deleted

**Event topic** : `librarymanagementsystem-adminops-service-systembackupaudit-deleted`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `systemBackupAudit` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`systemBackupAudit`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event branchpurchaseorder-created

**Event topic** : `librarymanagementsystem-adminops-service-branchpurchaseorder-created`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `branchPurchaseOrder` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`branchPurchaseOrder`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event branchpurchaseorder-updated

**Event topic** : `librarymanagementsystem-adminops-service-branchpurchaseorder-updated`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `branchPurchaseOrder` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`branchPurchaseOrder`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event branchpurchaseorder-deleted

**Event topic** : `librarymanagementsystem-adminops-service-branchpurchaseorder-deleted`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `branchPurchaseOrder` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`branchPurchaseOrder`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Index Event branchpurchaseorder-created

**Event topic**: `elastic-index-librarymanagementsystem_branchpurchaseorder-created`

**Event payload**:

```json
{
  "id": "ID",
  "_owner": "ID",
  "branchId": "ID",
  "requestedByUserId": "ID",
  "items": "Object",
  "status": "Enum",
  "status_": "String",
  "approvedByUserId": "ID",
  "approvalDate": "Date",
  "note": "Text",
  "isActive": true,
  "recordVersion": "Integer",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## Index Event branchpurchaseorder-updated

**Event topic**: `elastic-index-librarymanagementsystem_branchpurchaseorder-created`

**Event payload**:

```json
{
  "id": "ID",
  "_owner": "ID",
  "branchId": "ID",
  "requestedByUserId": "ID",
  "items": "Object",
  "status": "Enum",
  "status_": "String",
  "approvedByUserId": "ID",
  "approvalDate": "Date",
  "note": "Text",
  "isActive": true,
  "recordVersion": "Integer",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## Index Event branchpurchaseorder-deleted

**Event topic**: `elastic-index-librarymanagementsystem_branchpurchaseorder-deleted`

**Event payload**:

```json
{
  "id": "ID",
  "_owner": "ID",
  "branchId": "ID",
  "requestedByUserId": "ID",
  "items": "Object",
  "status": "Enum",
  "status_": "String",
  "approvedByUserId": "ID",
  "approvalDate": "Date",
  "note": "Text",
  "isActive": true,
  "recordVersion": "Integer",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## Index Event branchpurchaseorder-extended

**Event topic**: `elastic-index-librarymanagementsystem_branchpurchaseorder-extended`

**Event payload**:

```js
{
  id: id,
  extends: {
    [extendName]: "Object",
    [extendName + "_count"]: "Number",
  },
}
```

# Route Events

Route events are emitted following the successful execution of a route. While most routes perform CRUD (Create, Read, Update, Delete) operations on data objects, resulting in route events that closely resemble database events, there are distinctions worth noting. A single route execution might trigger multiple CRUD actions and ElasticSearch indexing operations. However, for those primarily concerned with the overarching business logic and its outcomes, listening to the consolidated route event, published once at the conclusion of the route's execution, is more pertinent.

Moreover, routes often deliver aggregated data beyond the primary database object, catering to specific client needs. For instance, creating a data object via a route might not only return the entity's data but also route-specific metrics, such as the executing user's permissions related to the entity. Alternatively, a route might automatically generate default child entities following the creation of a parent object. Consequently, the route event encapsulates a unified dataset encompassing both the parent and its children, in contrast to individual events triggered for each entity created. Therefore, subscribing to route events can offer a richer, more contextually relevant set of information aligned with business logic.

The payload of a route event mirrors the REST response JSON of the route, providing a direct and comprehensive reflection of the data and metadata communicated to the client. This ensures that subscribers to route events receive a payload that encapsulates both the primary data involved and any additional information deemed significant at the business level, facilitating a deeper understanding and integration of the service's functional outcomes.

## Route Event branchstaffassignment-created

**Event topic** : `librarymanagementsystem-adminops-service-branchstaffassignment-created`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `branchStaffAssignment` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`branchStaffAssignment`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event branchstaffassignment-updated

**Event topic** : `librarymanagementsystem-adminops-service-branchstaffassignment-updated`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `branchStaffAssignment` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`branchStaffAssignment`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event branchstaffassignment-deleted

**Event topic** : `librarymanagementsystem-adminops-service-branchstaffassignment-deleted`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `branchStaffAssignment` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`branchStaffAssignment`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event issueescalation-created

**Event topic** : `librarymanagementsystem-adminops-service-issueescalation-created`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `issueEscalation` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`issueEscalation`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event issueescalation-updated

**Event topic** : `librarymanagementsystem-adminops-service-issueescalation-updated`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `issueEscalation` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`issueEscalation`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event issueescalation-deleted

**Event topic** : `librarymanagementsystem-adminops-service-issueescalation-deleted`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `issueEscalation` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`issueEscalation`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event mongoadminconfig-created

**Event topic** : `librarymanagementsystem-adminops-service-mongoadminconfig-created`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `mongoAdminConfig` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`mongoAdminConfig`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event mongoadminconfig-updated

**Event topic** : `librarymanagementsystem-adminops-service-mongoadminconfig-updated`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `mongoAdminConfig` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`mongoAdminConfig`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event mongoadminconfig-deleted

**Event topic** : `librarymanagementsystem-adminops-service-mongoadminconfig-deleted`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `mongoAdminConfig` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`mongoAdminConfig`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event externalnotificationconfig-created

**Event topic** : `librarymanagementsystem-adminops-service-externalnotificationconfig-created`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `externalNotificationConfig` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`externalNotificationConfig`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event externalnotificationconfig-updated

**Event topic** : `librarymanagementsystem-adminops-service-externalnotificationconfig-updated`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `externalNotificationConfig` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`externalNotificationConfig`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event externalnotificationconfig-deleted

**Event topic** : `librarymanagementsystem-adminops-service-externalnotificationconfig-deleted`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `externalNotificationConfig` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`externalNotificationConfig`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event systembackupaudit-created

**Event topic** : `librarymanagementsystem-adminops-service-systembackupaudit-created`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `systemBackupAudit` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`systemBackupAudit`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event systembackupaudit-updated

**Event topic** : `librarymanagementsystem-adminops-service-systembackupaudit-updated`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `systemBackupAudit` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`systemBackupAudit`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event systembackupaudit-deleted

**Event topic** : `librarymanagementsystem-adminops-service-systembackupaudit-deleted`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `systemBackupAudit` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`systemBackupAudit`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event branchpurchaseorder-created

**Event topic** : `librarymanagementsystem-adminops-service-branchpurchaseorder-created`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `branchPurchaseOrder` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`branchPurchaseOrder`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event branchpurchaseorder-updated

**Event topic** : `librarymanagementsystem-adminops-service-branchpurchaseorder-updated`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `branchPurchaseOrder` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`branchPurchaseOrder`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event branchpurchaseorder-deleted

**Event topic** : `librarymanagementsystem-adminops-service-branchpurchaseorder-deleted`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `branchPurchaseOrder` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`branchPurchaseOrder`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Index Event tregt-created

**Event topic**: `elastic-index-librarymanagementsystem_tregt-created`

**Event payload**:

```json
{
  "id": "ID",
  "_owner": "ID",
  "isActive": true,
  "recordVersion": "Integer",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## Index Event tregt-updated

**Event topic**: `elastic-index-librarymanagementsystem_tregt-created`

**Event payload**:

```json
{
  "id": "ID",
  "_owner": "ID",
  "isActive": true,
  "recordVersion": "Integer",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## Index Event tregt-deleted

**Event topic**: `elastic-index-librarymanagementsystem_tregt-deleted`

**Event payload**:

```json
{
  "id": "ID",
  "_owner": "ID",
  "isActive": true,
  "recordVersion": "Integer",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## Index Event tregt-extended

**Event topic**: `elastic-index-librarymanagementsystem_tregt-extended`

**Event payload**:

```js
{
  id: id,
  extends: {
    [extendName]: "Object",
    [extendName + "_count"]: "Number",
  },
}
```

# Route Events

Route events are emitted following the successful execution of a route. While most routes perform CRUD (Create, Read, Update, Delete) operations on data objects, resulting in route events that closely resemble database events, there are distinctions worth noting. A single route execution might trigger multiple CRUD actions and ElasticSearch indexing operations. However, for those primarily concerned with the overarching business logic and its outcomes, listening to the consolidated route event, published once at the conclusion of the route's execution, is more pertinent.

Moreover, routes often deliver aggregated data beyond the primary database object, catering to specific client needs. For instance, creating a data object via a route might not only return the entity's data but also route-specific metrics, such as the executing user's permissions related to the entity. Alternatively, a route might automatically generate default child entities following the creation of a parent object. Consequently, the route event encapsulates a unified dataset encompassing both the parent and its children, in contrast to individual events triggered for each entity created. Therefore, subscribing to route events can offer a richer, more contextually relevant set of information aligned with business logic.

The payload of a route event mirrors the REST response JSON of the route, providing a direct and comprehensive reflection of the data and metadata communicated to the client. This ensures that subscribers to route events receive a payload that encapsulates both the primary data involved and any additional information deemed significant at the business level, facilitating a deeper understanding and integration of the service's functional outcomes.

## Route Event branchstaffassignment-created

**Event topic** : `librarymanagementsystem-adminops-service-branchstaffassignment-created`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `branchStaffAssignment` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`branchStaffAssignment`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event branchstaffassignment-updated

**Event topic** : `librarymanagementsystem-adminops-service-branchstaffassignment-updated`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `branchStaffAssignment` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`branchStaffAssignment`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event branchstaffassignment-deleted

**Event topic** : `librarymanagementsystem-adminops-service-branchstaffassignment-deleted`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `branchStaffAssignment` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`branchStaffAssignment`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event issueescalation-created

**Event topic** : `librarymanagementsystem-adminops-service-issueescalation-created`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `issueEscalation` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`issueEscalation`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event issueescalation-updated

**Event topic** : `librarymanagementsystem-adminops-service-issueescalation-updated`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `issueEscalation` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`issueEscalation`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event issueescalation-deleted

**Event topic** : `librarymanagementsystem-adminops-service-issueescalation-deleted`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `issueEscalation` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`issueEscalation`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event mongoadminconfig-created

**Event topic** : `librarymanagementsystem-adminops-service-mongoadminconfig-created`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `mongoAdminConfig` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`mongoAdminConfig`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event mongoadminconfig-updated

**Event topic** : `librarymanagementsystem-adminops-service-mongoadminconfig-updated`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `mongoAdminConfig` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`mongoAdminConfig`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event mongoadminconfig-deleted

**Event topic** : `librarymanagementsystem-adminops-service-mongoadminconfig-deleted`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `mongoAdminConfig` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`mongoAdminConfig`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event externalnotificationconfig-created

**Event topic** : `librarymanagementsystem-adminops-service-externalnotificationconfig-created`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `externalNotificationConfig` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`externalNotificationConfig`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event externalnotificationconfig-updated

**Event topic** : `librarymanagementsystem-adminops-service-externalnotificationconfig-updated`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `externalNotificationConfig` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`externalNotificationConfig`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event externalnotificationconfig-deleted

**Event topic** : `librarymanagementsystem-adminops-service-externalnotificationconfig-deleted`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `externalNotificationConfig` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`externalNotificationConfig`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event systembackupaudit-created

**Event topic** : `librarymanagementsystem-adminops-service-systembackupaudit-created`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `systemBackupAudit` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`systemBackupAudit`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event systembackupaudit-updated

**Event topic** : `librarymanagementsystem-adminops-service-systembackupaudit-updated`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `systemBackupAudit` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`systemBackupAudit`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event systembackupaudit-deleted

**Event topic** : `librarymanagementsystem-adminops-service-systembackupaudit-deleted`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `systemBackupAudit` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`systemBackupAudit`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event branchpurchaseorder-created

**Event topic** : `librarymanagementsystem-adminops-service-branchpurchaseorder-created`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `branchPurchaseOrder` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`branchPurchaseOrder`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event branchpurchaseorder-updated

**Event topic** : `librarymanagementsystem-adminops-service-branchpurchaseorder-updated`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `branchPurchaseOrder` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`branchPurchaseOrder`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event branchpurchaseorder-deleted

**Event topic** : `librarymanagementsystem-adminops-service-branchpurchaseorder-deleted`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `branchPurchaseOrder` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`branchPurchaseOrder`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Index Event adminopssharetoken-created

**Event topic**: `elastic-index-librarymanagementsystem_adminopssharetoken-created`

**Event payload**:

```json
{
  "id": "ID",
  "_owner": "ID",
  "configName": "String",
  "objectName": "String",
  "objectId": "ID",
  "ownerId": "ID",
  "peopleOption": "String",
  "tokenPermissions": null,
  "allowedEmails": null,
  "expireDate": "Date",
  "isActive": true,
  "recordVersion": "Integer",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## Index Event adminopssharetoken-updated

**Event topic**: `elastic-index-librarymanagementsystem_adminopssharetoken-created`

**Event payload**:

```json
{
  "id": "ID",
  "_owner": "ID",
  "configName": "String",
  "objectName": "String",
  "objectId": "ID",
  "ownerId": "ID",
  "peopleOption": "String",
  "tokenPermissions": null,
  "allowedEmails": null,
  "expireDate": "Date",
  "isActive": true,
  "recordVersion": "Integer",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## Index Event adminopssharetoken-deleted

**Event topic**: `elastic-index-librarymanagementsystem_adminopssharetoken-deleted`

**Event payload**:

```json
{
  "id": "ID",
  "_owner": "ID",
  "configName": "String",
  "objectName": "String",
  "objectId": "ID",
  "ownerId": "ID",
  "peopleOption": "String",
  "tokenPermissions": null,
  "allowedEmails": null,
  "expireDate": "Date",
  "isActive": true,
  "recordVersion": "Integer",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## Index Event adminopssharetoken-extended

**Event topic**: `elastic-index-librarymanagementsystem_adminopssharetoken-extended`

**Event payload**:

```js
{
  id: id,
  extends: {
    [extendName]: "Object",
    [extendName + "_count"]: "Number",
  },
}
```

# Route Events

Route events are emitted following the successful execution of a route. While most routes perform CRUD (Create, Read, Update, Delete) operations on data objects, resulting in route events that closely resemble database events, there are distinctions worth noting. A single route execution might trigger multiple CRUD actions and ElasticSearch indexing operations. However, for those primarily concerned with the overarching business logic and its outcomes, listening to the consolidated route event, published once at the conclusion of the route's execution, is more pertinent.

Moreover, routes often deliver aggregated data beyond the primary database object, catering to specific client needs. For instance, creating a data object via a route might not only return the entity's data but also route-specific metrics, such as the executing user's permissions related to the entity. Alternatively, a route might automatically generate default child entities following the creation of a parent object. Consequently, the route event encapsulates a unified dataset encompassing both the parent and its children, in contrast to individual events triggered for each entity created. Therefore, subscribing to route events can offer a richer, more contextually relevant set of information aligned with business logic.

The payload of a route event mirrors the REST response JSON of the route, providing a direct and comprehensive reflection of the data and metadata communicated to the client. This ensures that subscribers to route events receive a payload that encapsulates both the primary data involved and any additional information deemed significant at the business level, facilitating a deeper understanding and integration of the service's functional outcomes.

## Route Event branchstaffassignment-created

**Event topic** : `librarymanagementsystem-adminops-service-branchstaffassignment-created`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `branchStaffAssignment` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`branchStaffAssignment`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event branchstaffassignment-updated

**Event topic** : `librarymanagementsystem-adminops-service-branchstaffassignment-updated`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `branchStaffAssignment` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`branchStaffAssignment`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event branchstaffassignment-deleted

**Event topic** : `librarymanagementsystem-adminops-service-branchstaffassignment-deleted`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `branchStaffAssignment` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`branchStaffAssignment`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event issueescalation-created

**Event topic** : `librarymanagementsystem-adminops-service-issueescalation-created`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `issueEscalation` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`issueEscalation`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event issueescalation-updated

**Event topic** : `librarymanagementsystem-adminops-service-issueescalation-updated`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `issueEscalation` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`issueEscalation`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event issueescalation-deleted

**Event topic** : `librarymanagementsystem-adminops-service-issueescalation-deleted`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `issueEscalation` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`issueEscalation`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event mongoadminconfig-created

**Event topic** : `librarymanagementsystem-adminops-service-mongoadminconfig-created`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `mongoAdminConfig` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`mongoAdminConfig`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event mongoadminconfig-updated

**Event topic** : `librarymanagementsystem-adminops-service-mongoadminconfig-updated`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `mongoAdminConfig` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`mongoAdminConfig`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event mongoadminconfig-deleted

**Event topic** : `librarymanagementsystem-adminops-service-mongoadminconfig-deleted`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `mongoAdminConfig` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`mongoAdminConfig`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event externalnotificationconfig-created

**Event topic** : `librarymanagementsystem-adminops-service-externalnotificationconfig-created`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `externalNotificationConfig` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`externalNotificationConfig`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event externalnotificationconfig-updated

**Event topic** : `librarymanagementsystem-adminops-service-externalnotificationconfig-updated`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `externalNotificationConfig` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`externalNotificationConfig`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event externalnotificationconfig-deleted

**Event topic** : `librarymanagementsystem-adminops-service-externalnotificationconfig-deleted`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `externalNotificationConfig` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`externalNotificationConfig`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event systembackupaudit-created

**Event topic** : `librarymanagementsystem-adminops-service-systembackupaudit-created`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `systemBackupAudit` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`systemBackupAudit`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event systembackupaudit-updated

**Event topic** : `librarymanagementsystem-adminops-service-systembackupaudit-updated`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `systemBackupAudit` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`systemBackupAudit`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event systembackupaudit-deleted

**Event topic** : `librarymanagementsystem-adminops-service-systembackupaudit-deleted`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `systemBackupAudit` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`systemBackupAudit`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event branchpurchaseorder-created

**Event topic** : `librarymanagementsystem-adminops-service-branchpurchaseorder-created`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `branchPurchaseOrder` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`branchPurchaseOrder`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event branchpurchaseorder-updated

**Event topic** : `librarymanagementsystem-adminops-service-branchpurchaseorder-updated`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `branchPurchaseOrder` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`branchPurchaseOrder`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

## Route Event branchpurchaseorder-deleted

**Event topic** : `librarymanagementsystem-adminops-service-branchpurchaseorder-deleted`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `branchPurchaseOrder` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`branchPurchaseOrder`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

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

# Copyright

All sources, documents and other digital materials are copyright of .

# About Us

For more information please visit our website: .

.
.

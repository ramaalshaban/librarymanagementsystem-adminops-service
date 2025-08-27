const { ServicePublisher } = require("serviceCommon");

// BranchStaffAssignment Event Publisher Classes

// Publisher class for createBranchStaffAssignment route
const { BranchstaffassignmentCreatedTopic } = require("./topics");
class BranchstaffassignmentCreatedPublisher extends ServicePublisher {
  constructor(branchstaffassignment, session, requestId) {
    super(
      BranchstaffassignmentCreatedTopic,
      branchstaffassignment,
      session,
      requestId,
    );
  }

  static async Publish(branchstaffassignment, session, requestId) {
    const _publisher = new BranchstaffassignmentCreatedPublisher(
      branchstaffassignment,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

// Publisher class for updateBranchStaffAssignment route
const { BranchstaffassignmentUpdatedTopic } = require("./topics");
class BranchstaffassignmentUpdatedPublisher extends ServicePublisher {
  constructor(branchstaffassignment, session, requestId) {
    super(
      BranchstaffassignmentUpdatedTopic,
      branchstaffassignment,
      session,
      requestId,
    );
  }

  static async Publish(branchstaffassignment, session, requestId) {
    const _publisher = new BranchstaffassignmentUpdatedPublisher(
      branchstaffassignment,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

// Publisher class for deleteBranchStaffAssignment route
const { BranchstaffassignmentDeletedTopic } = require("./topics");
class BranchstaffassignmentDeletedPublisher extends ServicePublisher {
  constructor(branchstaffassignment, session, requestId) {
    super(
      BranchstaffassignmentDeletedTopic,
      branchstaffassignment,
      session,
      requestId,
    );
  }

  static async Publish(branchstaffassignment, session, requestId) {
    const _publisher = new BranchstaffassignmentDeletedPublisher(
      branchstaffassignment,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

// IssueEscalation Event Publisher Classes

// Publisher class for createIssueEscalation route
const { IssueescalationCreatedTopic } = require("./topics");
class IssueescalationCreatedPublisher extends ServicePublisher {
  constructor(issueescalation, session, requestId) {
    super(IssueescalationCreatedTopic, issueescalation, session, requestId);
  }

  static async Publish(issueescalation, session, requestId) {
    const _publisher = new IssueescalationCreatedPublisher(
      issueescalation,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

// Publisher class for updateIssueEscalation route
const { IssueescalationUpdatedTopic } = require("./topics");
class IssueescalationUpdatedPublisher extends ServicePublisher {
  constructor(issueescalation, session, requestId) {
    super(IssueescalationUpdatedTopic, issueescalation, session, requestId);
  }

  static async Publish(issueescalation, session, requestId) {
    const _publisher = new IssueescalationUpdatedPublisher(
      issueescalation,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

// Publisher class for deleteIssueEscalation route
const { IssueescalationDeletedTopic } = require("./topics");
class IssueescalationDeletedPublisher extends ServicePublisher {
  constructor(issueescalation, session, requestId) {
    super(IssueescalationDeletedTopic, issueescalation, session, requestId);
  }

  static async Publish(issueescalation, session, requestId) {
    const _publisher = new IssueescalationDeletedPublisher(
      issueescalation,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

// MongoAdminConfig Event Publisher Classes

// Publisher class for createMongoAdminConfig route
const { MongoadminconfigCreatedTopic } = require("./topics");
class MongoadminconfigCreatedPublisher extends ServicePublisher {
  constructor(mongoadminconfig, session, requestId) {
    super(MongoadminconfigCreatedTopic, mongoadminconfig, session, requestId);
  }

  static async Publish(mongoadminconfig, session, requestId) {
    const _publisher = new MongoadminconfigCreatedPublisher(
      mongoadminconfig,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

// Publisher class for updateMongoAdminConfig route
const { MongoadminconfigUpdatedTopic } = require("./topics");
class MongoadminconfigUpdatedPublisher extends ServicePublisher {
  constructor(mongoadminconfig, session, requestId) {
    super(MongoadminconfigUpdatedTopic, mongoadminconfig, session, requestId);
  }

  static async Publish(mongoadminconfig, session, requestId) {
    const _publisher = new MongoadminconfigUpdatedPublisher(
      mongoadminconfig,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

// Publisher class for deleteMongoAdminConfig route
const { MongoadminconfigDeletedTopic } = require("./topics");
class MongoadminconfigDeletedPublisher extends ServicePublisher {
  constructor(mongoadminconfig, session, requestId) {
    super(MongoadminconfigDeletedTopic, mongoadminconfig, session, requestId);
  }

  static async Publish(mongoadminconfig, session, requestId) {
    const _publisher = new MongoadminconfigDeletedPublisher(
      mongoadminconfig,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

// ExternalNotificationConfig Event Publisher Classes

// Publisher class for createExternalNotificationConfig route
const { ExternalnotificationconfigCreatedTopic } = require("./topics");
class ExternalnotificationconfigCreatedPublisher extends ServicePublisher {
  constructor(externalnotificationconfig, session, requestId) {
    super(
      ExternalnotificationconfigCreatedTopic,
      externalnotificationconfig,
      session,
      requestId,
    );
  }

  static async Publish(externalnotificationconfig, session, requestId) {
    const _publisher = new ExternalnotificationconfigCreatedPublisher(
      externalnotificationconfig,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

// Publisher class for updateExternalNotificationConfig route
const { ExternalnotificationconfigUpdatedTopic } = require("./topics");
class ExternalnotificationconfigUpdatedPublisher extends ServicePublisher {
  constructor(externalnotificationconfig, session, requestId) {
    super(
      ExternalnotificationconfigUpdatedTopic,
      externalnotificationconfig,
      session,
      requestId,
    );
  }

  static async Publish(externalnotificationconfig, session, requestId) {
    const _publisher = new ExternalnotificationconfigUpdatedPublisher(
      externalnotificationconfig,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

// Publisher class for deleteExternalNotificationConfig route
const { ExternalnotificationconfigDeletedTopic } = require("./topics");
class ExternalnotificationconfigDeletedPublisher extends ServicePublisher {
  constructor(externalnotificationconfig, session, requestId) {
    super(
      ExternalnotificationconfigDeletedTopic,
      externalnotificationconfig,
      session,
      requestId,
    );
  }

  static async Publish(externalnotificationconfig, session, requestId) {
    const _publisher = new ExternalnotificationconfigDeletedPublisher(
      externalnotificationconfig,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

// SystemBackupAudit Event Publisher Classes

// Publisher class for createSystemBackupAudit route
const { SystembackupauditCreatedTopic } = require("./topics");
class SystembackupauditCreatedPublisher extends ServicePublisher {
  constructor(systembackupaudit, session, requestId) {
    super(SystembackupauditCreatedTopic, systembackupaudit, session, requestId);
  }

  static async Publish(systembackupaudit, session, requestId) {
    const _publisher = new SystembackupauditCreatedPublisher(
      systembackupaudit,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

// Publisher class for updateSystemBackupAudit route
const { SystembackupauditUpdatedTopic } = require("./topics");
class SystembackupauditUpdatedPublisher extends ServicePublisher {
  constructor(systembackupaudit, session, requestId) {
    super(SystembackupauditUpdatedTopic, systembackupaudit, session, requestId);
  }

  static async Publish(systembackupaudit, session, requestId) {
    const _publisher = new SystembackupauditUpdatedPublisher(
      systembackupaudit,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

// Publisher class for deleteSystemBackupAudit route
const { SystembackupauditDeletedTopic } = require("./topics");
class SystembackupauditDeletedPublisher extends ServicePublisher {
  constructor(systembackupaudit, session, requestId) {
    super(SystembackupauditDeletedTopic, systembackupaudit, session, requestId);
  }

  static async Publish(systembackupaudit, session, requestId) {
    const _publisher = new SystembackupauditDeletedPublisher(
      systembackupaudit,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

// BranchPurchaseOrder Event Publisher Classes

// Publisher class for createBranchPurchaseOrder route
const { BranchpurchaseorderCreatedTopic } = require("./topics");
class BranchpurchaseorderCreatedPublisher extends ServicePublisher {
  constructor(branchpurchaseorder, session, requestId) {
    super(
      BranchpurchaseorderCreatedTopic,
      branchpurchaseorder,
      session,
      requestId,
    );
  }

  static async Publish(branchpurchaseorder, session, requestId) {
    const _publisher = new BranchpurchaseorderCreatedPublisher(
      branchpurchaseorder,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

// Publisher class for updateBranchPurchaseOrder route
const { BranchpurchaseorderUpdatedTopic } = require("./topics");
class BranchpurchaseorderUpdatedPublisher extends ServicePublisher {
  constructor(branchpurchaseorder, session, requestId) {
    super(
      BranchpurchaseorderUpdatedTopic,
      branchpurchaseorder,
      session,
      requestId,
    );
  }

  static async Publish(branchpurchaseorder, session, requestId) {
    const _publisher = new BranchpurchaseorderUpdatedPublisher(
      branchpurchaseorder,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

// Publisher class for deleteBranchPurchaseOrder route
const { BranchpurchaseorderDeletedTopic } = require("./topics");
class BranchpurchaseorderDeletedPublisher extends ServicePublisher {
  constructor(branchpurchaseorder, session, requestId) {
    super(
      BranchpurchaseorderDeletedTopic,
      branchpurchaseorder,
      session,
      requestId,
    );
  }

  static async Publish(branchpurchaseorder, session, requestId) {
    const _publisher = new BranchpurchaseorderDeletedPublisher(
      branchpurchaseorder,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

// Tregt Event Publisher Classes

// AdminOpsShareToken Event Publisher Classes

module.exports = {
  BranchstaffassignmentCreatedPublisher,
  BranchstaffassignmentUpdatedPublisher,
  BranchstaffassignmentDeletedPublisher,
  IssueescalationCreatedPublisher,
  IssueescalationUpdatedPublisher,
  IssueescalationDeletedPublisher,
  MongoadminconfigCreatedPublisher,
  MongoadminconfigUpdatedPublisher,
  MongoadminconfigDeletedPublisher,
  ExternalnotificationconfigCreatedPublisher,
  ExternalnotificationconfigUpdatedPublisher,
  ExternalnotificationconfigDeletedPublisher,
  SystembackupauditCreatedPublisher,
  SystembackupauditUpdatedPublisher,
  SystembackupauditDeletedPublisher,
  BranchpurchaseorderCreatedPublisher,
  BranchpurchaseorderUpdatedPublisher,
  BranchpurchaseorderDeletedPublisher,
};

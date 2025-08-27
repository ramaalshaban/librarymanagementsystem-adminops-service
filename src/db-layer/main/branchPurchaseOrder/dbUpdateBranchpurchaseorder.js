const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");
const { BranchPurchaseOrder } = require("models");

const { DBUpdateMongooseCommand } = require("dbCommand");

const {
  BranchPurchaseOrderQueryCacheInvalidator,
} = require("./query-cache-classes");

const { ElasticIndexer } = require("serviceCommon");
const getBranchPurchaseOrderById = require("./utils/getBranchPurchaseOrderById");

class DbUpdateBranchpurchaseorderCommand extends DBUpdateMongooseCommand {
  constructor(input) {
    const instanceMode = true;
    input.isBulk = false;
    input.updateEach = false;
    super(input, BranchPurchaseOrder, instanceMode);
    this.commandName = "dbUpdateBranchpurchaseorder";
    this.nullResult = false;
    this.objectName = "branchPurchaseOrder";
    this.serviceLabel = "librarymanagementsystem-adminops-service";
    this.joinedCriteria = false;
    this.dbEvent =
      "librarymanagementsystem-adminops-service-dbevent-branchpurchaseorder-updated";
  }

  loadHookFunctions() {
    super.loadHookFunctions({});
  }

  initOwnership(input) {
    super.initOwnership(input);
  }

  async transposeResult() {
    // transpose dbData
  }

  async createQueryCacheInvalidator() {
    this.queryCacheInvalidator = new BranchPurchaseOrderQueryCacheInvalidator();
  }

  async indexDataToElastic() {
    const elasticIndexer = new ElasticIndexer(
      "branchPurchaseOrder",
      this.session,
      this.requestId,
    );
    const dbData = await getBranchPurchaseOrderById(this.dbData.id);
    await elasticIndexer.indexData(dbData);
  }

  // ask about this should i rename the whereClause to dataClause???

  async setCalculatedFieldsAfterInstance(data) {
    const input = this.input;
  }
}

const dbUpdateBranchpurchaseorder = async (input) => {
  input.id = input.branchPurchaseOrderId;
  const dbUpdateCommand = new DbUpdateBranchpurchaseorderCommand(input);
  return await dbUpdateCommand.execute();
};

module.exports = dbUpdateBranchpurchaseorder;

// exsik olan :
//if exits update and if not exits create
//if index.onDuplicate == "throwError" throw error
//

const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");

const { BranchPurchaseOrder } = require("models");

const { DBCreateMongooseCommand } = require("dbCommand");

const {
  BranchPurchaseOrderQueryCacheInvalidator,
} = require("./query-cache-classes");

const { ElasticIndexer } = require("serviceCommon");
const getBranchPurchaseOrderById = require("./utils/getBranchPurchaseOrderById");

class DbCreateBranchpurchaseorderCommand extends DBCreateMongooseCommand {
  constructor(input) {
    super(input);
    this.commandName = "dbCreateBranchpurchaseorder";
    this.objectName = "branchPurchaseOrder";
    this.serviceLabel = "librarymanagementsystem-adminops-service";
    this.dbEvent =
      "librarymanagementsystem-adminops-service-dbevent-branchpurchaseorder-created";
  }

  loadHookFunctions() {
    super.loadHookFunctions({});
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

  async create_childs() {}

  async transposeResult() {
    // transpose dbData
  }

  async runDbCommand() {
    await super.runDbCommand();

    let branchPurchaseOrder = null;
    let whereClause = {};
    let updated = false;
    let exists = false;
    try {
      if (!updated && this.dataClause.id && !exists) {
        branchPurchaseOrder =
          branchPurchaseOrder ||
          (await BranchPurchaseOrder.findById(this.dataClause.id));
        if (branchPurchaseOrder) {
          delete this.dataClause.id;
          this.dataClause.isActive = true;
          await branchPurchaseOrder.update(this.dataClause);
          updated = true;
        }
      }
    } catch (error) {
      const eDetail = {
        dataClause: this.dataClause,
        errorStack: error.stack,
        checkoutResult: this.input.checkoutResult,
      };
      throw new HttpServerError(
        "Error in checking unique index when creating BranchPurchaseOrder",
        eDetail,
      );
    }

    if (!updated && !exists) {
      branchPurchaseOrder = await BranchPurchaseOrder.create(this.dataClause);
    }

    this.dbData = branchPurchaseOrder.getData();
    this.input.branchPurchaseOrder = this.dbData;
    await this.create_childs();
  }
}

const dbCreateBranchpurchaseorder = async (input) => {
  const dbCreateCommand = new DbCreateBranchpurchaseorderCommand(input);
  return await dbCreateCommand.execute();
};

module.exports = dbCreateBranchpurchaseorder;

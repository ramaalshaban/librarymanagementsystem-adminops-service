const { expect } = require("chai");
const sinon = require("sinon");
const proxyquire = require("proxyquire");

//For these tests to work we need to export GetBranchStaffAssignmentRestController also from file getbranchstaffassignment.js
describe("GetBranchStaffAssignmentRestController", () => {
  let GetBranchStaffAssignmentRestController, getBranchStaffAssignment;
  let GetBranchStaffAssignmentManagerStub, processRequestStub;
  let req, res, next;

  beforeEach(() => {
    req = { requestId: "req-456" };
    res = {
      status: sinon.stub().returnsThis(),
      send: sinon.stub(),
    };
    next = sinon.stub();

    // Stub for GetBranchStaffAssignmentManager constructor
    GetBranchStaffAssignmentManagerStub = sinon.stub();

    // Stub for processRequest inherited from RestController
    processRequestStub = sinon.stub();

    // Proxyquire module under test with mocks
    ({ GetBranchStaffAssignmentRestController, getBranchStaffAssignment } =
      proxyquire(
        "../../../src/controllers-layer/rest-layer/main/branchStaffAssignment/get-branchstaffassignment.js",
        {
          serviceCommon: {
            HexaLogTypes: {},
            hexaLogger: { insertInfo: sinon.stub(), insertError: sinon.stub() },
          },
          managers: {
            GetBranchStaffAssignmentManager:
              GetBranchStaffAssignmentManagerStub,
          },
          "../../AdminOpsServiceRestController": class {
            constructor(name, routeName, _req, _res, _next) {
              this.name = name;
              this.routeName = routeName;
              this._req = _req;
              this._res = _res;
              this._next = _next;
              this.processRequest = processRequestStub;
            }
          },
        },
      ));
  });

  afterEach(() => {
    sinon.restore();
  });

  describe("GetBranchStaffAssignmentRestController class", () => {
    it("should extend RestController with correct values", () => {
      const controller = new GetBranchStaffAssignmentRestController(
        req,
        res,
        next,
      );

      expect(controller.name).to.equal("getBranchStaffAssignment");
      expect(controller.routeName).to.equal("getbranchstaffassignment");
      expect(controller.dataName).to.equal("branchStaffAssignment");
      expect(controller.crudType).to.equal("get");
      expect(controller.status).to.equal(200);
      expect(controller.httpMethod).to.equal("GET");
    });

    it("should create GetBranchStaffAssignmentManager in createApiManager()", () => {
      const controller = new GetBranchStaffAssignmentRestController(
        req,
        res,
        next,
      );
      controller._req = req;

      controller.createApiManager();

      expect(
        GetBranchStaffAssignmentManagerStub.calledOnceWithExactly(req, "rest"),
      ).to.be.true;
    });
  });

  describe("getBranchStaffAssignment function", () => {
    it("should create instance and call processRequest", async () => {
      await getBranchStaffAssignment(req, res, next);

      expect(processRequestStub.calledOnce).to.be.true;
    });
  });
});

const { expect } = require("chai");
const sinon = require("sinon");
const proxyquire = require("proxyquire");

describe("CreateExternalNotificationConfig", () => {
  let ControllerClass;
  let req;

  beforeEach(() => {
    req = {
      inputData: {},
      body: {},
      query: {},
    };

    ControllerClass = proxyquire(
      "../../../../src/manager-layer/main/ExternalNotificationConfig/create-externalnotificationconfig",
      {
        "./ExternalNotificationConfigManager": class {
          constructor(request, options) {
            this.request = request;
            this.options = options;
            this.session = {
              _USERID: "u1",
              email: "a@b.com",
              fullname: "Test User",
            };
            this.bodyParams = {};
            this.readTenantId = sinon.stub();
          }
        },
      },
    );
  });

  it("should initialize controller with correct base properties", () => {
    const instance = new ControllerClass(req, "rest");
    expect(instance.options.name).to.equal("createExternalNotificationConfig");
    expect(instance.options.controllerType).to.equal("rest");
    expect(instance.options.crudType).to.equal("create");
    expect(instance.dataName).to.equal("externalNotificationConfig");
  });
});

//// Other tests will be added later

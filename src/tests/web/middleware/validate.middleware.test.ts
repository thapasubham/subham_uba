import Sinon from "sinon";
import {
  checkQuery,
  validate,
} from "../../../app/web/middleware/validate.middleware.js";
import { ResponseApi } from "../../../utils/ApiResponse.js";

describe("Middleware tests", () => {
  let req: any;
  let res: any;
  let sendStub: Sinon.SinonStub;
  let statusStub: Sinon.SinonStub;
  let writeErrorStub: Sinon.SinonStub;
  let callback: Sinon.SinonStub;

  beforeEach(() => {
    writeErrorStub = Sinon.stub(ResponseApi, "WriteError");
    callback = Sinon.stub();
    sendStub = Sinon.stub().returnsThis();
    statusStub = Sinon.stub();

    res = {
      status: statusStub,
      send: sendStub,
    };
  });

  afterEach(() => {
    writeErrorStub.restore();
  });
  describe("Validate test suite", () => {
    it("Missing fields in body", () => {
      req = {
        body: {
          firstname: "Subham",
        },
      };
      validate(req, res, callback);

      Sinon.assert.calledOnce(writeErrorStub);
      Sinon.assert.calledWith(writeErrorStub, res, {
        message: "Missing fields",
        status: 400,
      });
    });
    it("Full body is sent", () => {
      req = {
        body: {
          firstname: "Subham",
          lastname: "Thapa",
          email: "subham@gmail.com",
          phoneNumber: "9807846735",
        },
      };
      validate(req, res, callback);

      Sinon.assert.calledOnce(callback);
    });
  });

  describe("Checking query test suite", () => {
    it("some missing query", () => {
      req = {
        query: {
          limit: "4",
        },
      };
      checkQuery(req, res, callback);

      Sinon.assert.calledOnce(writeErrorStub);
      Sinon.assert.calledWith(writeErrorStub, res, {
        message: "Query not satisfied",
        status: 404,
      });
    });

    it("All the query is sent", () => {
      req = {
        query: {
          limit: "4",
          offset: "3",
        },
      };
      checkQuery(req, res, callback);

      Sinon.assert.calledOnce(callback);
    });
  });
});

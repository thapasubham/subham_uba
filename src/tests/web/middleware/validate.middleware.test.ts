import Sinon from "sinon";
import {
  checkID,
  checkQuery,
  validate,
  validateIntern,
  validateLogin,
} from "../../../app/web/middleware/validate.middleware.js";
import { ResponseApi } from "../../../utils/ApiResponse.js";
import { expect } from "chai";

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

    it("Empty body", () => {
      req = {
        body: {},
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
          intern: 4,
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

  describe("check the type of the id", () => {
    it("When the id isnt a number", () => {
      req = {
        params: {
          id: "someString",
        },
      };
      checkID(req, res, callback);
      Sinon.assert.calledWith(writeErrorStub, res, {
        status: 404,
        message: "ID cannot be string",
      });

      it("Correct id type test", () => {
        req = {
          params: {
            id: 42,
          },
        };
        checkID(req, res, callback);
        Sinon.assert.calledOnce(callback);
      });
    });
  });

  describe("validate Intern", () => {
    it("When no body", () => {
      req = {};

      const data = () => validateIntern(req, res, callback);

      expect(data).to.throw(Error);
    });

    it("When empty body", () => {
      req = {
        body: {},
      };

      validateIntern(req, res, callback);
      Sinon.assert.calledOnce(writeErrorStub);
      Sinon.assert.calledWith(writeErrorStub, res, {
        message: "Missing fields",
        status: 400,
      });
    });

    it("When the correct body is provided", () => {
      req = {
        body: { name: "Full-stack" },
      };

      validateIntern(req, res, callback);
      Sinon.assert.calledOnce(callback);
    });
  });

  describe("Login validate", () => {
    it("When no body", () => {
      req = {};

      const data = () => validateLogin  (req, res, callback);

      expect(data).to.throw(Error);
    });

    it("When empty body", () => {
      req = {
        body: {},
      };

      validateLogin(req, res, callback);
      Sinon.assert.calledOnce(writeErrorStub);
      Sinon.assert.calledWith(writeErrorStub, res, {
        message: "Missing fields",
        status: 400,
      });
    });

    it("When the correct body is provided", () => {
      req = {
        body: { email: "test@login.com", password: "password123" },
      };

      validateLogin(req, res, callback);
      Sinon.assert.calledOnce(callback);
    });
  });
});

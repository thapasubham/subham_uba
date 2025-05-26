import Sinon from "sinon";
import jwt from "jsonwebtoken";
import { Auth } from "../../../app/web/auth/authorization.js";
import { assert, expect } from "chai";
import { HttpError } from "../../../app/web/middleware/error.js";
import { constants } from "../../../constants/constant.js";
import { RolesDB } from "../../../app/web/database/roles.db.js";
import { Role } from "../../../entity/role.js";

describe("Auth Middleware", () => {
  let req: any;
  let res: any;
  let next: Sinon.SinonSpy;
  let verifyStub: Sinon.SinonStub;
  let getPermissionStub: Sinon.SinonStub;
  let readRoleStub: Sinon.SinonStub;
  beforeEach(() => {
    req = { headers: {}, params: {} };
    res = {};
    next = Sinon.spy();
    verifyStub = Sinon.stub(jwt, "verify");
    getPermissionStub = Sinon.stub(Auth, "getPermission");
    readRoleStub = Sinon.stub(RolesDB, "ReadRole");
  });

  afterEach(() => {
    Sinon.restore();
  });

  it("throws error if no Authorization header", async () => {
    const middleware = Auth.isAuthorized("view");

    try {
      await middleware(req, res, next);
    } catch (err) {
      expect(err).to.be.instanceOf(HttpError);
      expect(err.message).to.equal(constants.UNAUTHORIZED_MSG);
    }
  });

  it("calls next() if token is valid and id matches", async () => {
    req = {
      headers: {
        authorization: "Bearer faketoken",
      },
      params: {
        id: "123",
      },
    };
    verifyStub.returns({ id: "123", role: "user" });
    getPermissionStub.returns(["view", "edit"]);
    const middleware = Auth.isAuthorized("view");
    await middleware(req, res, next);

    Sinon.assert.calledOnce(next);
  });

  it("throws error if id does not match and role is not admin", async () => {
    req = {
      headers: {
        authorization: "Bearer faketoken",
      },
      params: {
        id: "251",
      },
    };
    verifyStub.returns({ id: "123", role: "user" });

    const middleware = Auth.isAuthorized("view");

    try {
      await middleware(req, res, next);
    } catch (err) {
      expect(err).to.be.instanceOf(HttpError);
      expect(err.message).to.equal("Unauthorized");
    }
  });

  it("calls next() if role is admin even if id does not match", async () => {
    req = {
      headers: {
        authorization: "Bearer faketoken",
      },
      params: {
        id: "120",
      },
    };
    verifyStub.returns({ id: "123", role: "admin" });
    getPermissionStub.returns(["view", "edit"]);
    const middleware = Auth.isAuthorized("view");
    await middleware(req, res, next);

    Sinon.assert.calledOnce(next);
  });

  it("throws error when token is invalid", async () => {
    req = {
      headers: {
        authorization: "Bearer faketoken",
      },
    };
    verifyStub.throws(new HttpError("Invalid Token"));
    getPermissionStub.returns(["view"]);
    const middleware = Auth.isAuthorized("view");

    try {
      await middleware(req, res, next);
    } catch (err) {
      expect(err).to.be.instanceOf(HttpError);
      expect(err.message).to.equal("Invalid Token");
    }
  });

  describe("Sign Test", () => {
    let signStub: Sinon.SinonStub;
    beforeEach(() => {
      signStub = Sinon.stub(jwt, "sign");
    });

    afterEach(() => {
      signStub.restore();
    });

    it("Signing test", () => {
      const bearerToken = "bearerToken";
      const refreshToken = "bearerToken";

      Auth.Sign(892834, 4);

      Sinon.assert.calledTwice(signStub);
    });
  });
});

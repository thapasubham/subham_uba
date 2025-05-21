import Sinon from "sinon";
import jwt from "jsonwebtoken";
import { Auth } from "../../../app/web/auth/jwt";
import { ResponseApi } from "../../../utils/ApiResponse";
import { expect } from "chai";

describe("", () => {
  describe("JWT", () => {
    let res: any;
    let req: any;
    let verifyStub: Sinon.SinonStub;
    let responseWrite: Sinon.SinonStub;
    let sendStub: Sinon.SinonStub;
    let statusStub: Sinon.SinonStub;

    let callback: Sinon.SinonStub;
    beforeEach(() => {
      statusStub = Sinon.stub().returnsThis();
      callback = Sinon.stub();
      sendStub = Sinon.stub();
      verifyStub = Sinon.stub(jwt, "verify");
      responseWrite = Sinon.stub(ResponseApi, "WriteResponse");
      res = {
        send: sendStub,
        status: statusStub,
      };
    });
    afterEach(() => {
      responseWrite.restore();
      verifyStub.restore();
    });
    it("No authorization given in header", () => {
      req = { headers: {} };
      verifyStub.returns("");
      Auth.isAuthorized(req, res, callback);
      Sinon.assert.calledOnce(responseWrite);
      Sinon.assert.calledWith(responseWrite, res, {
        status: 401,
        message: "Unauthorized",
      });
    });
    it("should call next() if token is valid and id matches", () => {
      req = {
        headers: {
          authorization: "bearer fakejwt",
        },
        params: {
          id: "1235454",
        },
      };
      const fakeDecode = { id: "1235454" };
      verifyStub.returns(fakeDecode);

      Auth.isAuthorized(req, res, callback);

      Sinon.assert.calledOnce(callback);
    });
    it("when the id doesnt match the jwt id", () => {
      req = {
        headers: {
          authorization: "bearer fakejwt",
        },
        params: {
          id: "123334",
        },
      };
      const fakeDecode = { id: "1235454", role: "user" };
      verifyStub.returns(fakeDecode);

      Auth.isAuthorized(req, res, callback);
      Sinon.assert.calledWith(responseWrite, res, {
        status: 401,
        message: "Unauthorized",
      });
    });
    it("when the id doesnt but role is admin", () => {
      req = {
        headers: {
          authorization: "bearer fakejwt",
        },
        params: {
          id: "123334",
        },
      };
      const fakeDecode = { id: "1454", role: "admin" };
      verifyStub.returns(fakeDecode);

      Auth.isAuthorized(req, res, callback);
      Sinon.assert.calledOnce(callback);
      it("When Token is invalid", () => {
        const data = () => Auth.isAuthorized(req, res, callback);
        expect(data).to.throw(Error);
      });
    });
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
      let bearerToken = "bearerToken";
      let refreshToken = "bearerToken";

      Auth.Sign(892834, "admin");

      Sinon.assert.calledTwice(signStub);
    });
  });
});

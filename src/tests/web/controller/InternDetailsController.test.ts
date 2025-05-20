import Sinon from "sinon";
import { InternDetailsController } from "../../../app/web/controller/InternDetailsController.js";
import { InternDetailsService } from "../../../app/web/services/InternDetailsService";
import { ResponseApi } from "../../../utils/ApiResponse.js";

describe("Intern detail tests", () => {
  const detailsController = new InternDetailsController();
  let req: any;
  let res: any;
  let sendStub: Sinon.SinonStub;
  let statusStub: Sinon.SinonStub;
  let writeResponseStub: Sinon.SinonStub;

  //create intern details
  describe("Create details test suite", () => {
    let createStub: Sinon.SinonStub;
    beforeEach(() => {
      createStub = Sinon.stub(InternDetailsService.prototype, "CreateIntern");
      sendStub = Sinon.stub();
      statusStub = Sinon.stub().returnsThis();
      writeResponseStub = Sinon.stub(ResponseApi, "WriteResponse");
      res = {
        status: statusStub,
        send: sendStub,
      };
    });
    afterEach(() => {
      createStub.restore();
      writeResponseStub.restore();
    });

    it("Create details", async () => {
      req = {
        body: {
          id: 5,
          userID: 1320,
          isCertify: false,
          internID: 1,
          menttorID: 9893,
        },
      };
      await detailsController.CreateIntern(req, res);
      Sinon.assert.calledWith(writeResponseStub, res, {
        status: 201,
        message: "Intern details created",
      });
    });
  });

  //details test
  describe("Get details test suite", () => {
    let detailsStub: Sinon.SinonStub;
    beforeEach(() => {
      detailsStub = Sinon.stub(InternDetailsService.prototype, "ReadIntern");
      sendStub = Sinon.stub();
      statusStub = Sinon.stub().returnsThis();
      writeResponseStub = Sinon.stub(ResponseApi, "WriteResponse");
      res = {
        status: statusStub,
        send: sendStub,
      };
    });
    afterEach(() => {
      detailsStub.restore();
      writeResponseStub.restore();
    });
    it("Get details", async () => {
      req = {
        query: {
          limit: 4,
          offset: 5,
        },
      };
      const intern_details = [
        {
          id: 4,
          userID: 13940,
          isCertify: false,
          internID: 1,
          menttorID: 9893,
        },
        {
          id: 8,
          userID: 139432,
          isCertify: false,
          internID: 2,
          menttorID: 93893,
        },
      ];
      detailsStub.returns(intern_details);
      await detailsController.GetInterns(req, res);
      Sinon.assert.calledOnce(detailsStub);
      Sinon.assert.calledWith(detailsStub, 4, 5);
      Sinon.assert.calledWith(writeResponseStub, res, {
        status: 200,
        data: intern_details,
      });
    });

    it("No data exists", async () => {
      req = {
        query: {
          limit: 4,
          offset: 5,
        },
      };
      const intern_details: any = [];
      detailsStub.returns(intern_details);
      await detailsController.GetInterns(req, res);
      Sinon.assert.calledOnce(detailsStub);
      Sinon.assert.calledWith(detailsStub, 4, 5);
      Sinon.assert.calledWith(writeResponseStub, res, {
        status: 404,
        message: "No data were found",
      });
    });
  });

  //details by id test
  describe("Get detail by id test suite", () => {
    let detailsStub: Sinon.SinonStub;
    beforeEach(() => {
      detailsStub = Sinon.stub(InternDetailsService.prototype, "ReadIntern");
      sendStub = Sinon.stub();
      statusStub = Sinon.stub().returnsThis();
      writeResponseStub = Sinon.stub(ResponseApi, "WriteResponse");
      res = {
        status: statusStub,
        send: sendStub,
      };
    });
    afterEach(() => {
      detailsStub.restore();
      writeResponseStub.restore();
    });
    it("Get details", async () => {
      req = {
        params: {
          id: "3",
        },
      };
      const intern_detail = {
        id: 8,
        userID: 139432,
        isCertify: false,
        internID: 2,
        menttorID: 93893,
      };
      detailsStub.returns(intern_detail);
      await detailsController.GetIntern(req, res);
      Sinon.assert.calledOnce(detailsStub);
      Sinon.assert.calledWith(detailsStub, 0, 0, 3);
      Sinon.assert.calledWith(writeResponseStub, res, {
        status: 200,
        data: intern_detail,
      });
    });

    it("Detail with given id doesnt exist", async () => {
      req = {
        params: {
          id: "4",
        },
      };
      await detailsController.GetIntern(req, res);
      Sinon.assert.calledOnce(detailsStub);
      Sinon.assert.calledWith(detailsStub, 0, 0, 4);
      Sinon.assert.calledWith(writeResponseStub, res, {
        status: 404,
        message: "No data were found",
      });
    });
  });
  //certify user test suite
  describe("Certify suite", () => {
    let certifyStub: Sinon.SinonStub;
    beforeEach(() => {
      certifyStub = Sinon.stub(InternDetailsService.prototype, "Certify");
      sendStub = Sinon.stub();
      statusStub = Sinon.stub().returnsThis();
      writeResponseStub = Sinon.stub(ResponseApi, "WriteResponse");
      res = {
        status: statusStub,
        send: sendStub,
      };
    });
    afterEach(() => {
      certifyStub.restore();
      writeResponseStub.restore();
    });

    it("Certify user", async () => {
      req = {
        params: {
          id: "4",
        },
      };

      await detailsController.Certify(req, res);
      Sinon.assert.calledOnce(writeResponseStub);
      Sinon.assert.calledWith(writeResponseStub, res, {
        status: 200,
        message: "Certification status updated",
      });
    });
    it("Fails to Certify user", async () => {
      req = {
        params: {
          id: "10",
        },
      };
      certifyStub.returns(0);

      await detailsController.Certify(req, res);
      Sinon.assert.calledOnce(writeResponseStub);
      Sinon.assert.calledWith(writeResponseStub, res, {
        status: 400,
        message: "Failed to update",
      });
    });
  });
});

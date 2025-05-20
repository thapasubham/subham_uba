import Sinon from "sinon";
import { InternController } from "../../../app/web/controller/InternController.js";
import { InternService } from "../../../app/web/services/InternService.js";
import { ResponseApi } from "../../../utils/ApiResponse.js";
import { Intern } from "../../../entity/user.js";

describe("Intern controller tests ", () => {
  let internController = new InternController();
  let req: any;
  let res: any;
  let sendStub: Sinon.SinonStub;
  let statusStub: Sinon.SinonStub;
  let writeResponseStub: Sinon.SinonStub;

  describe("Intern create test suites", () => {
    let createStub: Sinon.SinonStub;

    //setup
    beforeEach(() => {
      createStub = Sinon.stub(
        InternService.prototype,
        "CreateIntern"
      ).resolves();
      writeResponseStub = Sinon.stub(ResponseApi, "WriteResponse");
      statusStub = Sinon.stub().returnsThis();
      sendStub = Sinon.stub();

      res = {
        status: statusStub,
        send: sendStub,
      };
    });

    afterEach(() => {
      createStub.restore();
      writeResponseStub.restore();
    });

    it("Create intern Test case", async () => {
      req = {
        body: {
          name: "Full-stack",
        },
      };

      await internController.CreateIntern(req, res);
      Sinon.assert.calledOnce(createStub);
      Sinon.assert.calledWith(createStub, {
        name: "Full-stack",
      });
      Sinon.assert.calledOnce(writeResponseStub);
      Sinon.assert.calledWith(writeResponseStub, res, {
        status: 201,
        message: "Intern Created",
      });
    });
  });

  describe("Delete Intern test suite", () => {
    let deleteStub: Sinon.SinonStub;

    //setup
    beforeEach(() => {
      deleteStub = Sinon.stub(
        InternService.prototype,
        "DeleteIntern"
      ).resolves();
      writeResponseStub = Sinon.stub(ResponseApi, "WriteResponse");
      statusStub = Sinon.stub().returnsThis();
      sendStub = Sinon.stub();

      res = {
        status: statusStub,
        send: sendStub,
      };
    });

    //teardown
    afterEach(() => {
      deleteStub.restore();
      writeResponseStub.restore();
    });

    //testing
    it("Failed to Delete Intern", async () => {
      req = {
        params: {
          id: "10",
        },
      };
      deleteStub.returns(0);

      deleteStub.returns(0);
      await internController.DeleteIntern(req, res);

      Sinon.assert.calledOnce(deleteStub);
      Sinon.assert.calledWith(deleteStub, 10);

      Sinon.assert.calledOnce(writeResponseStub);
      Sinon.assert.calledWith(writeResponseStub, res, {
        status: 400,
        message: "Failed to delete intern",
      });
    });
    it("Delete Intern", async () => {
      req = {
        params: {
          id: "5",
        },
      };
      deleteStub.returns(1);
      let userData: Intern[] = [
        {
          id: 2,
          name: "DevOps",
        },
        {
          id: 4,
          name: "FUll-Stack",
        },
      ];
      await internController.DeleteIntern(req, res);

      Sinon.assert.calledOnce(deleteStub);
      Sinon.assert.calledWith(deleteStub, 5);

      Sinon.assert.calledOnce(writeResponseStub);
      Sinon.assert.calledWith(writeResponseStub, res, {
        status: 204,
        message: "Intern deleted",
      });
    });
  });

  //read intern test cases
  describe("", () => {
    let readStub: Sinon.SinonStub;

    //setup
    beforeEach(() => {
      readStub = Sinon.stub(InternService.prototype, "ReadIntern").resolves();
      writeResponseStub = Sinon.stub(ResponseApi, "WriteResponse");
      statusStub = Sinon.stub().returnsThis();
      sendStub = Sinon.stub();

      res = {
        status: statusStub,
        send: sendStub,
      };
    });

    //teardown
    afterEach(() => {
      readStub.restore();
      writeResponseStub.restore();
    });
    describe("Get intern test suite", () => {
      req = {
        params: {
          id: 5,
        },
      };
      it("No Intern exists", async () => {
        readStub.returns([]);
        await internController.GetInterns(req, res);
        Sinon.assert.calledOnce(readStub);

        Sinon.assert.calledOnce(writeResponseStub);
        Sinon.assert.calledWith(writeResponseStub, res, {
          status: 404,
          message: "No interns found",
        });
      });
      it("Interns exists", async () => {
        let userData: Intern[] = [
          {
            id: 2,
            name: "HR",
          },
          {
            id: 1,
            name: "FUll-Stack",
          },
          {
            id: 3,
            name: "DevOps",
          },
        ];
        readStub.returns(userData);
        await internController.GetInterns(req, res);
        Sinon.assert.calledOnce(readStub);

        Sinon.assert.calledOnce(writeResponseStub);
        Sinon.assert.calledWith(writeResponseStub, res, {
          status: 200,
          data: userData,
        });
      });
    });

    //single intern test case
    describe("Single intern test suite", () => {
      it("Intern doesnt exists", async () => {
        req = {
          params: {
            id: "4",
          },
        };

        await internController.GetIntern(req, res);
        Sinon.assert.calledOnce(readStub);
        // Sinon.assert.calledWith(readStub, 4);

        Sinon.assert.calledOnce(writeResponseStub);
        Sinon.assert.calledWith(writeResponseStub, res, {
          status: 404,
          message: "Intern not found",
        });
      });

      //intern exists
      it("Intern exists", async () => {
        let intern: Intern = {
          id: 4,
          name: "FUll-Stack",
        };
        req = {
          params: {
            id: 4,
          },
        };
        readStub.returns([intern]);
        await internController.GetIntern(req, res);
        Sinon.assert.calledOnce(readStub);
        Sinon.assert.calledWith(readStub, 4);

        Sinon.assert.calledOnce(writeResponseStub);
        Sinon.assert.calledWith(writeResponseStub, res, {
          status: 200,
          data: [intern],
        });
      });
    });
  });

  //test the update feature
  describe("Update intern test suite", () => {
    let updateStub: Sinon.SinonStub;

    //setup
    beforeEach(() => {
      updateStub = Sinon.stub(
        InternService.prototype,
        "UpdateIntern"
      ).resolves();
      writeResponseStub = Sinon.stub(ResponseApi, "WriteResponse");
      statusStub = Sinon.stub().returnsThis();
      sendStub = Sinon.stub();

      res = {
        status: statusStub,
        send: sendStub,
      };
    });

    //teardown
    afterEach(() => {
      updateStub.restore();
      writeResponseStub.restore();
    });
    it("Failed update intern", async () => {
      req = {
        body: {
          name: "Graphics Designer",
        },
        params: {
          id: "5",
        },
      };

      updateStub.returns(0);
      await internController.UpdateIntern(req, res);
      Sinon.assert.calledWith(writeResponseStub, res, {
        message: "Failed to update intern",
        status: 404,
      });
    });

    it("Update the intern", async () => {
      req = {
        body: {
          name: "Full-Stack",
        },
        params: {
          id: "10",
        },
      };

      updateStub.returns(1);
      await internController.UpdateIntern(req, res);
      Sinon.assert.calledOnce(updateStub);
      Sinon.assert.calledWith(writeResponseStub, res, {
        message: "Intern updated",
        status: 200,
      });
    });
  });
});

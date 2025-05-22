import Sinon from "sinon";
import { UserController } from "../../../app/web/controller/UserController.js";
import { UserService } from "../../../app/web/services/UserService.js";
import { ResponseApi } from "../../../utils/ApiResponse.js";
import {  User } from "../../../entity/user.js";
import {Role} from "../../../entity/role";

describe("User controller tests ", () => {
  const userController = new UserController();
  let req: any;
  let res: any;
  let sendStub: Sinon.SinonStub;
  let statusStub: Sinon.SinonStub;
  let writeResponseStub: Sinon.SinonStub;

  describe("User create test suites", () => {
    let createUserStub: Sinon.SinonStub;

    //setup
    beforeEach(() => {
      createUserStub = Sinon.stub(
        UserService.prototype,
        "CreateUser"
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
      createUserStub.restore();
      writeResponseStub.restore();
    });

    //create user test case
    it("Create user Test case", async () => {
      req = {
        body: {
          id: 0,
          firstname: "Subham",
          lastname: "Thapa",
          email: "subham@thapa.com",
          phoneNumber: "9874563210",
          intern: 5,
        },
      };

      await userController.CreateUser(req, res);
      Sinon.assert.calledOnce(createUserStub);
      Sinon.assert.calledWith(createUserStub, {
        firstname: "Subham",
        lastname: "Thapa",
        email: "subham@thapa.com",
        phoneNumber: "9874563210",
        intern: 5,

        id: Sinon.match.number,
      });
      Sinon.assert.calledOnce(writeResponseStub);
      Sinon.assert.calledWith(writeResponseStub, res, {
        status: 201,
        message: "User Created",
      });
    });
  });

  describe("Delete User test suite", () => {
    let deleteUserstub: Sinon.SinonStub;

    //setup
    beforeEach(() => {
      deleteUserstub = Sinon.stub(
        UserService.prototype,
        "DeleteUser"
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
      deleteUserstub.restore();
      writeResponseStub.restore();
    });

    //testing
    it("Failed to Delete User", async () => {
      req = {
        params: {
          id: "10",
        },
      };
      deleteUserstub.returns(0);
      const userData: User[] = [
        {
          firstname: "Test",
          lastname: "test",
          id: 5,
          email: "test@test.com",
          phoneNumber: "7482135964",
          role: new Role(),
        },
        {
          firstname: "John",
          lastname: "Black",
          id: 6,
          email: "johnblack",
          phoneNumber: "3246895214",
          role: new Role(),
        },
      ];

      deleteUserstub.returns(0);
      await userController.DeleteUser(req, res);

      Sinon.assert.calledOnce(deleteUserstub);
      Sinon.assert.calledWith(deleteUserstub, 10);

      Sinon.assert.calledOnce(writeResponseStub);
      Sinon.assert.calledWith(writeResponseStub, res, {
        status: 400,
        message: "Failed to delete user",
      });
    });
    it("Delete User", async () => {
      req = {
        params: {
          id: "5",
        },
      };
      deleteUserstub.returns(1);
      const userData: User[] = [
        {
          firstname: "Test",
          lastname: "user",
          id: 5,
          email: "test@user.com",
          phoneNumber: "7153486248",
          role: new Role(),
        },
        {
          firstname: "John",
          lastname: "Black",
          id: 6,
          email: "john@black.com",
          phoneNumber: "1724853694",
          role: new Role(),
        },
      ];
      await userController.DeleteUser(req, res);

      Sinon.assert.calledOnce(deleteUserstub);
      Sinon.assert.calledWith(deleteUserstub, 5);

      Sinon.assert.calledOnce(writeResponseStub);
      Sinon.assert.calledWith(writeResponseStub, res, {
        status: 204,
        message: "User Deleted",
      });
    });
  });

  //read user test cases
  describe("", () => {
    let readUserStub: Sinon.SinonStub;

    //setup
    beforeEach(() => {
      readUserStub = Sinon.stub(UserService.prototype, "ReadUsers").resolves();
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
      readUserStub.restore();
      writeResponseStub.restore();
    });
    describe("Get users test suite", () => {
      it("No User exists", async () => {
        req = {
          query: {
            limit: "1",
            offset: " 5",
          },
        };
        readUserStub.returns([]);
        await userController.GetUsers(req, res);
        Sinon.assert.calledOnce(readUserStub);
        Sinon.assert.calledWith(readUserStub, 1, 5);

        Sinon.assert.calledOnce(writeResponseStub);
        Sinon.assert.calledWith(writeResponseStub, res, {
          status: 404,
          message: "No User exists",
        });
      });
      it("Users exists", async () => {
        req = {
          query: {
            limit: "1",
            offset: " 5",
          },
        };
        let userData: User[] = [
          {
            firstname: "Subham",
            lastname: "Thapa",
            id: 6,
            email: "subham@thapa.com",
            phoneNumber: "986541275",
            role: new Role(),
          },
          {
            firstname: "John",
            lastname: "Pork",
            id: 40,
            email: "",
            phoneNumber: "",
            role: new Role(),
          },
          {
            firstname: "Lee",
            lastname: "Smith",
            id: 80,
            email: "le@smith.com",
            phoneNumber: "9821745630",
            role: new Role(),
          },
        ];
        readUserStub.returns(userData);
        await userController.GetUsers(req, res);
        Sinon.assert.calledOnce(readUserStub);
        Sinon.assert.calledWith(readUserStub, 1, 5);

        Sinon.assert.calledOnce(writeResponseStub);
        Sinon.assert.calledWith(writeResponseStub, res, {
          status: 200,
          data: userData,
        });
      });
    });

    //single user test case
    describe("Single user test suite", () => {
      it("User doesnt exists", async () => {
        req = {
          params: {
            id: "4",
          },
        };
        // readUserStub.returns([]);
        await userController.GetUser(req, res);
        Sinon.assert.calledOnce(readUserStub);
        Sinon.assert.calledWith(readUserStub, 0, 0, 4);

        Sinon.assert.calledOnce(writeResponseStub);
        Sinon.assert.calledWith(writeResponseStub, res, {
          status: 404,
          message: "User not found",
        });
      });

      //user exists
      it("Userexists", async () => {
        let user: User = {
          firstname: "subham",
          lastname: "thapa",
          id: 4,
          email: "subham@thapa.com",
          phoneNumber: "9412589634",
          role: new Role(),
        };
        req = {
          params: {
            id: "4",
          },
        };
        readUserStub.returns([user]);
        await userController.GetUser(req, res);
        Sinon.assert.calledOnce(readUserStub);
        Sinon.assert.calledWith(readUserStub, 0, 0, 4);

        Sinon.assert.calledOnce(writeResponseStub);
        Sinon.assert.calledWith(writeResponseStub, res, {
          status: 200,
          data: [user],
        });
      });
    });
  });

  //test the update feature
  describe("Update user test suite", () => {
    let updateStub: Sinon.SinonStub;

    //setup
    beforeEach(() => {
      updateStub = Sinon.stub(UserService.prototype, "Update").resolves();
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

    it("Update the user", async () => {
      req = {
        body: {
          firstname: "Subham",
          lastname: "Thapa",
          phoneNumber: "9854752314",
        },
        params: {
          id: "10",
        },
      };

      updateStub.returns(1);
      await userController.UpdateUser(req, res);
      Sinon.assert.calledOnce(updateStub);
      Sinon.assert.calledWith(writeResponseStub, res, {
        message: "User Updated",
        status: 200,
      });
    });
  });

  describe("login test", () => {
    let loginStub: Sinon.SinonStub;

    beforeEach(() => {
      loginStub = Sinon.stub(UserService.prototype, "Login");

      writeResponseStub = Sinon.stub(ResponseApi, "WriteResponse");
      statusStub = Sinon.stub().returnsThis();
      sendStub = Sinon.stub();

      res = {
        status: statusStub,
        send: sendStub,
      };
    });
    after(() => {
      Sinon.restore();
    });
    it("Epic test", async () => {
      req = {
        body: { email: "subham@gmail.com" },
      };
      const data = {
        accessToken: "accessToken",
        refreshToken: "refreshToken",
      };
      loginStub.returns(data);
      await userController.login(req, res);

      Sinon.assert.calledWith(writeResponseStub, res, {
        status: 200,
        data: data,
      });
    });
  });
});

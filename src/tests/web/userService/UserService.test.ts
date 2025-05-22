import Sinon from "sinon";
import { UserService } from "../../../app/web/services/UserService.js";
import { user } from "../../../entity/user.js";
import { assert } from "chai";
import { DataBase } from "../../../app/web/database/user.db.js";
import {Role} from "../../../entity/role";

describe("User Services tests", () => {
  const userService = new UserService();

  //test to create user
  describe("Create User test suite", () => {
    let saveUserStub: Sinon.SinonStub;
    beforeEach(() => {
      saveUserStub = Sinon.stub(DataBase, "Createuser");
    });
    afterEach(() => {
      saveUserStub.restore();
    });
    it("Create user test case", async () => {
      const user: user = {
        firstname: "Subham",
        lastname: "thapa",
        id: 5,
        email: "subham@gmail.com",
        phoneNumber: "9830827938",
        password: "Subham",
        role: new Role(),
      };
      saveUserStub.returns(user);
      const result = await userService.CreateUser(user);
      assert.equal(result, user);
      Sinon.assert.calledOnce(saveUserStub);
      Sinon.assert.calledWith(saveUserStub, user);
    });
  });

  //delete user
  describe("Delete User test suite", () => {
    let deleteuserStub: Sinon.SinonStub;
    beforeEach(() => {
      deleteuserStub = Sinon.stub(DataBase, "DeleteUser");
    });
    afterEach(() => {
      deleteuserStub.restore();
    });
    it("Test when failed to delete", async () => {
      const id = 10;
      deleteuserStub.returns(0);
      const result = await userService.DeleteUser(id);
      assert.equal(result, 0);
      Sinon.assert.calledOnce(deleteuserStub);
      Sinon.assert.calledWith(deleteuserStub, id);
    });
    it("Delete user test case", async () => {
      const id = 5;
      deleteuserStub.returns(1);
      const result = await userService.DeleteUser(id);
      assert.equal(result, 1);
      Sinon.assert.calledOnce(deleteuserStub);
      Sinon.assert.calledWith(deleteuserStub, id);
    });
  });

  //update user test
  describe("Update test suite", () => {
    let updateUserStub: Sinon.SinonStub;
    beforeEach(() => {
      updateUserStub = Sinon.stub(DataBase, "UpdateUser");
    });
    afterEach(() => {
      updateUserStub.restore();
    });
    it("Create user test case", async () => {
      const user: user = {
        firstname: "John",
        lastname: "BloodBorne",
        id: 5,
        email: "john@gmail.com",
        phoneNumber: "9876543310",
        role: new Role(),
      };
      updateUserStub.returns(1);
      const result = await userService.Update(user);
      assert.equal(result, 1);
      Sinon.assert.calledOnce(updateUserStub);
      Sinon.assert.calledWith(updateUserStub, user);
    });
  });

  //read user test
  describe("", () => {
    let readUserStub: Sinon.SinonStub;
    beforeEach(() => {
      readUserStub = Sinon.stub(DataBase, "ReadUsers");
    });
    afterEach(() => {
      readUserStub.restore();
    });
    describe("read users test suite", () => {
      it("Query doesnt satistify", async () => {
        const result = await userService.ReadUsers();
        assert.deepEqual(result, []);
        Sinon.assert.notCalled(readUserStub);
      });
      it("No user Found", async () => {
        readUserStub.returns([]);
        const result = await userService.ReadUsers(1, 5);
        assert.deepEqual(result, []);
        Sinon.assert.calledOnce(readUserStub);
      });

      it("Read user Data", async () => {
        let users: user[] = [
          {
            firstname: "Subham",
            lastname: "Thapa",
            id: 5,
            email: "subham@gmail.com",
            phoneNumber: "9876543210",
            role: new Role(),
          },
          {
            firstname: "John",
            lastname: "Black",
            id: 10,
            email: "john@black.com",
            phoneNumber: "1234566789",
            role: new Role(),
          },
          {
            firstname: "Ashoka",
            lastname: "Tano",
            id: 7,
            email: "ashoka@jedi.com",
            phoneNumber: "95748586520",
            role: new Role(),
          },
          {
            firstname: "Anikan",
            lastname: "Skywalker",
            id: 14,
            email: "anikan@jedi.com",
            phoneNumber: "9874563210",
            role: new Role(),
          },
        ];
        readUserStub.returns(users);
        const result = await userService.ReadUsers(1, 5);
        assert.deepEqual(result, users);
        Sinon.assert.calledOnce(readUserStub);
      });
    });
  });

  describe("read user test suite", () => {
    let readUserStub: Sinon.SinonStub;
    beforeEach(() => {
      readUserStub = Sinon.stub(DataBase, "ReadUser");
    });
    afterEach(() => {
      readUserStub.restore();
    });
    it("Id not found", async () => {
      readUserStub.returns([]);
      const result = await userService.ReadUsers(0, 0, 5);
      assert.deepEqual(result, []);
      Sinon.assert.calledWith(readUserStub, 5);
    });
    it("User found", async () => {
      let user = {
        firstname: "John",
        lastname: "Black",
        id: 10,
        email: "john@black.com",
        phoneNumber: "1248216745",
        role: new Role(),
      };
      readUserStub.returns(user);
      const result = await userService.ReadUsers(0, 0, 10);
      assert.equal(result, user);
      Sinon.assert.calledWith(readUserStub, 10);
    });
  });

  describe("login test", () => {
    let loginStub: Sinon.SinonStub;

    beforeEach(() => {
      loginStub = Sinon.stub(DataBase, "Login");
    });
    after(() => {
      Sinon.restore();
    });
    it("Epic test", async () => {
      let user = {
        email: "subham@gmail.com",
        password: "cool secure password",
      };

      const data: any = {
        accessToken: "accessToken",
        refreshToken: "refreshToken",
      };

      loginStub.returns(data);

      const result = await userService.Login(user);
      assert.equal(result, data);
      Sinon.assert.calledWith(loginStub, user);
    });
  });
});

import Sinon from "sinon";
import { UserService } from "../../../app/web/services/UserService.js";
import { DataBase } from "../../../app/web/db/db.js";
import { user } from "../../../types/user.type";
import { assert } from "chai";

describe("User Services tests", () => {
  let userService: UserService;

  //test to create user
  describe("Create User test suite", () => {
    let saveUserStub: Sinon.SinonStub;
    beforeEach(() => {
      userService = new UserService();
      saveUserStub = Sinon.stub(DataBase, "saveUser");
    });
    it("Create user test case", async () => {
      const user: user = {
        firstname: "Subham",
        lastname: "thapa",
        id: 5,
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
      userService = new UserService();
      deleteuserStub = Sinon.stub(DataBase, "deleteUser");
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
      userService = new UserService();
      updateUserStub = Sinon.stub(DataBase, "updateUser");
    });
    it("Create user test case", async () => {
      const user: user = {
        firstname: "John",
        lastname: "",
        id: 5,
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
      userService = new UserService();
      readUserStub = Sinon.stub(DataBase, "readUser");
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
          { firstname: "Subham", lastname: "Thapa", id: 5 },
          { firstname: "John", lastname: "Black", id: 10 },
          { firstname: "Ashoka", lastname: "Tano", id: 7 },
          { firstname: "Ashoka", lastname: "Tano", id: 14 },
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
      userService = new UserService();
      readUserStub = Sinon.stub(DataBase, "readUserbyId");
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
      let user = { firstname: "John", lastname: "Black", id: 10 };
      readUserStub.returns([user]);
      const result = await userService.ReadUsers(0, 0, 10);
      assert.equal(result[0], user);
      Sinon.assert.calledWith(readUserStub, 10);
    });
  });
});

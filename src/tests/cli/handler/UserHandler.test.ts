import { assert, expect } from "chai";
import { Users } from "../../../app/cli/handlers/UserHandler.js";
import { userType as user } from "../../../types/user.type.js";
import Sinon from "sinon";
import { Logger } from "../../../utils/Logger.js";
import { FileUtility } from "../../../utils/files.js";
//createUser test suite
describe("User Handler", () => {
  let userHandler: Users;
  let stubSucess: Sinon.SinonStub;
  let stubWarn: Sinon.SinonStub;
  let stubInfo: Sinon.SinonStub;

  let stubError: Sinon.SinonStub;
  let readfileStub: Sinon.SinonStub;
  let saveUserStub: Sinon.SinonStub;

  beforeEach(() => {
    userHandler = new Users();
    readfileStub = Sinon.stub(FileUtility, "readFile");
    saveUserStub = Sinon.stub(FileUtility, "SaveUser");
    stubSucess = Sinon.stub(Logger, "Success");
    stubWarn = Sinon.stub(Logger, "Warn");
    stubError = Sinon.stub(Logger, "Error");
    stubInfo = Sinon.stub(Logger, "Info");
  });
  afterEach(() => {
    readfileStub.restore();
    saveUserStub.restore();
    stubError.restore();
    stubSucess.restore();
    stubWarn.restore();
    stubInfo.restore();
  });

  //test suite to create user
  describe("User create test suite", () => {
    //test case if user exists
    it("Test if user exists", async () => {
      let userData: user[] = [
        {
          firstname: "test",
          lastname: "user",
          id: 1,
        },
        {
          firstname: "user",
          lastname: "test",
          id: 2,
        },
      ];
      readfileStub.returns(userData);
      const user = {
        firstname: "test",
        lastname: "user",
        id: 4,
      };
      const result = await userHandler.CreateUser(user);
      assert.equal(result, false);
      stubWarn.calledOnce;
      stubWarn.calledWith("User Already Exists");
    });
    //test case if failed to save the user
    it("Test if failed to save user", async () => {
      let user: user = { firstname: "test", lastname: "test" };
      readfileStub.returns([]);
      saveUserStub.returns(false);
      const result = await userHandler.CreateUser(user);

      assert.equal(result, false);
      Sinon.assert.calledOnce(saveUserStub);
      Sinon.assert.calledWith(stubWarn, "Failed to save user.");
    });

    //test cast to save the user
    it("Test to save user", async () => {
      let userData: user[] = [
        {
          firstname: "test",
          lastname: "user",
          id: 1,
        },
        {
          firstname: "user",
          lastname: "test",
          id: 2,
        },
      ];
      readfileStub.returns(userData);

      let user: user = {
        firstname: "Subham",
        lastname: "thapa",
      };
      const result = await userHandler.CreateUser(user);
      assert.equal(user.id, userData.length);

      assert.equal(result, true);
      const saveUser = userData;
      saveUser.push(user);
      Sinon.assert.calledOnce(saveUserStub);
      Sinon.assert.calledWith(saveUserStub, saveUser);
      Sinon.assert.calledOnce(stubSucess);
      Sinon.assert.calledWith(
        stubSucess,
        `User ${user.firstname} ${user.lastname} added!`
      );
    });
  });

  //test suite to delete user
  describe("Test suite to delete User", () => {
    it("The user doesnt exist", async () => {
      let user = { firstname: "test", lastname: "user", id: 4 };
      readfileStub.returns([]);
      const result = await userHandler.DeleteUser(user.id);
      assert.equal(result, false);
      Sinon.assert.callCount(saveUserStub, 0);
      Sinon.assert.calledWith(stubError, "The user doesnt exist");
    });
    it("Filed To delete user", async () => {
      readfileStub.returns([{ firstname: "Test", lastname: "test", id: 5 }]);
      saveUserStub.returns(false);
      const result = await userHandler.DeleteUser(5);
      assert.equal(result, false);
      Sinon.assert.calledOnce(saveUserStub);
      Sinon.assert.calledWith(saveUserStub, []);
      Sinon.assert.calledOnce(stubWarn);
      Sinon.assert.calledWith(stubWarn, "Failed to Delete User");
    });
    it("User Delete", async () => {
      let userData: user[] = [
        { firstname: "Test", lastname: "test", id: 5 },
        { firstname: "John", lastname: "Black", id: 6 },
      ];
      readfileStub.returns(userData);
      const result = await userHandler.DeleteUser(5);
      assert.equal(result, true);
      Sinon.assert.calledWith(saveUserStub, [
        {
          firstname: "John",
          lastname: "Black",
          id: 6,
        },
      ]);
    });
  });

  //test suite to update user
  describe("Update User test suite", () => {
    //user doesnt exist
    it("The user Doesnt exist", async () => {
      let usersData: user[] = [
        { firstname: "Subham", lastname: "Thapa", id: 2 },
        { firstname: "John", lastname: "Doe", id: 3 },
        { firstname: "Tory", lastname: "Tee", id: 5 },
      ];
      readfileStub.returns(usersData);

      const result = await userHandler.Update({
        firstname: "User",
        lastname: "No",
        id: 8,
      });

      assert.equal(result, false);
      Sinon.assert.calledOnce(stubWarn);
      Sinon.assert.calledWith(stubWarn, "The user doesn't Exist");
    });

    //User already exists;
    it("User already exist", async () => {
      let usersData: user[] = [
        { firstname: "Subham", lastname: "Thapa", id: 2 },
        { firstname: "John", lastname: "Doe", id: 3 },
        { firstname: "Tory", lastname: "Tee", id: 5 },
      ];
      readfileStub.returns(usersData);

      let userData = { firstname: "Subham", lastname: "Thapa", id: 5 };
      const result = await userHandler.Update(userData);
      assert.equal(result, false);
      Sinon.assert.calledOnce(stubWarn);
      Sinon.assert.calledWith(
        stubWarn,
        "Cannot update user date. \nUser data already Exists"
      );

      //failed to save user data after deleting;
    });
    it("Failed to save user", async () => {
      let usersData: user[] = [
        { firstname: "Subham", lastname: "Thapa", id: 2 },
        { firstname: "John", lastname: "Doe", id: 3 },
        { firstname: "Tory", lastname: "Tee", id: 5 },
      ];
      readfileStub.returns(usersData);
      saveUserStub.returns(false);
      let userData = { firstname: "Subham", lastname: "Doe", id: 5 };
      const result = await userHandler.Update(userData);
      assert.equal(result, false);
      Sinon.assert.calledOnce(stubError);
      Sinon.assert.calledWith(stubError, "Failed to update user");
    });

    //update and save the user
    it("Update the user", async () => {
      let usersData: user[] = [
        { firstname: "Subham", lastname: "Thapa", id: 2 },
        { firstname: "John", lastname: "Doe", id: 3 },
        { firstname: "Tory", lastname: "Tee", id: 5 },
      ];
      readfileStub.returns(usersData);
      saveUserStub.returns(true);
      let userData = { firstname: "Troy", lastname: "Update", id: 5 };
      const result = await userHandler.Update(userData);
      assert.equal(result, true);
      Sinon.assert.calledOnce(stubSucess);
      Sinon.assert.calledWith(stubSucess, "User data updated");
    });
  });

  //test suite to get users
  describe("Test Suite for getting user data", () => {
    //returns empty array if user doesnt exists
    it("No user Exists", async () => {
      let data: user[] = [];
      readfileStub.returns(data);
      const result = await userHandler.ReadUsers();
      assert.deepEqual(result, data);
      Sinon.assert.calledWith(stubWarn, "No Users Exists");
      Sinon.assert.calledOnce(stubWarn);
    });

    //return users data
    it("User Exists", async () => {
      let data: user[] = [
        { firstname: "Spencer", lastname: "Genius", id: 2 },
        { firstname: "Blood", lastname: "Borne", id: 3 },
        { firstname: "Jin", lastname: "Sakai", id: 3 },
      ];
      readfileStub.returns(data);
      const result = await userHandler.ReadUsers();
      assert.equal(result, data);
      // Sinon.assert.calledWith(stubWarn, "No Users Exists");
      Sinon.assert.callCount(stubInfo, data.length);
    });
  });
});

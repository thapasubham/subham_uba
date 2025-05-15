import { assert } from "chai";
import { userResolvers } from "../../../../app/web/graphql/resolvers/resolvers.user.js";
import { UserService } from "../../../../app/web/services/UserService.js";
import Sinon from "sinon";

describe("User Resolver test", () => {
  describe("Query", () => {
    let dataSource: any;
    let readStub: Sinon.SinonStub;
    beforeEach(() => {
      readStub = Sinon.stub();
      dataSource = {
        userService: { ReadUsers: readStub },
      };
    });

    it("User query", async () => {
      let data = {
        firstname: "Subham",
        lastname: "Thapa",
        id: 5,
        email: "subham@gmail.com",
        phoneNumber: "9876543210",
      };
      readStub.resolves(data);
      const result = await userResolvers.Query.user(
        {},
        { id: 5 },
        { dataSource: dataSource }
      );
      assert.equal(result, data);
      Sinon.assert.calledOnce(dataSource.userService.ReadUsers);
    });

    //users
    it("User query", async () => {
      let data = [
        {
          firstname: "Subham",
          lastname: "Thapa",
          id: 5,
          email: "subham@gmail.com",
          phoneNumber: "9317543210",
        },
        {
          firstname: "Sunil",
          lastname: "Khadka",
          id: 5,
          email: "subham@gmail.com",
          phoneNumber: "9872157210",
        },
        {
          firstname: "John",
          lastname: "Black",
          id: 40,
          email: "john@black.com",
          phoneNumber: "987583210",
        },
      ];
      readStub.resolves(data);
      const result = await userResolvers.Query.users(
        {},
        { limit: 5, offset: 5 },
        { dataSource: dataSource }
      );
      assert.equal(result, data);
      Sinon.assert.calledOnce(dataSource.userService.ReadUsers);
    });
  });

  describe("Mutations", () => {
    let dataSource: any;
    let createUserStub: Sinon.SinonStub;
    beforeEach(() => {
      createUserStub = Sinon.stub();
      dataSource = {
        userService: { CreateUser: createUserStub },
      };
    });

    it("User Create mutation", async () => {
      let data = {
        firstname: "Subham",
        lastname: "Thapa",
        id: 5,
        email: "subham@gmail.com",
        phoneNumber: "9876543210",
      };
      createUserStub.resolves(data);
      const result = await userResolvers.Mutation.createUser(
        {},
        { data },
        { dataSource: dataSource }
      );
      assert.equal(result, data);
      Sinon.assert.calledOnce(dataSource.userService.CreateUser);
    });
  });
});

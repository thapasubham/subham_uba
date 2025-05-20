import { assert } from "chai";
import Sinon from "sinon";
import { internResolvers } from "../../../../app/web/graphql/resolvers/resolver.intern.js";

describe("Intern Resolver test", () => {
  let dataSource: any;
  describe("Query", () => {
    let readStub: Sinon.SinonStub;
    beforeEach(() => {
      readStub = Sinon.stub();
      dataSource = {
        internService: { ReadIntern: readStub },
      };
    });

    it("Intern query", async () => {
      let data = {
        id: 3,
        name: "Full-stack",
      };
      readStub.resolves(data);
      const result = await internResolvers.Query.intern(
        {},
        { id: 5 },
        { dataSource: dataSource }
      );
      assert.equal(result, data);
      Sinon.assert.calledOnce(dataSource.internService.ReadIntern);
    });

    //users
    it("Intern query", async () => {
      let data = [
        {
          id: 5,
          name: "Full-stack",
        },
        {
          id: 1,
          name: "Graphics Design",
        },
      ];
      readStub.resolves(data);
      const result = await internResolvers.Query.interns(
        {},
        { limit: 5, offset: 5 },
        { dataSource: dataSource }
      );
      assert.equal(result, data);
      Sinon.assert.calledOnce(dataSource.internService.ReadIntern);
    });
  });

  describe("Create Mutations", () => {
    let createUserStub: Sinon.SinonStub;
    beforeEach(() => {
      createUserStub = Sinon.stub();
      dataSource = {
        internService: { CreateIntern: createUserStub },
      };
    });

    it("Intern Create mutation", async () => {
      let data = {
        name: "Front-End",
      };
      createUserStub.resolves(data);
      const result = await internResolvers.Mutation.createIntern(
        {},
        { data },
        { dataSource: dataSource }
      );
      assert.equal(result, data);
      Sinon.assert.calledOnce(dataSource.internService.CreateIntern);
    });
  });

  describe("Update mutation", () => {
    let updateStub: Sinon.SinonStub;
    beforeEach(() => {
      updateStub = Sinon.stub();
      dataSource = {
        internService: { UpdateIntern: updateStub },
      };
    });

    it("Intern update mutation", async () => {
      let data = {
        id: 1,
        name: "DevOps",
      };

      updateStub.resolves(data);

      const result = await internResolvers.Mutation.updateIntern(
        {},
        { data },
        { dataSource: dataSource }
      );
      assert.equal(result, data);
      Sinon.assert.calledOnce(dataSource.internService.UpdateIntern);
    });
  });

  describe("Update Mutations", () => {
    let deleteStub: Sinon.SinonStub;
    beforeEach(() => {
      deleteStub = Sinon.stub();
      dataSource = {
        internService: { DeleteIntern: deleteStub },
      };
    });

    it("update user mutation", async () => {
      let id = 11;

      deleteStub.resolves(1);
      const result = await internResolvers.Mutation.deleteIntern(
        {},
        { id },
        { dataSource: dataSource }
      );
      assert.equal(result, 1);
      Sinon.assert.calledOnce(dataSource.internService.DeleteIntern);
    });
  });
});

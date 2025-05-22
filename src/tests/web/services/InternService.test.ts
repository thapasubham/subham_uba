import Sinon from "sinon";
import { InternService } from "../../../app/web/services/InternService.js";
import { DataBaseIntern } from "../../../app/web/database/intern.db.js";
import { assert } from "chai";
import { Intern } from "../../../entity/intern.js";
describe("Testing the Inter service", () => {
  const internService = new InternService();

  describe("Intern", () => {
    let saveIntern: Sinon.SinonStub;

    beforeEach(() => {
      saveIntern = Sinon.stub(DataBaseIntern, "Create");

    });

    afterEach(() => {
      saveIntern.restore();
    });
    it("Create intern test case", async () => {
      const intern: Intern = {
        name: "Full-stack",
      };
      saveIntern.returns(intern);
      const result = await internService.CreateIntern(intern);
      assert.equal(result, intern);
      Sinon.assert.calledOnce(saveIntern);
      Sinon.assert.calledWith(saveIntern, intern);
    });
  });

  //delete intern
  describe("Delete intern test suite", () => {
    let deleteinternStub: Sinon.SinonStub;
    beforeEach(() => {
      deleteinternStub = Sinon.stub(DataBaseIntern, "Delete");
    });
    afterEach(() => {
      deleteinternStub.restore();
    });
    it("Test when intern with id not found", async () => {
      const id = 10;
      deleteinternStub.returns(0);
      const result = await internService.DeleteIntern(id);
      assert.equal(result, 0);
      Sinon.assert.calledOnce(deleteinternStub);
      Sinon.assert.calledWith(deleteinternStub, id);
    });
    it("Delete intern test case", async () => {
      const id = 5;
      deleteinternStub.returns(1);
      const result = await internService.DeleteIntern(id);
      assert.equal(result, 1);
      Sinon.assert.calledOnce(deleteinternStub);
      Sinon.assert.calledWith(deleteinternStub, id);
    });
  });

  //update intern test
  describe("Update test suite", () => {
    let updateStub: Sinon.SinonStub;
    beforeEach(() => {
      updateStub = Sinon.stub(DataBaseIntern, "Update");
    });
    it("Create intern test case", async () => {
      const intern: Intern = {
        id: 6,
        name: "Back-End",
      };
      updateStub.returns(1);
      const result = await internService.UpdateIntern(intern);
      assert.equal(result, 1);
      Sinon.assert.calledOnce(updateStub);
      Sinon.assert.calledWith(updateStub, intern);
    });
  });

  //read intern test suite

  //read intern test
  describe("", () => {
    let readStub: Sinon.SinonStub;
    beforeEach(() => {
      readStub = Sinon.stub(DataBaseIntern, "Reads");
    });
    afterEach(() => {
      readStub.restore();
    });
    describe("Read list of intern test suite", () => {
      it("No data Found", async () => {
        readStub.returns([]);
        const result = await internService.ReadIntern();
        assert.deepEqual(result, []);
        Sinon.assert.calledOnce(readStub);
      });

      it("Read intern Data", async () => {
        let interns: Intern[] = [
          {
            id: 5,
            name: "Full-stack",
          },
          {
            id: 1,
            name: "Graphics Design",
          },
        ];
        readStub.returns(interns);
        const result = await internService.ReadIntern();
        assert.deepEqual(result, interns);
        Sinon.assert.calledOnce(readStub);
      });
    });
  });

  describe("read intern test suite", () => {
    let readStub: Sinon.SinonStub;
    beforeEach(() => {
      readStub = Sinon.stub(DataBaseIntern, "Read");
    });
    afterEach(() => {
      readStub.restore();
    });
    it("Id not found", async () => {
      readStub.returns([]);
      const result = await internService.ReadIntern(5);
      assert.deepEqual(result, []);
      Sinon.assert.calledWith(readStub, 5);
    });
    it("intern found", async () => {
      let intern = {
        id: 5,
        name: "Mobile Developer",
      };
      readStub.returns(intern);
      const result = await internService.ReadIntern(10);
      assert.equal(result, intern);
      Sinon.assert.calledWith(readStub, 10);
    });
  });
});

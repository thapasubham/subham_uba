import Sinon from "sinon";
import { InternDetailsService } from "../../../app/web/services/InternDetailsService.js";
import { DetailsDB } from "../../../app/web/database/internDetails.db.js";

import { assert } from "chai";
import {Intern, internShipDetails } from "../../../entity/intern.js";
import { Mentor, User } from "../../../entity/user.js";

describe("Intern details test", () => {
  let detailService = new InternDetailsService();

  describe("Read Intern test suite by id", () => {
    let readDetailStub: Sinon.SinonStub;

    beforeEach(() => {
      readDetailStub = Sinon.stub(DetailsDB, "GetDetail");
    });
    afterEach(() => {
      readDetailStub.restore();
    });
    it("Read by id", async () => {
      const data: internShipDetails = {
        id: 4,
        user: new User(),
        started_at: undefined,
        end_at: undefined,
        isCertified: false,
        intern: new Intern(),
        mentor: new Mentor(),
      };
      readDetailStub.returns(data);
      const result = await detailService.ReadIntern(0, 0, 4);
      assert.equal(result, data);
    });
  });

  describe("Read Intern test suite by id", () => {
    let readDetailStub: Sinon.SinonStub;

    beforeEach(() => {
      readDetailStub = Sinon.stub(DetailsDB, "GetDetails");
    });
    afterEach(() => {
      readDetailStub.restore();
    });
    it("Read by id", async () => {
      let data: internShipDetails[] = [
        {
          id: 4,
          user: new User(),
          started_at: undefined,
          end_at: undefined,
          isCertified: false,
          intern: new Intern(),
          mentor: new Mentor(),
        },
        {
          id: 5,
          user: new User(),
          started_at: undefined,
          end_at: undefined,
          isCertified: false,
          intern: new Intern(),
          mentor: new Mentor(),
        },
        {
          id: 10,
          user: new User(),
          started_at: undefined,
          end_at: undefined,
          isCertified: false,
          intern: new Intern(),
          mentor: new Mentor(),
        },
      ];
      readDetailStub.returns(data);
      const result = await detailService.ReadIntern(4, 5);
      assert.equal(result, data);
      Sinon.assert.calledWith(readDetailStub, 4, 5);
    });
  });

  describe("Create method test suite", () => {
    let createStub: Sinon.SinonStub;
    beforeEach(() => {
      createStub = Sinon.stub(DetailsDB, "CreateDetails");
    });
    afterEach(() => {
      createStub.restore();
    });
    it("Create test", async () => {
      let detail: internShipDetails = {
        id: 5,
        started_at: undefined,
        end_at: undefined,
        isCertified: false,
        intern: new Intern(),
        mentor: new Mentor(),
        user: new User(),
      };
      createStub.returns(detail);
      const result = await detailService.CreateIntern(detail);
      assert.equal(result, detail);
      Sinon.assert.calledWith(createStub, detail);
    });
  });

  describe("update method test suite", () => {
    let updateStub: Sinon.SinonStub;
    beforeEach(() => {
      updateStub = Sinon.stub(DetailsDB, "UpdateDetails");
    });
    afterEach(() => {
      updateStub.restore();
    });
    it("Update test", async () => {
      let detail: internShipDetails = {
        id: 5,
        started_at: undefined,
        end_at: undefined,
        isCertified: false,
        intern: new Intern(),
        mentor: new Mentor(),
        user: new User(),
      };
      updateStub.returns(detail);
      const result = await detailService.UpdateIntern(detail);
      assert.equal(result, detail);
      Sinon.assert.calledWith(updateStub, detail);
    });
  });

  describe("Certify Test suite", () => {
    let certifyStub: Sinon.SinonStub;
    beforeEach(() => {
      certifyStub = Sinon.stub(DetailsDB, "Certify");
    });

    afterEach(() => {
      certifyStub.restore();
    });
    it("Certify", async () => {
      certifyStub.returns(1);
      const result = await detailService.Certify(5);
      Sinon.assert.calledWith(certifyStub, 5);
      assert.equal(result, 1);
    });
    it("Failed to Certify", async () => {
      certifyStub.returns(0);
      const result = await detailService.Certify(4);
      Sinon.assert.calledWith(certifyStub, 4);
      assert.equal(result, 0);
    });
  });
});

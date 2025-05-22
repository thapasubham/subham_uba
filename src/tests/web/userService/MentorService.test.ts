import Sinon from "sinon";
import { MentorDb } from "../../../app/web/database/mentor.db.js";
import { MentorService } from "../../../app/web/services/MentorService.js";
import { assert } from "chai";
import { Mentor } from "../../../entity/user";
import {Role} from "../../../entity/role";

describe("Mentor Test", () => {
  const mentorService = new MentorService();

  describe("Create User test suite", () => {
    let saveUserStub: Sinon.SinonStub;
    beforeEach(() => {
      saveUserStub = Sinon.stub(MentorDb, "CreateMentor");
    });
    afterEach(() => {
      saveUserStub.restore();
    });
    it("Create mentor test case", async () => {
      const mentor: Mentor = {
        firstname: "Subham",
        lastname: "Thapa",
        id: 5,
        email: "subham@thapa.com",
        phoneNumber: "9830825938",
        password: "password123",
        role: new Role(),
      };
      saveUserStub.returns(mentor);
      const result = await mentorService.CreateMentor(mentor);
      assert.equal(result, mentor);
      Sinon.assert.calledOnce(saveUserStub);
      Sinon.assert.calledWith(saveUserStub, mentor);
    });
  });

  describe("login test", () => {
    let loginStub: Sinon.SinonStub;

    beforeEach(() => {
      loginStub = Sinon.stub(MentorDb, "Login");
    });
    after(() => {
      Sinon.restore();
    });
    it("Epic test", async () => {
      let user = { email: "sishir@rijal.com", password: "password43" };

      const data: any = {
        accessToken: "accessToken",
        refreshToken: "refreshToken",
      };

      loginStub.returns(data);

      const result = await mentorService.Login(user);
      assert.equal(result, data);
      Sinon.assert.calledWith(loginStub, user);
    });
  });

  describe("", () => {
    let readUserStub: Sinon.SinonStub;
    beforeEach(() => {
      readUserStub = Sinon.stub(MentorDb, "ReadMentors");
    });
    afterEach(() => {
      readUserStub.restore();
    });
    describe("read mentor test suite", () => {
      it("Query doesnt satistify", async () => {
        const result = await mentorService.ReadMentors();
        assert.deepEqual(result, []);
        Sinon.assert.notCalled(readUserStub);
      });
      it("No mentor found", async () => {
        readUserStub.returns([]);
        const result = await mentorService.ReadMentors(1, 5);
        assert.deepEqual(result, []);
        Sinon.assert.calledOnce(readUserStub);
      });

      it("Read mentor Data", async () => {
        let users: Mentor[] = [
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
        const result = await mentorService.ReadMentors(1, 5);
        assert.deepEqual(result, users);
        Sinon.assert.calledOnce(readUserStub);
      });
    });
  });

  describe("read mentor test suite", () => {
    let readUserStub: Sinon.SinonStub;
    beforeEach(() => {
      readUserStub = Sinon.stub(MentorDb, "ReadMentor");
    });
    afterEach(() => {
      readUserStub.restore();
    });
    it("Id not found", async () => {
      readUserStub.returns([]);
      const result = await mentorService.ReadMentors(0, 0, 5);
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
      const result = await mentorService.ReadMentors(0, 0, 10);
      assert.equal(result, user);
      Sinon.assert.calledWith(readUserStub, 10);
    });
  });

  describe("Delete mentor test suite", () => {
    let deleteStub: Sinon.SinonStub;
    beforeEach(() => {
      deleteStub = Sinon.stub(MentorDb, "DeleteMentor");
    });
    afterEach(() => {
      deleteStub.restore();
    });
    it("Test when failed to delete", async () => {
      const id = 10;
      deleteStub.returns(0);
      const result = await mentorService.DeleteMentor(id);
      assert.equal(result, 0);
      Sinon.assert.calledOnce(deleteStub);
      Sinon.assert.calledWith(deleteStub, id);
    });
    it("Delete user test case", async () => {
      const id = 5;
      deleteStub.returns(1);
      const result = await mentorService.DeleteMentor(id);
      assert.equal(result, 1);
      Sinon.assert.calledOnce(deleteStub);
      Sinon.assert.calledWith(deleteStub, id);
    });
  });

  describe("Update test suite", () => {
    let updateMentor: Sinon.SinonStub;
    beforeEach(() => {
      updateMentor = Sinon.stub(MentorDb, "UpdateMentor");
    });
    afterEach(() => {
      updateMentor.restore();
    });
    it("Update mentor test case", async () => {
      const mentor: Mentor = {
        firstname: "John",
        lastname: "BloodBorne",
        id: 5,
        email: "john@gmail.com",
        phoneNumber: "9876543310",
        role: new Role(),
      };
      updateMentor.returns(1);
      const result = await mentorService.Update(mentor);
      assert.equal(result, 1);
      Sinon.assert.calledOnce(updateMentor);
      Sinon.assert.calledWith(updateMentor, mentor);
    });
  });
});

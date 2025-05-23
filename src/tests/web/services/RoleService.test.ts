import Sinon from "sinon";
import { RoleService } from "../../../app/web/services/RoleService.js";
import { RolesDB } from "../../../app/web/database/roles.db.js";
import { Role } from "../../../entity/role";
import { assert } from "chai";

describe("Role service test case", () => {
  const roleService = new RoleService();
  describe("Create role test", () => {
    let createSub: Sinon.SinonStub;
    beforeEach(() => {
      createSub = Sinon.stub(RolesDB, "CreateRole");
    });
    afterEach(() => {
      createSub.restore();
    });
    it("Create role test", async () => {
      const role: Role = {
        id: 4,
        name: "admin",
      };

      createSub.returns(role);
      const result = await roleService.CreateRole(role);
      assert.equal(result, role);
      Sinon.assert.calledOnce(createSub);
      Sinon.assert.calledWith(createSub, role);
    });
  });
  describe("read single role test", () => {
    let readRole: Sinon.SinonStub;
    beforeEach(() => {
      readRole = Sinon.stub(RolesDB, "ReadRole");
    });
    afterEach(() => {
      readRole.restore();
    });
    it("Read role by name test", async () => {
      const name = "admin";
      const role: Role = {
        id: 4,
        name: "admin",
      };

      readRole.returns(role);
      const result = await roleService.ReadRole(name);
      assert.equal(result, role);
      Sinon.assert.calledOnce(readRole);
      Sinon.assert.calledWith(readRole, name);
    });
  });

  describe("read roles test", () => {
    let readRole: Sinon.SinonStub;
    beforeEach(() => {
      readRole = Sinon.stub(RolesDB, "ReadRoles");
    });
    afterEach(() => {
      readRole.restore();
    });
    it("read all  role test", async () => {
      const name = "admin";
      const role: Role[] = [
        {
          id: 4,
          name: "admin",
        },
        {
          id: 7,
          name: "user",
        },
      ];

      readRole.returns(role);
      const result = await roleService.ReadRoles();
      assert.equal(result, role);
      Sinon.assert.calledOnce(readRole);
    });
  });

  describe("Add permission to roles", () => {
    let updateStub: Sinon.SinonStub;
    before(() => {
      updateStub = Sinon.stub(RolesDB, "AddPermissionToRole");
    });
    afterEach(() => {
      updateStub.restore();
    });
    it("Add permission to role", async () => {
      const roleid = 3;
      const permission_id = 4;
      const role: Role = {
        id: 4,
        name: "HR",
        permission: [
          {
            id: 2,
            name: "view",
          },
          {
            id: 4,
            name: "edit",
          },
        ],
      };

      updateStub.returns(role);
      const result = await roleService.UpdateRole(roleid, permission_id);
      Sinon.assert.calledWith(updateStub, roleid, permission_id);
    });
  });
});

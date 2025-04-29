import { user } from "../../types/user.type";
import { getIndex, readFile } from "../../utils/files";
import { UserService } from "../services/UserService";
const uh: UserService = new UserService();
export const resolvers = {
  Query: {
    users() {
      return uh.ReadUsers();
    },
    async user(_: any, { id }: any) {
      const getUser = (await uh.ReadUsers(parseInt(id))).pop();
      console.log(getUser);
      return getUser;
    },
  },

  Mutation: {
    async createUser(_: any, { user }: any) {
      const createdUser = await uh.CreateUser(user);
      return createdUser;
    },

    async updateUser(_: any, { user }: any) {
      const updatedUser = await uh.Update(user);
      return updatedUser;
    },
    async deleteUser(_: any, { id }: any) {
      const user = await uh.DeleteUser(parseInt(id));
      return user.id;
    },
  },
};

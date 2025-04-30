import { UserService } from "../services/UserService";
const uh: UserService = new UserService();
export const resolvers = {
  Query: {
    users(_: any, { page, offset }: any) {
      return uh.ReadUsers(page, offset);
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
      return user;
    },
  },
};

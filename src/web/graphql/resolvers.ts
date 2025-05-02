export const resolvers = {
  Query: {
    users(_: any, { page, offset }: any, { dataSource }: any) {
      return dataSource.userService.ReadUsers(page, offset);
    },
    async user(_: any, { id }: any, { dataSource }: any) {
      console.log(dataSource);
      const getUser = (
        await dataSource.userService.ReadUsers(0, 0, parseInt(id))
      ).pop();

      return getUser;
    },
  },

  Mutation: {
    async createUser(_: any, { user }: any, { dataSource }: any) {
      const createdUser = await dataSource.userService.CreateUser(user);
      return createdUser;
    },

    async updateUser(_: any, { user }: any, { dataSource }: any) {
      const updatedUser = await dataSource.userService.Update(user);
      return updatedUser;
    },
    async deleteUser(_: any, { id }: any, { dataSource }: any) {
      const user = await dataSource.userService.DeleteUser(parseInt(id));
      return user;
    },
  },
};

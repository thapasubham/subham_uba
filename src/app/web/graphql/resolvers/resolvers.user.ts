export const userResolvers = {
  Query: {
    async users(_: any, { limit, offset }: any, { dataSource }: any) {
      return await dataSource.userService.ReadUsers(limit, offset);
    },
    async user(_: any, { id }: any, { dataSource }: any) {
      const getUser = await dataSource.userService.ReadUsers(
        0,
        0,
        parseInt(id)
      );

      console.log(getUser);
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
    async loginUser(_: any, { login }: any, { dataSource }: any) {
      const tokens = await dataSource.userService.Login(login);
      return tokens;
    },
    async deleteUser(_: any, { id }: any, { dataSource }: any) {
      const user = await dataSource.userService.DeleteUser(parseInt(id));

      return user;
    },
  },
};

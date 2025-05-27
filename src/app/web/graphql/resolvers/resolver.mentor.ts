export const mentor = {
  Query: {
    async mentors(_: any, { limit, offset }: any, { dataSource }: any) {
      return await dataSource.mentorService.ReadMentors(limit, offset);
    },
    async mentor(_: any, { id }: any, { dataSource }: any) {
      const getUser = await dataSource.mentorService.ReadMentors(
        0,
        0,
        parseInt(id)
      );

      return getUser;
    },
  },
  Mutation: {
    async createMentor(_: any, { user }: any, { dataSource }: any) {
      const createdUser = await dataSource.mentorService.CreateMentor(user);
      return createdUser;
    },

    async updateMentor(_: any, { user }: any, { dataSource }: any) {
      const updatedUser = await dataSource.mentorService.Update(user);
      return updatedUser;
    },
    async loginMentor(_: any, { login }: any, { dataSource }: any) {
      const tokens = await dataSource.mentorService.Login(login);
      return tokens;
    },
    async deleteMentor(_: any, { id }: any, { dataSource }: any) {
      const user = await dataSource.mentorService.DeleteMentor(parseInt(id));

      return user;
    },
  },
};

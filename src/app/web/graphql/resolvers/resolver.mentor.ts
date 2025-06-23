import { isErrored } from "stream";

export const mentor = {
  Query: {
    async mentors(
      _: any,
      { search, searchBy, limit, offset, filter, orderBy }: any,
      { dataSource }: any
    ) {
      const result = await dataSource.mentorService.ReadMentors(
        search,
        searchBy,
        filter,
        limit,
        offset,
        orderBy
      );

      return result;
    },
    async getmentors(_: any, { id }: any, { dataSource }: any) {
      const getUser = await dataSource.mentorService.ReadMentor(parseInt(id));
      
      return getUser;
    },
  },
  Mutation: {
    async createMentor(_: any, { mentor }: any, { dataSource }: any) {
      const createdUser = await dataSource.mentorService.CreateMentor(mentor);
      return createdUser;
    },

    async updateMentor(_: any, { mentor }: any, { dataSource }: any) {
      const updatedUser = await dataSource.mentorService.Update(mentor);
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

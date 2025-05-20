export const internResolvers = {
  Query: {
    async interns(_: any, {}: any, { dataSource }: any) {
      return await dataSource.internService.ReadIntern();
    },
    async intern(_: any, { id }: any, { dataSource }: any) {
      return await dataSource.internService.ReadIntern(id);
    },
  },
  Mutation: {
    async createIntern(_: any, { intern }: any, { dataSource }: any) {
      return await dataSource.internService.CreateIntern(intern);
    },
    async updateIntern(_: any, { intern }: any, { dataSource }: any) {
      return await dataSource.internService.UpdateIntern(intern);
    },
    async deleteIntern(_: any, { id }: any, { dataSource }: any) {
      return await dataSource.internService.DeleteIntern(id);
    },
  },
};

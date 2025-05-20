export const internDetailResolvers = {
  Query: {
    async internDetails(_: any, args: any, { dataSource }: any) {
      return await dataSource.detailsService.ReadIntern(
        args.limit,
        args.offset
      );
    },
    async internDetail(_: any, { id }: any, { dataSource }: any) {
      return await dataSource.internDetail.ReadIntern(id);
    },
  },

  Mutation: {},
};

export const internDetailResolvers = {
  Query: {
    async internDetails(_: any, args: any, { dataSource }: any) {
      return await dataSource.detailsService.ReadIntern(
        args.limit,
        args.offset
      );
    },
    async internDetail(_: any, { id }: any, { dataSource }: any) {
      const ID = Number(id);
      return await dataSource.detailsService.ReadIntern(0, 0, ID);
    },
  },

  Mutation: {
    async createDetails(_: any, { detail }: any, { dataSource }: any) {
      await dataSource.detailsService.CreateIntern(detail);
      return "Details Created";
    },

    async updateDetails(_: any, { detail }: any, { dataSource }: any) {
      await dataSource.detailsService.CreateIntern(detail);
      return "Detail Updated";
    },

    async certify(_: any, { id }: any, { dataSource }: any) {
      const result = await dataSource.detailsService.Certify(id);

      if (result === 0) {
        return "Certification status  failed to updated";
      }
      return "Certification status updated";
    },
  },
};

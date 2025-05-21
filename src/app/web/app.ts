import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import typeDefs from "./graphql/schema.js";
import { resolvers } from "./graphql/resolvers/resolver.js";
import { errorHandler } from "./middleware/error.js";

import routes from "./routes/index.js";

import { dataSource } from "./graphql/datasource/index.js";

export async function startServer() {
  const app = express();

  const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 4040;

  app.use(express.json());

  const server = new ApolloServer({ typeDefs, resolvers });

  //restapi

  app.use("/api/", routes.userRouter);
  app.use("/api/intern", routes.internRoutes);
  app.use("/api/detail", routes.internDetailsRoutes);
  app.use("/api/mentor", routes.mentorRoutes);
  //graphql

  await server.start();

  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async () => ({
        dataSource,
      }),
    }) as any
  );

  app.use(errorHandler as any);
  try {
    app.listen(PORT, () => {
      console.log(`Server Running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
}

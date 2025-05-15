import { userRouter } from "./routes/users/user.route.js";
import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import typeDefs from "./graphql/schema.js";
import { resolvers } from "./graphql/resolvers/resolver.js";
import { errorHandler } from "./middleware/error.js";
import { UserService } from "./services/UserService.js";
import { internRoutes } from "./routes/users/intern.route.js";
import { InternService } from "./services/InternService.js";

export async function startServer() {
  const app = express();

  const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 4040;

  app.use(express.json());

  const server = new ApolloServer({ typeDefs, resolvers });

  //restapi
  app.use("/api/", userRouter);
  app.use("/api/intern", internRoutes);
  //graphql
  await server.start();

  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async () => ({
        dataSource: {
          userService: new UserService(),
          internService: new InternService(),
        },
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

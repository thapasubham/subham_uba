import userRouter from "./routes/users/user.route.js";
import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import typeDefs from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";
import { errorHandler } from "./middleware/error.js";

export async function startServer() {
  const app = express();

  const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 4040;

  app.use(express.json());

  const server = new ApolloServer({ typeDefs, resolvers });

  //restapi
  app.use("/api/", userRouter);

  //graphql
  await server.start();
  app.use("/graphql", expressMiddleware(server));

  app.use(errorHandler);
  try {
    app.listen(PORT, () => {
      console.log(`Server Running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
}

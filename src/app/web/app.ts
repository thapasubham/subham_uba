import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import typeDefs from "./graphql/schema.js";
import { resolvers } from "./graphql/resolvers/index.js";
import { errorHandler } from "./middleware/error.js";
import cors from "cors";
import routes from "./routes/index.js";
import cookieparser from "cookie-parser";
import { dataSource } from "./graphql/datasource/index.js";

export async function startServer() {
  const app = express();

  const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 4040;
  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );
  app.use(express.json());
  app.use(cookieparser());

  const server = new ApolloServer({ typeDefs, resolvers });

  //restapi
  // app.get("/", (req, res) => {
  //   res.send("hello");
  // });
  app.use("/api/user", routes.userRouter);
  app.use("/api/intern", routes.internRoutes);
  app.use("/api/detail", routes.internDetailsRoutes);
  app.use("/api/mentor", routes.mentorRoutes);
  app.use("/api/roles", routes.rolesRoutes);
  app.use("/api/permission", routes.permissionRoutes);

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

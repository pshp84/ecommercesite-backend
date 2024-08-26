import 'dotenv/config';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import sequelize from './utils/database';
import typeDefs from './schemas';
import resolvers from './resolvers';
import cors from 'cors';

const app = express();
app.use(cors({
  origin: "*"
}));

async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });

  await sequelize.sync({ alter: true });
  console.log('Database synced');

  app.listen({ port: 4000 }, () =>
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
  );
}
startServer();

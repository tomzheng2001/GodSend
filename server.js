import { ApolloServer } from 'apollo-server-express'
import { createServer } from 'http';
import express from 'express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import typeDefs from './typeDefs.js';
import resolvers from './resolvers.js';
import jwt from 'jsonwebtoken'
import { makeExecutableSchema } from '@graphql-tools/schema';
const port = process.env.PORT || 3000

const app = express();

const context = ({ req }) => {
          const { authorization } = req.headers
          if (authorization) {
              const { userId } = jwt.verify(authorization, process.env.JWT_SECRET)
              return { userId }
          }
}

const schema = makeExecutableSchema({typeDefs, resolvers})
const httpServer = createServer(app);

const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/graphql',
});

const serverCleanup = useServer({ schema }, wsServer);

const apolloServer = new ApolloServer({
  schema,
  context,
  plugins: [
    // Proper shutdown for the HTTP server.
    ApolloServerPluginDrainHttpServer({ httpServer }),

    // Proper shutdown for the WebSocket server.
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});

await apolloServer.start();
apolloServer.applyMiddleware({ app });

httpServer.listen(port);

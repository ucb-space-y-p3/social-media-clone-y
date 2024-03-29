const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const { authMiddleware, wsDecode } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const { createServer } = require('http');
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { WebSocketServer } = require('ws');
const { useServer } = require('graphql-ws/lib/use/ws');
const cors = require('cors');

// const { User, } = require('./models');

const PORT = process.env.PORT || 3005;
const app = express();

//create a new http server to work with subscriptions
const httpServer = createServer(app);
console.log('HTTP server created');

//create an executable Graphql schema
const schema = makeExecutableSchema({ typeDefs, resolvers });
console.log('GraphQL schema created');


// new ws server
const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/subscriptions'//probchane
  // path: '/graphql'//probchane

});
console.log('WebSocket server created');


const getDynamicContext = async (ctx, msg, args) => {
  // ctx is the graphql-ws Context where connectionParams live
  if (ctx.connectionParams.authorization) {
    // const currentUser = await User.findOne({ _id: ctx.connectionParams.authentication }); // what exactly is authentication providing?
    const currentUser = wsDecode(ctx.connectionParams.authorization);
    return { currentUser };
  }
  // Otherwise let our resolvers know we don't have a current user
  return { currentUser: null };
};

//use the ws en graphql-ws
const serverCleanup = useServer(
  {
    schema,
    context: async (ctx, msg, args) => {
      return getDynamicContext(ctx, msg, args);
    },
    onConnect: async (ctx) => {
      console.log('ctx', ctx.connectionParams);
      const token = ctx.connectionParams?.authorization || ctx.connectionParams?.Authorization;
      if (!wsDecode(token)) {
        throw new Error('Auth token missing!');
      }
      console.log('user connected');
    },
    onDisconnect(ctx, code, reason) {
      console.log('Disconnected!');
    },
  }, wsServer);

// new ApolloServer might need to go here
// Create a new instance of an Apollo server with the GraphQL schema
const server = new ApolloServer({
  schema,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
            console.log('GraphQL WebSocket server cleaned up');
          },
        };
      },
    },
  ],
});



console.log('GraphQL WebSocket server setup completed');

// Create a new instance of an Apollo server with the GraphQL schema
// new ApolloServer was here


console.log('Apollo Server instance createddd');
async function startApolloServer() {
  await server.start();

  // Authentication middleware
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // Serve up static assets
  app.use('/images', express.static(path.join(__dirname, '../client/images')));

  app.use('/graphql', cors(), expressMiddleware(server, { context: authMiddleware }));


  app.use('/subscriptions', expressMiddleware(server, { context: authMiddleware }));
  // app.use('/subscriptions', expressMiddleware(server));

  // Production mode
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  db.once('open', () => {
    httpServer.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
}

startApolloServer();
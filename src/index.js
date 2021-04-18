const { ApolloServer, gql } = require('apollo-server-cloud-functions');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const {createSql} = require('./sqldatabase');
const WTFAPI = require('./WTFAPI');

const store = createSql();

store.db.sync({
  force: false,
});

// a comment
// this is another comment

const wtfAPI = new WTFAPI({ store });


const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true,
  dataSources: () => ({
    wtfAPI: wtfAPI,
  }),
});


exports.handler = server.createHandler({
  cors: {
    origin: true,
    credentials: true,
  },
});
// const { ApolloServer } = require('@apollo/server');
// const { typeDefs, resolvers } = require('/graphql');

// const authMiddleware = require('./server/authMiddleware');


// const server = new ApolloServer({ typeDefs, resolvers });

// server.listen().then(({ url }) => {
//   console.log(`Server ready at ${url}`);
// });
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

module.exports = { typeDefs, resolvers };

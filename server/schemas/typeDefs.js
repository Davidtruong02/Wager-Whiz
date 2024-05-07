const { gql } = require('@apollo/server');

const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
  }

  type Player {
    playerName: String
    sport: String
    category: String
    line: String
    typeOfLine: String
    position: String
    team: String
    opponent: String
    usagePercent: String
    minutes: Int
    minutesPercentage: String
    projection: Int
    dvaPositionDefense: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }

  type Query {
    user(username: String!): User
    users: [User]
    player(playerName: String!): Player
  }
`;

module.exports = typeDefs;


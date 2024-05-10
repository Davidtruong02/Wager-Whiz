const { User } = require("../models");
const { PlayerData } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate("");
    },
    player: async (_, { playerName }) => {
      const player = await PlayerData.findOne({ playerName });
      return player;
    },
    // other queries...
  },

  Mutation: {
    addUser: async (_, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);

      return { token, user };
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("User not found");
      }

      const correctPassword = await user.isCorrectPassword(password);

      if (!correctPassword) {
        throw new AuthenticationError("Incorrect password");
      }

      const token = signToken(user);

      return { token, user };
    },
    // other mutations...
  },
};

module.exports = resolvers;

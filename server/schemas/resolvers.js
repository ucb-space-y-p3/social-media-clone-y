const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, {  }, context) => {
      // if (context.user) {
      //   const user = await User.findOne({ _id: context.user._id });
      //   return user;
      // }
      // throw AuthenticationError;
    },
    getFriends: async (parent, {  }, context) => {
      
    },
    getPosts: async (parent, {  }, context) => {
      
    },
    getComments: async (parent, {  }, context) => {
      
    },
    getChat: async (parent, {  }, context) => {
      
    },
    getChats: async (parent, {  }, context) => {
      
    },
    getNotifications: async (parent, {  }, context) => {
      
    },
    getUser: async (parent, {  }, context) => {
      
    },
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);
      return { token, user };
    },
    createUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    editUser: async (parent, {  }, context) => {
      
    },
    changePassword: async (parent, {  }, context) => {
      
    },
    deleteUser: async (parent, {  }, context) => {
      
    },
    addFriend: async (parent, {  }, context) => {
      
    },
    removeFriend: async (parent, {  }, context) => {
      
    },
    createPost: async (parent, {  }, context) => {
      
    },
    deletePost: async (parent, {  }, context) => {
      
    },
    createComment: async (parent, {  }, context) => {
      
    },
    createChat: async (parent, {  }, context) => {
      
    },
    leaveChat: async (parent, {  }, context) => {
      
    },
    clearNotifications: async (parent, {  }, context) => {
      
    },
  }
};

module.exports = resolvers;

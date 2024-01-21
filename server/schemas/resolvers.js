const { User, Post, Comment, Chat, Message, Notification } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError, PassAlongError, UserNotFoundError } = require('../utils/error');

const resolvers = {
  Query: {
    me: async (parent, { }, context) => {
      try {
        if (context.user) {
          const user = await User.findOne({ _id: context.user._id });
          return user;
        }
        throw AuthenticationError;

        // dev code

      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    getFriends: async (parent, { }, context) => {
      try {
        // if (context.user) {

        // }
        // throw AuthenticationError;

        // dev code
        // PassAlongError.extensions.error = {message: 'test'}
        // throw PassAlongError;
        console.log(AuthenticationError, 'test56');
        throw AuthenticationError;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    getPosts: async (parent, { }, context) => {
      try {
        // if (context.user) {

        // }
        // throw AuthenticationError;

        // dev code

      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    getComments: async (parent, { }, context) => {
      try {
        // if (context.user) {

        // }
        // throw AuthenticationError;

        // dev code

      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    getChat: async (parent, { }, context) => {
      try {
        // if (context.user) {

        // }
        // throw AuthenticationError;

        // dev code

      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    getChats: async (parent, { }, context) => {
      try {
        // if (context.user) {

        // }
        // throw AuthenticationError;

        // dev code

      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    getNotifications: async (parent, { }, context) => {
      try {
        // if (context.user) {

        // }
        // throw AuthenticationError;

        // dev code

      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    getUser: async (parent, { username }, context) => {
      try {
        // if (context.user) {

        // }
        // throw AuthenticationError;

        // dev code

        const user = await User.findOne({ username: username });
        return user;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    getUsers: async (parent, { }, context) => {
      try {
        // if (context.user) {

        // }
        // throw AuthenticationError;

        // dev code

        const users = await User.find();
        return users;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      try {
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
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    createUser: async (parent, { input: { username, email, password } }) => {
      try {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    editUser: async (parent, { userId, username, email }, context) => {
      try {
        // if (context.user) {

        // }
        // throw AuthenticationError;

        // dev code
        const user = await User.findOneAndUpdate(
          { _id: userId },
          {
            username,
            email
          },
          {
            new: true,
            runValidators: true
          }
        );
        return user;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    changePassword: async (parent, { userId, password }, context) => {
      try {
        // if (context.user) {

        // }
        // throw AuthenticationError;

        // dev code
        const user = await User.findOneAndUpdate(
          { _id: userId },
          {
            password
          },
          {
            new: true,
            runValidators: true
          }
        );
        return user;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    deleteUser: async (parent, { userId, }, context) => {
      try {
        // if (context.user) {

        // }
        // throw AuthenticationError;

        // dev code
        const user = await User.findOneAndDelete({ _id: userId });

        if (!user) {
          throw UserNotFoundError;
        };

        await Post.deleteMany({ _id: { $in: user.posts } });

        await Notification.deleteMany({ _id: { $in: user.notifications } });
        // need to remove this friend from other friends' lists
        await User.updateMany(
          { _id: { $in: user.friends } },
          { $pull: { friends: user._id } },
        );

        await Chat.updateMany(
          { _id: { $in: user.chats } },
          { $pull: { friends: user._id } },
        );

        return user;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    addFriend: async (parent, { me, friend }, context) => {
      try {
        // if (context.user) {

        // }
        // throw AuthenticationError;

        // dev code
        const newFriend = await User.findOneAndUpdate(
          { _id: friend },
          { $addToSet: { friends: me } },
          {
            new: true,
            runValidators: true
          }
        )
        if (!newFriend) {
          throw UserNotFoundError;
        };
        
        const user = await User.findOneAndUpdate(
          { _id: me },
          { $addToSet: { friends: friend } },
          {
            new: true,
            runValidators: true
          }
        );
        if (!user) {
          throw UserNotFoundError;
        };
        return newFriend;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    removeFriend: async (parent, { me, friend }, context) => {
      try {
        // if (context.user) {

        // }
        // throw AuthenticationError;

        // dev code

      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    createPost: async (parent, { userId, content }, context) => {
      try {
        // if (context.user) {

        // }
        // throw AuthenticationError;

        // dev code

      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    deletePost: async (parent, { }, context) => {
      try {
        // if (context.user) {

        // }
        // throw AuthenticationError;

        // dev code

      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    createComment: async (parent, { }, context) => {
      try {
        // if (context.user) {

        // }
        // throw AuthenticationError;

        // dev code

      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    createChat: async (parent, { }, context) => {
      try {
        // if (context.user) {

        // }
        // throw AuthenticationError;

        // dev code

      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    leaveChat: async (parent, { }, context) => {
      try {
        // if (context.user) {

        // }
        // throw AuthenticationError;

        // dev code

      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    clearNotifications: async (parent, { }, context) => {
      try {
        // if (context.user) {

        // }
        // throw AuthenticationError;

        // dev code

      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  }
};

module.exports = resolvers;

const { User, Post, Comment, Chat, Message, Notification, FriendRequest } = require('../models');
const { signToken } = require('../utils/auth');
const {
  AuthenticationError,
  UserNotFoundError,
  PostNotFoundError,
  CommentNotFoundError,
  ChatNotFoundError,
  MessageNotFoundError,
  NotificationNotFoundError,
  RequestNotFoundError,
} = require('../utils/error');



const resolvers = {
  Query: {
    me: async (parent, { }, context) => {
      try {
        if (context.user) {
          const user = await User.findOne({ _id: context.user._id });
          if (!user) {
            throw UserNotFoundError;
          };
          return user;
        }
        throw AuthenticationError;

        // dev code

      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    getFriends: async (parent, { username }, context) => {
      try {
        // if (context.user) {

        // }
        // throw AuthenticationError;

        // dev code
        const usersFriends = await User.findOne(
          { username },
          '_id username friends',).populate('friends');

        if (!usersFriends) {
          throw UserNotFoundError;
        };

        return usersFriends;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    // agith
    getPost: async (parent, { postId }, context) => {
      try {
        // if (context.user) {

        // }
        // throw AuthenticationError;

        // dev code
        const post = Post.findById(postId)

        if (!post) {
          throw PostNotFoundError;
        };

        return post;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    // agith
    getPosts: async (parent, { username }, context) => {
      try {
        // if (context.user) {

        // }
        // throw AuthenticationError;

        // dev code
        const user = await User.findOne(
          { username },
          '_id username posts',).populate('posts');

        if (!user) {
          throw UserNotFoundError;
        };

        return user.posts;

      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    // agith
    getComment: async (parent, { commentId }, context) => {
      try {
        // if (context.user) {

        // }
        // throw AuthenticationError;

        // dev code
        const comment = await Comment.findById(commentId);

        if (!comment) {
          throw CommentNotFoundError;
        }

        return comment;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    // agith
    getComments: async (parent, { username, postId }, context) => {
      try {
        // if (context.user) {

        // }
        // throw AuthenticationError;

        // dev code
        if (!!username) {
          const user = await User.findOne(
            { username },
            '_id username comments',).populate('comments');

          if (!user) {
            throw UserNotFoundError;
          };

          return user.comments;
        } else if (!!postId) {
          const post = await Post.findById(postId).populate('comments');
          if (!post) {
            throw PostNotFoundError;
          };
          return post.comments;
        }

        throw UserNotFoundError;

      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    // not necessary
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
    // not necessary
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
    // not necessary
    getMessages: async (parent, { chatId }, context) => {
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
    // not necessary
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
    // agith
    getUser: async (parent, { username }, context) => {
      try {
        // if (context.user) {

        // }
        // throw AuthenticationError;

        // dev code

        const user = await User.findOne({ username: username });
        if (!user) {
          throw UserNotFoundError;
        };
        return user;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    // agith
    getUsers: async (parent, { }, context) => {
      try {
        // if (context.user) {

        // }
        // throw AuthenticationError;

        // dev code

        const users = await User.find();
        if (!users) {
          throw UserNotFoundError;
        };
        return users;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
  Mutation: {
    // agith
    login: async (parent, { email, password }) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          throw UserNotFoundError;
        };

        const correctPw = await user.isCorrectPassword(password);
        if (!correctPw) {
          throw UserNotFoundError;
        };

        const token = signToken(user);
        return { token, user };
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    // agith
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
    // agith
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
        if (!user) {
          throw UserNotFoundError;
        };
        return user;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    // agith
    changePassword: async (parent, { userId, password }, context) => {
      try {
        // if (context.user) {

        // }
        // throw AuthenticationError;

        // dev code
        const user = await User.findById(userId);
        if (!user) {
          throw UserNotFoundError;
        };

        user.password = password;
        await user.validate();
        await user.save();

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

        const posts = await Post.deleteMany({ _id: { $in: user.posts } });

        const commentsToDelete = posts.map((post) => {
          return post.comments
        }).reduce((accumulator, currentArray) => accumulator.concat(currentArray), []);

        await Comment.deleteMany({
          $or: [
            { _id: { $in: commentsToDelete } },
            { _id: { $in: user.comments } },
          ]
        });

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
    requestFriend: async (parent, { requesterId, targetId }, context) => {
      try {
        // if (context.user) {

        // }
        // throw AuthenticationError;

        // dev code
        const friendRequest = await FriendRequest.findOneAndUpdate(
          { requesterId, targetId },
          { $set: { requesterId, targetId } },
          { upsert: true, new: true, setDefaultsOnInsert: true, runValidators: true },
        );

        const user = await User.findOneAndUpdate(
          { _id: targetId },
          { $addToSet: { friendRequests: friendRequest._id } },
          {
            new: true,
            runValidators: true
          }
        );

        if (!user) {
          await FriendRequest.deleteOne({ _id: friendRequest._id });
          throw UserNotFoundError;
        };

        return friendRequest;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    denyFriend: async (parent, { requestId }, context) => {
      try {
        // if (context.user) {

        // }
        // throw AuthenticationError;

        // dev code
        const friendRequest = await FriendRequest.deleteOne({ _id: requestId });

        if (!friendRequest) {
          return RequestNotFoundError;
        }

        const user = await User.findOneAndUpdate(
          { _id: targetId },
          { $pull: { friendRequests: friendRequest._id } },
          {
            new: true,
            runValidators: true
          }
        );

        if (!user) {
          throw UserNotFoundError;
        };

        return friendRequest;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    acceptFriend: async (parent, { requestId }, context) => {
      try {
        // if (context.user) {

        // }
        // throw AuthenticationError;

        // dev code
        const friendRequest = await FriendRequest.deleteOne({ _id: requestId });

        const newFriend = await User.findOneAndUpdate(
          { _id: friendRequest.targetId },
          { $addToSet: { friends: friendRequest.requesterId } },
          {
            new: true,
            runValidators: true
          }
        )
        if (!newFriend) {
          throw UserNotFoundError;
        };

        const user = await User.findOneAndUpdate(
          { _id: friendRequest.requesterId },
          { $addToSet: { friends: friendRequest.targetId } },
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
        const oldFriend = await User.findOneAndUpdate(
          { _id: friend },
          { $pull: { friends: me } },
          {
            new: true,
            runValidators: true
          }
        )
        if (!oldFriend) {
          throw UserNotFoundError;
        };

        const user = await User.findOneAndUpdate(
          { _id: me },
          { $pull: { friends: friend } },
          {
            new: true,
            runValidators: true
          }
        );
        if (!user) {
          throw UserNotFoundError;
        };
        return oldFriend;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    // agith
    createPost: async (parent, { username, content }, context) => {
      try {
        // if (context.user) {

        // }
        // throw AuthenticationError;

        // dev code
        const post = await Post.create({ content, creator: username });

        const user = await User.findOneAndUpdate(
          { username },
          { $addToSet: { posts: post._id } },
          {
            new: true,
            runValidators: true
          }
        );

        if (!user) {
          await Post.deleteOne({ _id: post._id });
          throw UserNotFoundError;
        };

        return post;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    // agith
    deletePost: async (parent, { postId }, context) => {
      try {
        // if (context.user) {

        // }
        // throw AuthenticationError;

        // dev code
        const post = await Post.findOneAndDelete({ _id: postId });

        if (!post) {
          throw PostNotFoundError;
        };

        

        const user = await User.findOneAndUpdate(
          { username: post.creator },
          { $pull: { posts: post._id } },
          {
            new: true,
            runValidators: true
          }
        );

        if (!user) {
          throw UserNotFoundError;
        };

        return post;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    // agith
    createComment: async (parent, { postId, content, username }, context) => {
      try {
        // if (context.user) {

        // }
        // throw AuthenticationError;

        // dev code
        const comment = await Comment.create({ postId, content, creator: username });

        const post = await Post.findOneAndUpdate(
          { _id: postId },
          { $addToSet: { comments: comment._id } },
          {
            new: true,
            runValidators: true
          }
        );

        if (!post) {
          await Comment.deleteOne({ _id: comment._id });
          throw PostNotFoundError;
        };

        const user = await User.findOneAndUpdate(
          { username },
          { $addToSet: { comments: comment._id } },
          {
            new: true,
            runValidators: true
          }
        );

        if (!user) {
          await Comment.deleteOne({ _id: comment._id });
          throw UserNotFoundError;
        };

        return comment;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    // agith
    deleteComment: async (parent, { commentId }, context) => {
      try {
        // if (context.user) {

        // }
        // throw AuthenticationError;

        // dev code
        const comment = await Comment.findOneAndDelete({ _id: commentId });

        if (!comment) {
          throw CommentNotFoundError;
        };

        const post = await Post.findOneAndUpdate(
          { _id: comment.postId },
          { $pull: { comments: comment._id } },
          {
            new: true,
            runValidators: true
          }
        );

        if (!post) {
          throw PostNotFoundError;
        };

        const user = await User.findOneAndUpdate(
          { username: comment.creator },
          { $pull: { comments: comment._id } },
          {
            new: true,
            runValidators: true
          }
        );

        if (!user) {
          throw UserNotFoundError;
        };

        return comment;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    // not necessary
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
    // not necessary
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
    // not necessary
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

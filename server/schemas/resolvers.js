const { User, Post, Comment, Chat, Message, Notification, FriendRequest } = require('../models');
const { signToken } = require('../utils/auth');
const { PubSub } = require('graphql-subscriptions');

const pubsub = new PubSub();
// const { createWebsocket,  } = require('@apollo/server-ws');
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
    // agith
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

        return usersFriends.friends;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    // agith
    getFriendRequest: async (parent, { requestId }, context) => {
      try {
        // if (context.user) {

        // }
        // throw AuthenticationError;

        // dev code

        const friendRequest = await FriendRequest.findById(requestId);
        // const friendRequest = await FriendRequest.findOne({"_id": requestId}, '_id');

        // console.log(friendRequest, '---------');

        if (!friendRequest) {
          throw RequestNotFoundError;
        };

        return friendRequest;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    // agith
    getFriendRequests: async (parent, { username }, context) => {
      try {
        // if (context.user) {

        // }
        // throw AuthenticationError;

        // dev code
        const usersRequests = await User.findOne(
          { username },
          '_id username friendRequests',).populate('friendRequests');

        if (!usersRequests) {
          throw UserNotFoundError;
        };

        return usersRequests.friendRequests;
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
        const post = await Post.findById(postId);

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
    getComment: async (parent, { postId, commentId }, context) => {
      try {
        // if (context.user) {

        // }
        // throw AuthenticationError;

        // dev code
        const post = await Post.findById(postId);

        if (!post) {
          throw PostNotFoundError;
        }

        return post.comments.find((comment) => comment._id == commentId) || {};
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    // agith
    getComments: async (parent, { postId }, context) => {
      try {
        // if (context.user) {

        // }
        // throw AuthenticationError;

        // dev code
        const post = await Post.findById(postId).populate('comments');
        if (!post) {
          throw PostNotFoundError;
        };
        return post.comments;

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

    // dev methods
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
    // agith
    getAllPosts: async (parent, { }, context) => {
      try {
        // if (context.user) {

        // }
        // throw AuthenticationError;

        // dev code

        const posts = await Post.find();
        if (!posts) {
          throw PostNotFoundError;
        };
        return posts;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    // agith
    getAllRequests: async (parent, { }, context) => {
      try {
        // if (context.user) {

        // }
        // throw AuthenticationError;

        // dev code

        const friendRequest = await FriendRequest.find();
        if (!friendRequest) {
          throw RequestNotFoundError;
        };
        return friendRequest;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
  Subscription: {
    messageSent: {
      messageSent: {
        subscribe: (_, { chatId }) => pubsub.asyncIterator(`MESSAGE_SENT_${chatId}`)
      },
      messageReceived: {
        subscribe: (_, { userId }) => pubsub.asyncIterator(`MESSAGE_RECEIVED_${userId}`)
      },
      userConnected: {
        subscribe: (_, { userId }) => pubsub.asyncIterator(`USER_CONNECTED_${userId}`)
      },
      userDisconnected: {
        subscribe: (_, { userId }) => pubsub.asyncIterator(`USER_DISCONNECTED_${userId}`)
      },
      friendAdded: {
        subscribe: (_, { userId, friendId }) => pubsub.asyncIterator(`FRIEND_ADDED_${userId}_${friendId}`)
      },
      friendRemoved: {
        subscribe: (_, { userId, friendId }) => pubsub.asyncIterator(`FRIEND_REMOVED_${userId}_${friendId}`)
      },
      friendRequestAccepted: {
        subscribe: (_, { userId, friendRequestId }) => pubsub.asyncIterator(`FRIEND_REQUEST_ACCEPTED_${userId}_${friendRequestId}`)
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
    // agith
    deleteUser: async (parent, { userId, password }, context) => {
      try {
        // if (context.user) {

        // }
        // throw AuthenticationError;

        // dev code
        const user = await User.findOneAndDelete({ _id: userId });
        if (!user) {
          throw UserNotFoundError;
        };

        const correctPw = await user.isCorrectPassword(password);
        if (!correctPw) {
          throw UserNotFoundError;
        };

        await Post.deleteMany({ _id: { $in: user.posts } });

        // await Notification.deleteMany({ _id: { $in: user.notifications } });

        // need to remove this friend from other friends' lists
        await User.updateMany( // this could be used for removing comments maybe
          { _id: { $in: user.friends } },
          { $pull: { friends: user._id } },
        );

        // await Chat.updateMany(
        //   { _id: { $in: user.chats } },
        //   { $pull: { friends: user._id } },
        // );

        return user;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    // agith
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

        // const friendRequest = await FriendRequest.create({ requesterId, targetId });

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
    // agith
    denyFriend: async (parent, { requestId }, context) => {
      try {
        // if (context.user) {

        // }
        // throw AuthenticationError;

        // dev code
        const friendRequest = await FriendRequest.findByIdAndDelete(requestId);

        if (!friendRequest) {
          return RequestNotFoundError;
        }

        const user = await User.findOneAndUpdate(
          { _id: friendRequest.targetId },
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
    // agith
    acceptFriend: async (parent, { requestId }, context) => {
      try {
        // if (context.user) {

        // }
        // throw AuthenticationError;

        // dev code
        const friendRequest = await FriendRequest.findOneAndDelete({ _id: requestId });
        // console.log(friendRequest);

        const newFriend = await User.findOneAndUpdate(
          { _id: friendRequest.targetId },
          {
            $addToSet: { friends: friendRequest.requesterId },
            $pull: { friendRequests: requestId }
          },
          {
            new: true,
            runValidators: true
          }
        )
        // console.log('first');
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
        // console.log('second');
        if (!user) {
          throw UserNotFoundError;
        };
        return newFriend;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    // agith
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
    // deleteRequest: async (parent, { requestId }, context) => {
    //   try {
    //     // if (context.user) {

    //     // }
    //     // throw AuthenticationError;

    //     // dev code
    //     const friendRequest = await FriendRequest.findByIdAndDelete(requestId);

    //     if (!friendRequest) {
    //       throw RequestNotFoundError;
    //     };

    //     const user = await User.findOneAndUpdate(
    //       { _id: friendRequest.targetId },
    //       {
    //         $pull: { friendRequests: requestId }
    //       },
    //       {
    //         new: true,
    //         runValidators: true
    //       }
    //     )
    //     if (!user) {
    //       throw UserNotFoundError;
    //     };

    //     return friendRequest;

    //   } catch (error) {
    //     console.log(error);
    //     throw error;
    //   }
    // },
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
        const comment = { postId, content, creator: username }

        const post = await Post.findOneAndUpdate(
          { _id: postId },
          { $addToSet: { comments: comment } },
          {
            new: true,
            runValidators: true
          }
        );

        if (!post) {
          throw PostNotFoundError;
        };

        return post.comments.find((newComment) => newComment.content == comment.content && newComment.creator == comment.creator);
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    // agith
    deleteComment: async (parent, { postId, commentId }, context) => {
      try {
        // if (context.user) {

        // }
        // throw AuthenticationError;

        // dev code
        const post = await Post.findOneAndUpdate(
          { _id: postId },
          { $pull: { comments: { _id: commentId } } },
          {
            // new: true,
            // runValidators: true
          }
        );

        if (!post) {
          throw PostNotFoundError;
        };

        return post.comments.find((comment) => comment._id == commentId);
      } catch (error) {
        console.log(error);
        throw error;
      }
    },


    // websockets



    // not necessary
    createChat: async (parent, { }, context) => {
      try {
        if (context.user) {

          // }
         throw new AuthenticationError('You must be logged in');
        }
        //create a new chat with db
        const chat = await Chat.create({ recipients });
        return chat;
      } catch (error) {
        console.error('Error al crear el chat:', error);
        throw error;
      }
    },
    sendMessage: async (parent, { chatId, content, username }, { pubsub }) => {
      try {
        //save message to db
        const newMessage = await Message.create({
          chatId,
          content,
          creator: username,
          createdAt: new Date().toISOString(),
        });
        //add message to chat of suscribes
        pubsub.publish(`MESSAGE_SENT_${chatId}`, { messageSent: newMessage });
        return newMessage;
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
  },


};

module.exports = resolvers;

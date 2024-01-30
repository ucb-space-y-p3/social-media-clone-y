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
          const user = await User.findOne({ _id: context.user._id }).populate(['posts', 'comments', 'incomingFriendRequests', 'outgoingFriendRequests', 'activeChats']);
          if (!user) {
            throw UserNotFoundError;
          };
          return user;
        }
        throw AuthenticationError;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    // oth
    // agith
    // getFriends: async (parent, { username }, context) => {
    //   try {
    //     if (context.user) {
    //       const user = await User.findOne({ username: username }).populate('posts');
    //       if (!user) {
    //         throw UserNotFoundError;
    //       };
    //       return user;
    //     }
    //     throw AuthenticationError;
    //   } catch (error) {
    //     console.log(error);
    //     throw error;
    //   }
    // },
    getUser: async (parent, { username }, context) => {
      try {
        if (context.user) {
          const user = await User.findOne({ username }).populate(['posts', 'friends']);
          if (!user) {
            throw UserNotFoundError;
          };
          return user;
        }
        throw AuthenticationError;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    getFriendRequest: async (parent, { requestId }, context) => {
      try {
        if (context.user) {
          const friendRequest = await FriendRequest.findById(requestId);
          if (!friendRequest) {
            throw RequestNotFoundError;
          };
          return friendRequest;
        }
        throw AuthenticationError;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    getPost: async (parent, { postId }, context) => {
      try {
        if (context.user) {
          const post = await Post.findById(postId).populate('comments');
          if (!post) {
            throw PostNotFoundError;
          };
          return post;
        }
        throw AuthenticationError;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    getAllPosts: async (parent, { }, context) => {
      try {
        if (context.user) {
          const posts = await Post.find().sort({ 'createdAt': -1 });
          if (!posts) {
            throw PostNotFoundError;
          };
          return posts;
        }
        throw AuthenticationError;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    getCirclePosts: async (parent, { }, context) => {
      try {
        if (context.user) {
          const user = await User.findById(context.user._id);
          if (!user) {
            throw UserNotFoundError;
          };

          const posts = await Post.find({
            creatorId: { $in: [...user.friends, user._id] }
          }).sort({ 'createdAt': -1 });
          if (!posts) {
            throw PostNotFoundError;
          };

          return posts;
        }
        throw AuthenticationError;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    // agith

    // not necessary
    getChat: async (parent, { chatId }, context) => {
      try {
        if (context.user) {
          // the sort wasn't working with subdocuments
          // const chat = await Chat.findById(chatId).populate('messages').sort({ 'messages.createdAt': -1 });
          const chat = await Chat.findById(chatId);
          if (!chat) {
            ChatNotFoundError;
          }

          const user = await User.findById(context.user._id);
          if (!user) {
            throw UserNotFoundError;
          };

          const messages = await Message.find({ chatId }).sort({ 'createdAt': -1 });

          chat.messages = messages;

          for (const tempChat of user.activeChats) {
            if (chatId === tempChat._id.toString()) {
              return chat;
            }
          }
          // return chat;
        }
        throw AuthenticationError;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    // not necessary
    getChats: async (parent, { }, context) => {
      try {
        if (context.user) {
          const user = await User.findById(context.user._id).populate('activeChats');
          if (!user) {
            throw UserNotFoundError;
          };
          return user.activeChats;
        }
        throw AuthenticationError;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },

  Subscription: {

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
    createUser: async (parent, { input: { username, email, password, firstInitial, lastInitial } }) => {
      try {
        const user = await User.create({ username, email, password, firstInitial, lastInitial });
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    // agith
    editUser: async (parent, { username, email, firstInitial, lastInitial }, context) => {
      try {
        if (context.user) {
          const user = await User.findOneAndUpdate(
            { _id: context.user._id },
            {
              username,
              email,
              firstInitial,
              lastInitial
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
        }
        throw AuthenticationError;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    // agith
    changePassword: async (parent, { password }, context) => {
      try {
        if (context.user) {
          const user = await User.findById(context.user._id);
          if (!user) {
            throw UserNotFoundError;
          };

          user.password = password;
          await user.validate();
          await user.save();

          return user;
        }
        throw AuthenticationError;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    // come back for later
    deleteUser: async (parent, { password }, context) => {
      try {
        if (context.user) {
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
          //   { _id: {//n: user.chats } },
          //   { $pull: { friends: user._id } },
          // );


          return user;
        }
        throw AuthenticationError;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    // agith
    requestFriend: async (parent, { targetId }, context) => {
      try {
        if (context.user) {
          const friendRequest = await FriendRequest.findOneAndUpdate(
            { requesterId: context.user._id, targetId },
            { $set: { requesterId: context.user._id, targetId } },
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
        }
        throw AuthenticationError;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    // agith
    denyFriend: async (parent, { requestId }, context) => {
      try {
        if (context.user) {
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
        }
        throw AuthenticationError;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    // // agith
    acceptFriend: async (parent, { requestId }, context) => {
      try {
        // if (context.user) {

        // }
        // throw AuthenticationError;

        // dev code
        const friendRequest = await FriendRequest.findOneAndDelete({ _id: requestId });
        // console.log(friendRequest);
        if (!friendRequest) {
          // Handle the case where no friend request is found with the given ID
          throw new Error('Friend request not found');
        }
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
        pubsub.publish(`FRIEND_ADDED_${friendRequest.requesterId}_${friendRequest.targetId}`, {
          friendAdded: { userId: friendRequest.requesterId, friendId: friendRequest.targetId }
        });
        return newFriend;

      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    friendRequestAccepted: async (parent, { userId, friendRequestId }, { pubsub }) => {
      try {
        // Find and remove the friend request from the database
        const friendRequest = await FriendRequest.findByIdAndDelete(friendRequestId);
        if (!friendRequest) {
          throw new Error("Friend request not found");
        }

        // Update the user who accepted the friend request
        const user = await User.findOneAndUpdate(
          { _id: userId },
          {
            $addToSet: { friends: friendRequest.requesterId },
            $pull: { friendRequests: friendRequestId }
          },
          { new: true }
        );

        if (!user) {
          throw new Error("User not found");
        }

        // Notify subscribers that the friend request has been accepted
        pubsub.publish(`FRIEND_REQUEST_ACCEPTED_${userId}_${friendRequestId}`, {
          friendRequestAccepted: { userId, friendRequestId }
        });
        // Returnthe friend request acceptance
        return { success: true, message: "Friend request accepted successfully", user };
      } catch (error) {
        console.log(error);
        throw error;
      }
    },


    // agith

    removeFriend: async (parent, { me, friend }, { pubsub }) => {
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
        // Publish the event to notify subscribers about the friend removal
        pubsub.publish(`FRIEND_REMOVED_${me}_${friend}`, { friendRemoved: { userId: me, friendId: friend } });
        // return some information about the friend removal
        return { success: true, message: "Friend removed successfully" };
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    // agith
    createPost: async (parent, { content }, context) => {
      try {
        if (context.user) {
          const post = await Post.create({ content, creator: context.user.username, creatorId: context.user._id, creatorFirstInitial: context.user.firstInitial, creatorLastInitial: context.user.lastInitial });

          const user = await User.findOneAndUpdate(
            { _id: context.user._id },
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
        }
        throw AuthenticationError;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    // get the post and check if it creator is the same as the context user
    deletePost: async (parent, { postId }, context) => {
      try {
        if (context.user) {
          const user = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { posts: postId } },
            {
              new: true,
              runValidators: true
            }
          );

          if (!user) {
            throw UserNotFoundError;
          };

          await User.findOneAndUpdate(
            { likedPosts: { $elemMatch: { _id: postId } } },
            { $pull: { likedPosts: comment._id } },
          )

          const post = await Post.findOneAndDelete({ _id: postId });

          if (!post) {
            throw PostNotFoundError;
          };

          await Comment.deleteMany({ postId: postId });

          await User.findOneAndUpdate(
            { likedComments: { $elemMatch: { $in: post.comments } } },
            { $pull: { likedComments: { $each: post.comments } } }
          )

          return post;
        }
        throw AuthenticationError;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    // agith
    createComment: async (parent, { postId, content }, context) => {
      try {
        if (context.user) {
          const comment = await Comment.create({ content, postId, creator: context.user.username, creatorId: context.user._id });

          const post = await Post.findOneAndUpdate(
            { _id: postId },
            { $addToSet: { comments: comment } },
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
            { _id: context.user._id },
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
        }
        throw AuthenticationError;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    // come back to later
    // check if the user is the owner of the comment first 
    deleteComment: async (parent, { commentId }, context) => {
      try {
        if (context.user) {
          const user = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { comments: comment._id } },
            {
              new: true,
              runValidators: true
            }
          );
          if (!user) {
            throw UserNotFoundError;
          };

          await User.findOneAndUpdate(
            { likedComments: { $elemMatch: { _id: commentId } } },
            { $pull: { likedComments: commentId } },
          )

          const post = await Post.findOneAndUpdate(
            { _id: postId },
            { $pull: { comments: commentId } },
            {
              new: true,
              runValidators: true
            }
          );
          if (!post) {
            throw PostNotFoundError;
          };

          const comment = await Comment.findOneAndDelete({ _id: commentId });
          if (!comment) {
            throw PostNotFoundError;
          };

          return comment;
        }
        throw AuthenticationError;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    createChat: async (parent, { chatName, recipients }, context) => {
      try {
        if (context.user) {
          const chat = await Chat.create({ chatName, recipients });
          console.log(chat);
          for (const user of recipients) {
            const returnedUser = await User.findOneAndUpdate(
              { _id: user },
              { $addToSet: { activeChats: chat._id } },
              {
                new: true,
                runValidators: true
              }
            ).populate('activeChats');
            // console.log(returnedUser);
            // console.log(`Adding to chat(${chatName}), ${returnedUser.username}`)
            if (!returnedUser) {
              await Chat.deleteOne({ _id: chat._id });
              throw UserNotFoundError;
            };
          }
          return chat;
        }
        throw AuthenticationError;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    leaveChat: async (parent, { chatId }, context) => {
      try {
        if (context.user) {
          const chat = await Chat.findOneAndUpdate(
            { _id: chatId },
            { $pull: { recipients: context.user._id } },
            {
              new: true,
              runValidators: true
            }
          );
          if (!chat) {
            throw ChatNotFoundError;
          }

          const user = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { activeChats: chat._id } },
            {
              new: true,
              runValidators: true
            }
          );
          if (!user) {
            throw UserNotFoundError;
          }

          if (chat.userCount < 1) {
            await Chat.deleteOne({ _id: chat._id });
            console.log(`Chat (${chat.chatName}) has been deleted.`);
          }

          return chat;
        }
        throw AuthenticationError;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    addToChat: async (parent, { chatId, recipients }, context) => {
      try {
        if (context.user) {
          const chat = await Chat.findOneAndUpdate(
            { _id: chatId },
            { $addToSet: { recipients: { $each: recipients } } },
            {
              new: true,
              runValidators: true
            }
          );
          if (!chat) {
            throw ChatNotFoundError;
          }

          await User.findOneAndUpdate(
            { _id: { $in: recipients } },
            { $addToSet: { activeChats: chat._id } },
            {
              new: true,
              runValidators: true
            }
          );

          return chat;
        }
        throw AuthenticationError;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    addUserToChat: async (parent, { chatId, username }, context) => {
      try {
        if (context.user) {
          const user = await User.findOneAndUpdate(
            { username },
            { $addToSet: { activeChats: chatId } },
            {
              new: true,
              runValidators: true
            }
          );
          console.log(username, user);
          if (!user) {
            throw UserNotFoundError;
          }

          const chat = await Chat.findOneAndUpdate(
            { _id: chatId },
            { $addToSet: { recipients: user._id } },
            {
              new: true,
              runValidators: true
            }
          );
          if (!chat) {
            throw ChatNotFoundError;
          }


          return chat;
        }
        throw AuthenticationError;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    sendMessage: async (parent, { chatId, content, commentId, postId }, context) => {
      try {
        if (context.user) {
          //save message to db
          const message = await Message.create({
            chatId,
            content,
            creator: context.user.username,
            creatorId: context.user._id,
            commentId,
            postId,
          });

          const chat = await Chat.findOneAndUpdate(
            { _id: chatId },
            { $addToSet: { messages: message._id } },
            {
              new: true,
              runValidators: true
            }
          )

          if (!chat) {
            await Message.deleteOne({ _id: message._id });
            throw UserNotFoundError;
          };
          //add message to chat of suscribes
          // pubsub.publish(`MESSAGE_SENT_${chatId}`, { messageSent: message });
          return message;
        }
        throw AuthenticationError;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },


    receiveMessage: async (parent, { userId, message }, { pubsub }) => {
      try {

        const newMessage = await Message.create({
          userId,
          content: message,
          createdAt: new Date().toISOString(),
        });
        pubsub.publish(`MESSAGE_RECEIVED_${userId}`, { messageReceived: newMessage });
        return newMessage;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    userConnected: async (parent, { userId }, { pubsub }) => {
      try {
        // Update user status to "online"
        const user = await User.findByIdAndUpdate(userId, { status: 'online' }, { new: true });

        // Notify friends about user connection
        const friends = await User.find({ _id: { $in: user.friends } });

        // Notify each friend about the user connection
        friends.forEach(async (friend) => {
          // Publish a friend connection event
          pubsub.publish(`FRIEND_CONNECTED_${friend._id}_${userId}`, { friendConnected: { userId } });
        });

        return { success: true, message: 'User connected successfully' };
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    userDisconnected: async (parent, { userId }, { pubsub }) => {
      try {
        // Update user status to "offline"
        const user = await User.findByIdAndUpdate(userId, { status: 'offline' }, { new: true });

        // Notify friends about user disconnection
        const friends = await User.find({ _id: { $in: user.friends } });

        // Notify each friend about the user disconnection
        friends.forEach(async (friend) => {
          // Publish a friend disconnection event
          pubsub.publish(`FRIEND_DISCONNECTED_${friend._id}_${userId}`, { friendDisconnected: { userId } });
        });

        return { success: true, message: 'User disconnected successfully' };
      } catch (error) {
        console.log(error);
        throw error;
      }
    },



  },
};

module.exports = resolvers;

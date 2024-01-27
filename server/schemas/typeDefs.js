const typeDefs = `
  # Define which fields are accessible
  type User {
    _id: ID
    username: String
    email: String
    friendCount: Int
    friends: [User]
    requestCount: Int
    friendRequests: [FriendRequest]
    postCount: Int
    posts: [Post]
    chatCount: Int
    activeChats: [Chat]
    notificationCount: Int
    notifications: [Notification]
    # likedPosts: [Post]
    # likedComments: [Comment]
    settings: Settings
    chats: [Chat]
  }

  type Settings {
    silentMode: Boolean
  }

  type Notification {
    _id: ID
    type: String
    alert: String
    createdAt: String
    isCleared: Boolean
  }

  type FriendRequest {
    _id: ID
    requesterId: ID
    targetId: ID
    createdAt: String
  }

  type Post {
    _id: ID
    creator: String
    content: String
    createdAt: String
    # likeCount: Int
    commentCount: Int
    comments: [Comment]
  }

  type Comment {
    _id: ID
    postId: ID
    creator: String
    createdAt: String
    content: String
  }

  type Chat {
    _id: ID
    isGroupChat: Boolean
    recipients: [User]
    messages: [Message]
  }

  type Message {
    _id: ID
    chatId: ID
    postId: ID
    commentId: ID
    content: String
    creator: String
    createdAt: String
  }
  type Subscription {
    messageSent(chatId: ID!): Message
    messageReceived(userId: ID!): Message
    userConnected(userId: ID!): User
    userDisconnected(userId: ID!): User
    friendAdded(userId: ID!, friendId: ID!): User
    friendRemoved(userId: ID!, friendId: ID!): User
    friendRequestAccepted(userId: ID!, friendRequestId: ID!): User
  }

  type Auth {
    token: ID!
    user: User
  }

  # Define which queries the front end is allowed to make and what data is returned
  type Query {
    me: User
    getUser(username: String!): User
    getFriends(username: String!): [User]
    getFriendRequest(requestId: ID!): FriendRequest
    getFriendRequests(username: String!): [FriendRequest]
    getPost(postId: ID!): Post
    getPosts(username: String!): [Post]
    getComment(postId: ID!, commentId: ID!): Comment
    getComments(postId: ID!): [Comment]
    getChat(chatId: ID!): Chat
    getChats: [Chat]
    getMessages(chatId: ID!): [Message]  
    getNotifications: [Notification]
    # dev methods
    getUsers: [User]
    getAllPosts: [Post]
    getAllRequests: [FriendRequest]
    chat:[Message]
    getPushNotifications(userId: ID!): [PushNotification]
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    createUser(input: UserInput): Auth
    editUser(username: String, email: String, userId: ID!): Auth
    changePassword(userId: ID!, password: String!): User
    deleteUser(userId: ID!, password: String!): User
    requestFriend(requesterId: ID!, targetId: String!): FriendRequest
    acceptFriend(requestId: ID!): User
    denyFriend(requestId: ID!): FriendRequest
    removeFriend(me: ID!, friend: String!): User
    createPost(username: String!, content: String!): Post
    deletePost(postId: ID!): Post
    createComment(postId: ID!, content: String!, username: String!): Comment
    deleteComment(postId: ID!, commentId: ID!): Comment
    sendMessage(input: SendMessageInput!): Message
createChat(recipients: [String]!): Chat
deleteChat(chatId: ID!): Chat
clearNotifications: User
sendPushNotification(userId: ID!, message: String!): Boolean
  }

  type PushNotification {
    userId: ID!
    message: String!
    sentAt: String!
  }
  
input SendMessageInput {
  chatId: ID!
  content: String!
  creator: String!

  }
 
`;

module.exports = typeDefs;

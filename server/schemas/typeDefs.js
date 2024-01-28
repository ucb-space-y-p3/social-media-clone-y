const typeDefs = `
  # Define which fields are accessible
  type User {
    _id: ID
    username: String
    firstInitial: String
    lastInitial: String
    email: String
    friendCount: Int
    friends: [User]
    requestCount: Int
    incomingFriendRequests: [FriendRequest]
    outgoingFriendRequests: [FriendRequest]
    postCount: Int
    posts: [Post]
    commentCount: Int
    comments: [Comment]
    chatCount: Int
    activeChats: [Chat]
    notificationCount: Int
    notifications: [Notification]
    likedPosts: [Post]
    likedComments: [Comment]
    settings: Settings
    chats: [Chat]
  }

  type Settings {
    isDarkMode: Boolean
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
    likedBy: [User]
    likeCount: Int
    commentCount: Int
    comments: [Comment]
  }

  type Comment {
    _id: ID
    postId: ID
    creator: String
    createdAt: String
    content: String
    likedBy: [User]
    likeCount: Int
  }

  type Chat {
    _id: ID
    isGroupChat: Boolean
    chatName: String
    recipients: [User]
    messages: [Message]
  }

  type Message {
    _id: ID
    content: String
    chatId: ID
    postId: ID
    commentId: ID
    creator: String
    createdAt: String
  }
  type Subscription {
    messageSent(chatId: ID!): Message
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
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    createUser(input: UserInput): Auth
    editUser(username: String, email: String): User
    changePassword(password: String!): User
    deleteUser(password: String!): User
    requestFriend(targetId: String!): FriendRequest
    acceptFriend(requestId: ID!): User
    denyFriend(requestId: ID!): FriendRequest
    removeFriend(friend: String!): User
    createPost(content: String!): Post
    deletePost(postId: ID!): Post
    createComment(content: String!): Comment
    deleteComment(commentId: ID!): Comment

    sendMessage(chatId: ID!, content: String!, username: String!): Message
    createChat(recipients: [String]!): Chat
    deleteChat(chatId: ID!): Chat
    clearNotifications: User


  }
`;

module.exports = typeDefs;

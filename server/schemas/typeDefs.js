const typeDefs = `
  # Define which fields are accessible
  type User {
    _id: ID
    username: String
    email: String
    posts: [Post]
    friends: [User]
    chats: [Chat]
    notifications: [Notification]
    friendCount: Int
    postCount: Int
    settings: Settings
  }

  type Settings {
    silentMode: Boolean
  }

  type Notification {
    _id: ID
    type: String
    message: String
    createdAt: String
    isCleared: Boolean
  }

  type Post {
    _id: ID
    creator: String
    content: String
    createdAt: String
    likeCount: Int
    commentCount: Int
    comments: [Comment]
  }

  type Comment {
    _id: ID
    postId: ID
    creatorName: String
    createdAt: String
    content: String
  }

  type Chat {
    _id: ID
    isGroupChat: Boolean
    currentRecipients: [User]
    pastRecipients: [User]
    messages: [Message]
  }

  type Message {
    _id: ID
    creator: String!
    createdAt: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  # Define which queries the front end is allowed to make and what data is returned
  type Query {
    me: User
    getFriends: User
    getPost(postId: ID!): Post
    getPosts: [Post]
    getComments: [Comment]
    getChat(chatId: ID!): Chat
    getChats: [Chat]
    getNotifications: [Notification]
    getUser(username: String!): User
    
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    editUser(username: String, email: String): User
    changePassword(oldPassword: String!): User
    deleteUser(username: String!, email: String!, password: String!): User
    login(email: String!, password: String!): Auth
    addFriend(friend: String!): User
    removeFriend(friend: String!): User
    createPost(content: String!): Post
    deletePost(postId: ID!): Post
    createComment(postId: ID!, content: String!): Comment
    deleteComment(commentId: ID!): Comment
    createChat(recipientIds: [ID]!, firstMessage: String!): Chat
    leaveChat(chatId: ID!): Chat
    clearNotifications(notificationIds: [ID]!): [Notification]
  }
`;

module.exports = typeDefs;

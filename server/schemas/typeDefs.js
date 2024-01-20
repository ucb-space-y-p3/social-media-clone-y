const typeDefs = `
  # Define which fields are accessible
  type User {
    _id: ID
    username: String
    email: String
    posts
    friends
    chats
    friendCount
    postCount
  }

  type Post {
    _id: ID
    creator:
    likeCount:
    commentCount:
    cooments: [Comments]!
  }

  type Chat {

  }

  input xxxxInput {

  }

  type Auth {
    token: ID!
    user: User
  }

  # Define which queries the front end is allowed to make and what data is returned
  type Query {
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addFriend(user: String!, newFriend: String!): User
  }
`;

module.exports = typeDefs;

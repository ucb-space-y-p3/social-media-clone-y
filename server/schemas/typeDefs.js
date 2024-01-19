const typeDefs = `
  # Define which fields are accessible
  type User {
    _id: ID
    username: String
    email: String
    
  }

  # type xxx {

  # }

  # input xxxxInput {

  # }

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
  }
`;

module.exports = typeDefs;

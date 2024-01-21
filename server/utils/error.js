const { GraphQLError } = require('graphql');

module.exports = {
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),
  PassAlongError: new GraphQLError('An error occurred.', {
    extensions: {
      code: 'ERROR',
      error: {},
    },
  }),
}
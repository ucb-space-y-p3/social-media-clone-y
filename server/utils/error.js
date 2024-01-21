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
  UserNotFoundError: new GraphQLError('User could not be found.', {
    extensions: {
      code: 'RESOURCE NOT FOUND',
      error: {},
    },
  }),
  PostNotFoundError: new GraphQLError('Post could not be found.', {
    extensions: {
      code: 'RESOURCE NOT FOUND',
      error: {},
    },
  }),
  CommentNotFoundError: new GraphQLError('Comment could not be found.', {
    extensions: {
      code: 'RESOURCE NOT FOUND',
      error: {},
    },
  }),
  ChatNotFoundError: new GraphQLError('Chat could not be found.', {
    extensions: {
      code: 'RESOURCE NOT FOUND',
      error: {},
    },
  }),
  MessageNotFoundError: new GraphQLError('Message could not be found.', {
    extensions: {
      code: 'RESOURCE NOT FOUND',
      error: {},
    },
  }),
  NotificationNotFoundError: new GraphQLError('Notification could not be found.', {
    extensions: {
      code: 'RESOURCE NOT FOUND',
      error: {},
    },
  }),
}
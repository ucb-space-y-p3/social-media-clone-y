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
  UserNotFoundError: new GraphQLError('User(s) could not be found.', {
    extensions: {
      code: 'RESOURCE NOT FOUND',
      error: {},
    },
  }),
  PostNotFoundError: new GraphQLError('Post(s) could not be found.', {
    extensions: {
      code: 'RESOURCE NOT FOUND',
      error: {},
    },
  }),
  CommentNotFoundError: new GraphQLError('Comment(s) could not be found.', {
    extensions: {
      code: 'RESOURCE NOT FOUND',
      error: {},
    },
  }),
  ChatNotFoundError: new GraphQLError('Chat(s) could not be found.', {
    extensions: {
      code: 'RESOURCE NOT FOUND',
      error: {},
    },
  }),
  MessageNotFoundError: new GraphQLError('Message(s) could not be found.', {
    extensions: {
      code: 'RESOURCE NOT FOUND',
      error: {},
    },
  }),
  NotificationNotFoundError: new GraphQLError('Notification(s) could not be found.', {
    extensions: {
      code: 'RESOURCE NOT FOUND',
      error: {},
    },
  }),
}
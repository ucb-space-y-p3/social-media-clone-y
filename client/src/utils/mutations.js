import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    user {
      _id
      username
      email
    }
    token
  }
}
`;

export const CREATE_USER = gql`
mutation CreateUser($input: UserInput) {
  createUser(input: $input) {
    user {
      _id
      username
      email
    }
    token
  }
}
`;

export const EDIT_USER = gql`
mutation EditUser {
  editUser {
    _id
    username
    email
    firstInitial
    lastInitial
  }
}
`;

export const CHANGE_PASSWORD = gql`
mutation ChangePassword($password: String!) {
  changePassword(password: $password) {
    _id
    username
    email
    firstInitial
    lastInitial
  }
}
`;

export const DELETE_USER = gql`
mutation DeleteUser($password: String!) {
  deleteUser(password: $password) {
    _id
    username
    email
    firstInitial
    lastInitial
  }
}
`;

export const REQUEST_FRIEND = gql`
mutation RequestFriend($targetId: String!) {
  requestFriend(targetId: $targetId) {
    _id
    requesterId
    targetId
    createdAt
  }
}
`;

export const ACCEPT_FRIEND = gql`
mutation AcceptFriend($requestId: ID!) {
  acceptFriend(requestId: $requestId) {
    _id
    username
    firstInitial
    lastInitial
  }
}
`;

export const DENY_FRIEND = gql`
mutation DenyFriend($requestId: ID!) {
  denyFriend(requestId: $requestId) {
    _id
    targetId
    requesterId
    createdAt
  }
}
`;

export const REMOVE_FRIEND = gql`
mutation RemoveFriend($friend: String!) {
  removeFriend(friend: $friend) {
    _id
    username
    firstInitial
    lastInitial
  }
}
`;

export const CREATE_POST = gql`
mutation CreatePost($content: String!) {
  createPost(content: $content) {
    _id
    content
    creator
    creatorFirstInitial
    creatorLastInitial
    createdAt
  }
}
`;

export const DELETE_POST = gql`
mutation DeletePost($postId: ID!) {
  deletePost(postId: $postId) {
    _id
    content
    creator
    createdAt
    commentCount
    likeCount
  }
}
`;

export const CREATE_COMMENT = gql`
mutation CreateComment($postId: ID!, $content: String!) {
  createComment(postId: $postId, content: $content) {
    _id
    content
    createdAt
    postId
  }
}
`;

export const DELETE_COMMENT = gql`
mutation DeleteComment($commentId: ID!) {
  deleteComment(commentId: $commentId) {
    _id
    creator
    content
    createdAt
    postId
    likeCount
  }
}
`;

export const CREATE_CHAT = gql`
mutation CreateChat($chatName: String!, $recipients: [String]!) {
  createChat(chatName: $chatName, recipients: $recipients) {
    _id
    chatName
    recipients {
      _id
      username
      firstInitial
      lastInitial
    }
  }
}
`;

export const ADD_TO_CHAT = gql`
mutation AddToChat($chatId: String!, $recipients: [String]!) {
  addToChat(chatId: $chatId, recipients: $recipients) {
    _id
    chatName
    recipients {
      _id
      username
      firstInitial
      lastInitial
    }
  }
}
`;

export const LEAVE_CHAT = gql`
mutation LeaveChat($chatId: ID!) {
  leaveChat(chatId: $chatId) {
    _id
    chatName
  }
}
`;

export const SEND_MESSAGE = gql`
mutation SendMessage($chatId: ID!, $content: String!) {
  sendMessage(chatId: $chatId, content: $content) {
    _id
    chatId
    content
    creator
    createdAt
  }
} 
`;


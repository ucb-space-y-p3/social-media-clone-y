import { gql } from '@apollo/client';

export const GET_ME = gql`
query GetUser($username: String!) {
  getUser(username: $username) {
    token
  }
}
`;

// real
export const GET_USER = gql`
query GetUser($username: String!) {
  getUser(username: $username) {
    _id
    username
    email
  }
}
`;

export const GET_FRIENDS = gql`
query GetUser($username: String!) {
  getUser(username: $username) {
    token
  }
}
`;

export const GET_FRIEND_REQUEST = gql`
query GetUser($username: String!) {
  getUser(username: $username) {
    token
  }
}
`;

export const GET_FRIEND_REQUESTS = gql`
query GetUser($username: String!) {
  getUser(username: $username) {
    token
  }
}
`;

export const GET_POST = gql`
query GetUser($username: String!) {
  getUser(username: $username) {
    token
  }
}
`;

export const GET_POSTS = gql`
query GetUser($username: String!) {
  getUser(username: $username) {
    token
  }
}
`;

export const GET_COMMENT = gql`
query GetUser($username: String!) {
  getUser(username: $username) {
    token
  }
}
`;

export const GET_COMMENTS = gql`
query GetUser($username: String!) {
  getUser(username: $username) {
    token
  }
}
`;

export const GET_CHAT = gql`
query GetUser($username: String!) {
  getUser(username: $username) {
    token
  }
}
`;

export const GET_CHATS = gql`
query GetUser($username: String!) {
  getUser(username: $username) {
    token
  }
}
`;

export const GET_MESSAGES = gql`
query GetUser($username: String!) {
  getUser(username: $username) {
    token
  }
}
`;

export const GET_NOTIFICATIONS = gql`
query GetUser($username: String!) {
  getUser(username: $username) {
    token
  }
}
`;

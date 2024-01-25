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
mutation loginUser($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token    
  }
}
`;

export const CHANGE_PASSWORD = gql`
mutation loginUser($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token    
  }
}
`;

export const DELETE_USER = gql`
mutation loginUser($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token    
  }
}
`;

export const REQUEST_FRIEND = gql`
mutation loginUser($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token    
  }
}
`;

export const ACCEPT_FRIEND = gql`
mutation loginUser($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token    
  }
}
`;

export const DENY_FRIEND = gql`
mutation loginUser($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token    
  }
}
`;

export const REMOVE_FRIEND = gql`
mutation loginUser($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token    
  }
}
`;

export const CREATE_POST = gql`
mutation loginUser($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token    
  }
}
`;

export const DELETE_POST = gql`
mutation loginUser($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token    
  }
}
`;

export const CREATE_COMMENT = gql`
mutation loginUser($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token    
  }
}
`;

export const DELETE_COMMENT = gql`
mutation loginUser($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token    
  }
}
`;
import { gql } from '@apollo/client';

export const GET_ME = gql`
query Me {
  me {
    username
    firstInitial
    lastInitial
    posts {
      _id
      content
      createdAt
    }
    comments {
      _id
      content
      createdAt
    }
    friends {
      _id
      username
      firstInitial
      lastInitial
    }
    incomingFriendRequests {
      _id
      requesterId
      createdAt
    }
    settings {
      isDarkMode
    }
  }
}
`;

// real
export const GET_USER = gql`
query GetUser($username: String!) {
  getUser(username: $username) {
    _id
    username
    firstInitial
    lastInitial
    posts {
      _id
      content
      createdAt
    }
    comments {
      _id
      content
      createdAt
    }
    friends {
      _id
      username
      firstInitial
      lastInitial
    }
    incomingFriendRequests {
      _id
      requesterId
      createdAt
    }
    settings {
      isDarkMode
    }
  }
}
`;

export const GET_FRIEND_REQUEST = gql`
query GetFriendRequest($requestId: ID!) {
  getFriendRequest(requestId: $requestId) {
    _id
    targetId
    requesterId
    createdAt
  }
}
`;

export const GET_POST = gql`
query GetPost($postId: ID!) {
  getPost(postId: $postId) {
    _id
    creator
    content
    likeCount
    commentCount
    comments {
      _id
      creator
      content
      createdAt
      likeCount
    }
  }
}
`;

export const GET_PUBLIC_POSTS = gql`
query GetAllPosts {
  getAllPosts {
    _id
    creator
    content
    commentCount
    likeCount
    createdAt
  }
}
`;

// export const GET_CIRCLE_POSTS = gql`
// query GetUser($username: String!) {
//   getUser(username: $username) {
//     token
//   }
// }
// `;

export const GET_LIKED_POSTS = gql`
query LikedPosts {
  me {
    likedPosts {
      _id
      creator
      content
      createdAt
      commentCount
      likeCount
    }
  }
}
`;

export const GET_LIKED_COMMENTS = gql`
query LikedComments {
  me {
    likedComments {
      _id
      creator
      content
      postId
      likeCount
      createdAt
    }
  }
}
`;

export const GET_CHAT = gql`
query GetChat($chatId: ID!) {
  getChat(chatId: $chatId) {
    _id
    isGroupChat
    recipients {
      _id
      username
      firstInitial
      lastInitial
    }
    messages {
      _id
      content
      creator
      createdAt
      chatId
      postId
    }
  }
}
`;

export const GET_CHATS = gql`
query GetChats {
  me {
    activeChats {
      _id
      isGroupChat
      recipients {
        _id
        username
      }
    }
  }
}
`;

export const GET_NOTIFICATIONS = gql`
query Notifications {
  me {
    notifications {
      _id
      type
      alert
      isCleared
      createdAt
    }
  }
}
`;

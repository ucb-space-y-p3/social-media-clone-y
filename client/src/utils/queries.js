import { gql } from '@apollo/client';

export const GET_ME = gql`
query Me {
  me {
    _id
    username
    firstInitial
    lastInitial
    email
    posts {
      _id
      creatorId
      creatorFirstInitial
      creatorLastInitial
      creator
      content
      commentCount
      likeCount
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
    postCount
    friendCount
    posts {
      _id
      content
      createdAt
    }
    comments {
      _id
      creator
      creatorFirstInitial
      creatorLastInitial
      content
      createdAt
      likeCount
    }
    friends {
      _id
      username
      firstInitial
      lastInitial
    }
    incomingFriendRequests {
      _id
      requesterName
      requesterId
      createdAt
    }
    outgoingFriendRequests {
      _id
      targetName
      targetId
      createdAt
    }
    settings {
      isDarkMode
    }
  }
}
`;

// export const GET_FRIEND = gql`
// query GetFriend($username: String!) {
//   getFriend(username: $username) {
//     username
//     firstInitial
//     lastInitial
//     posts {
//       _id
//       content
//       createdAt
//     }
//     friends {
//       _id
//       username
//       firstInitial
//       lastInitial
//     }
//   }
// }
// `;

export const GET_FRIEND_REQUEST = gql`
query GetFriendRequest($requestId: ID!) {
  getFriendRequest(requestId: $requestId) {
    _id
    targetName
    targetId
    requesterName
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
    creatorId
    creatorFirstInitial
    creatorLastInitial
    content
    likeCount
    commentCount
    comments {
      _id
      creator
      creatorId
      creatorFirstInitial
      creatorLastInitial
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
    creatorId
    creatorFirstInitial
    creatorLastInitial
    content
    commentCount
    likeCount
    createdAt
  }
}
`;

export const GET_CIRCLE_POSTS = gql`
query GetCirclePosts {
  getCirclePosts {
    _id
    creatorId
    creator
    creatorFirstInitial
    creatorLastInitial
    content
    commentCount
    likeCount
    createdAt
  }
}
`;

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
      creatorFirstInitial
      creatorLastInitial
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
    chatName
    userCount
    messageCount
    recipients {
      _id
      username
    }
    messages {
      _id
      creatorId
      creator
      content
      createdAt
    }
  }
}
`;

export const GET_CHATS = gql`
query GetChats {
  me {
    activeChats {
      _id
      chatName
      userCount
      messageCount
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

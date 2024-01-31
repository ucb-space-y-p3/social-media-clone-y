import { gql } from '@apollo/client';

export const POST_SUBSCRIPTION = gql`
subscription PostFeed($userId: ID!) {
    postCreated(userId: $userId) {
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
}
`;

export const COMMENT_SUBSCRIPTION = gql`
subscription CommentFeed($postId: ID!) {
    commentCreated(postId: $postId) {
        _id: ID
        postId: ID
        creatorId: ID
        creator: String
        creatorFirstInitial: String
        creatorLastInitial: String
        createdAt: String
        content: String
    }
}
`;

export const MESSAGE_SUBSCRIPTION = gql`
subscription MessageFeed($chatId: ID!) {
    messageCreated(chatId: $chatId) {
        _id
        creatorId
        creator
        content
        createdAt
    }
}
`;

export const REQUEST_SUBSCRIPTION = gql`
subscription RequestFeed($userId: ID!) {
    requestCreated(userId: $userId) {
        _id
        targetName
        targetId
        requesterName
        requesterId
        createdAt
    }
}
`;
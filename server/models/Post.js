const { Schema, model, Types } = require('mongoose');
const { DateTime } = require('luxon');
const { Comment: commentSchema } = require('./index.js');

// const commentSchema = new Schema(
//   {
//     postId: {
//       type: String,
//       required: true,
//     },
//     // commentId: {
//     //   type: Schema.Types.ObjectId,
//     //   default: () => new Types.ObjectId()
//     // },
//     creator: {
//       type: String,
//       required: true
//     },
//     content: {
//       type: String,
//       required: true,
//       minLength: 1,
//       maxLength: 120,
//     },
//     createdAt: {
//       type: Date,
//       default: DateTime.now,
//       get: function (value) {
//         // ISO 8601 format (UTC)
//         return DateTime.fromJSDate(value).toFormat('yyyy-MM-dd\'T\'HH:mm:ss.SSS\'Z\'');
//       }
//     },
//   },
//   {
//     toJSON: {
//       virtuals: true,
//     },
//   }
// );

const postSchema = new Schema(
  {

    creator: {
      type: String,
      required: true
    },
    creatorId: {
      type: String,
      required: true,
    },
    creatorFirstInitial: {
      type: String,
      required: true
    },
    creatorLastInitial: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: DateTime.now,
      get: function (value) {
        // ISO 8601 format (UTC)
        return DateTime.fromJSDate(value).toFormat('yyyy-MM-dd\'T\'HH:mm:ss.SSS\'Z\'');
      }
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'comment',
      },
    ],
    likedBy: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    ]
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

postSchema.virtual('commentCount').get(function () {
  return this.comments.length;
})

postSchema.virtual('likeCount').get(function () {
  return this.likedBy.length;
})

const Post = model('post', postSchema);

module.exports = Post;

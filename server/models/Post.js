const { Schema, model } = require('mongoose');
const { DateTime } = require('luxon');

const postSchema = new Schema(
  {

    creator: {
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
        ref: 'comment'
      }
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

const Post = model('post', postSchema);

module.exports = Post;

const { Schema, model } = require('mongoose');
const { DateTime } = require('luxon');

const commentSchema = new Schema(
  {
    postId: {
      type: String,
      required: true,
    },
    creator: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 120,
    },
    createdAt: {
      type: Date,
      default: DateTime.now(),
      get: function (value) {
        // ISO 8601 format (UTC)
        return DateTime.fromJSDate(value).toFormat('yyyy-MM-dd\'T\'HH:mm:ss.SSS\'Z\'');
      }
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);


const Comment = model('comment', commentSchema);

module.exports = Comment;

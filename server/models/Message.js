const { Schema, model } = require('mongoose');
const { DateTime } = require('luxon');

const messageSchema = new Schema(
  {
    chatId: {
      type: String,
      required: true
    },
    postId: String,
    commentId: String,
    content: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 120,
    },
    creatorId: {
      type: String,
      required: true
    },
    creator: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: DateTime.now,
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


const Message = model('message', messageSchema);

module.exports = Message;

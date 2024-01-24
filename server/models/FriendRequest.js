const { Schema, model } = require('mongoose');
const { DateTime } = require('luxon');

const requestSchema = new Schema(
  {
    requesterId: {
      type: String,
      required: true,
    },
    targetId: {
      type: String,
      required: true,
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


const FriendRequest = model('request', requestSchema);

module.exports = FriendRequest;

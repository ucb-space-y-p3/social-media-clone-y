const { Schema, model } = require('mongoose');
const { DateTime } = require('luxon');

const notificationSchema = new Schema(
  {
    isCleared: {
      type: Boolean,
      required: true,
      default: false
    },
    isSystem: {
      type: Boolean,
      required: true,
    },
    type: {
      type: String,
      required: true
    },
    alert: {
      type: String,
      minLength: 1,
      maxLength: 32,
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

  }
);


const Notification = model('notification', notificationSchema);

module.exports = Notification;

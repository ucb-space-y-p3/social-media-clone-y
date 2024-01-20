const { Schema, model } = require('mongoose');

const notificationSchema = new Schema(
  {

  },
  {

  }
);


const Notification = model('notification', notificationSchema);

module.exports = Notification;

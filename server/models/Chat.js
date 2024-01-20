const { Schema, model } = require('mongoose');

const chatSchema = new Schema(
  {

  },
  {

  }
);


const Chat = model('chat', chatSchema);

module.exports = Chat;

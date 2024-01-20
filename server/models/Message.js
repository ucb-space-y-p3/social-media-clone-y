const { Schema, model } = require('mongoose');

const messageSchema = new Schema(
  {

  },
  {

  }
);


const Message = model('message', messageSchema);

module.exports = Message;

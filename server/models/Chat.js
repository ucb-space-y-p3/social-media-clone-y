const { Schema, model } = require('mongoose');

const chatSchema = new Schema(
  {
    isGroupChat: {
      type: Boolean,
      required: true
    },
    recipients: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: 'message',
      },
    ]
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);


const Chat = model('chat', chatSchema);

module.exports = Chat;

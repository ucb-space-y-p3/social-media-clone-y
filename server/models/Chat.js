const { Schema, model } = require('mongoose');

const chatSchema = new Schema(
  {
    chatName: {
      type: String,
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

chatSchema.virtual('messageCount').get(function () {
  return this.messages.length;
})

chatSchema.virtual('userCount').get(function () {
  return this.recipients.length;
})

const Chat = model('chat', chatSchema);

module.exports = Chat;

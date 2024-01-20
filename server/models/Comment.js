const { Schema, model } = require('mongoose');

const commentSchema = new Schema(
  {

  },
  {

  }
);


const Comment = model('comment', commentSchema);

module.exports = Comment;

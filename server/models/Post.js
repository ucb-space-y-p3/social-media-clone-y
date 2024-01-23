const { Schema, model } = require('mongoose');

const postSchema = new Schema(
  {

    //
  },
  {

  }
);


const Post = model('post', postSchema);

module.exports = Post;

const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const settingsSchema = require('./Settings');

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      minLength: 4,
      maxLength: 16,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'post',
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'comment',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
    activeChats: [
      {
        type: Schema.Types.ObjectId,
        ref: 'chat',
      },
    ],
    notifications: [
      {
        type: Schema.Types.ObjectId,
        ref: 'notification',
      },
    ],
    friendRequests: [
      {
        type: Schema.Types.ObjectId,
        ref: 'request',
      },
    ],
    settings: settingsSchema,

  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// hash user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// when we query a user, we'll also get another field called `bookCount` with the number of saved books we have
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

userSchema.virtual('postCount').get(function () {
  return this.posts.length;
})

userSchema.virtual('commentCount').get(function () {
  return this.comments.length;
})

userSchema.virtual('chatCount').get(function () {
  return this.activeChats.length;
})

userSchema.virtual('notificationCount').get(function () {
  return this.notifications.length;
})

userSchema.virtual('requestCount').get(function () {
  return this.friendRequests.length;
})

const User = model('user', userSchema);

module.exports = User;

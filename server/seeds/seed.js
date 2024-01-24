const db = require('../config/connection');
const { User, Post, Chat, Message, Notification } = require('../models');
const cleanDB = require('./cleanDB');

db.once('open', async () => {

  await cleanDB(db);

  const users = await User.create([
    { username: 'tester0', email: 'tester0@example.com', password: 'password' },
    { username: 'tester1', email: 'tester1@example.com', password: 'password' },
  ]);
  console.log('Users seeded.');

  // const posts = await Post.create([
  //   { content: 'Content for Post 1', creator: users[0]._id },
  //   { content: 'Content for Post 2', creator: users[1]._id },
  // ]);
  // console.log('Posts seeded.');

  await db.close();
  process.exit(0);
});

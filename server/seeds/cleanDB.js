// const models = require('../models');
const db = require('../config/connection');

// module.exports = async (modelName, collectionName) => {
//   try {
//     let modelExists = await models[modelName].db.db.listCollections({
//       name: collectionName
//     }).toArray()

//     if (modelExists.length) {
//       await db.dropCollection(collectionName);
//     }
//   } catch (err) {
//     throw err;
//   }
// }

module.exports = async () => {
  try {
    // Get all collection names
    const collections = await db.db.collections();

    // Iterate through collections and delete all documents
    for (const collection of collections) {
      await collection.deleteMany({});
      console.log(`Cleared collection: ${collection.collectionName}`);
    }

    console.log('Database cleared successfully.');
  } catch (error) {
    console.error('Error clearing the database:', error);
  } finally {
    // Close the connection
    await db.close();
  }
};

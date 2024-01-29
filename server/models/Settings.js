const { Schema } = require('mongoose');

const settingsSchema = new Schema(
  {
    isDarkMode: {
      type: Boolean,
      required: true,
      default: false,
    }
  },
  {

  }
);

module.exports = settingsSchema;

const { Schema } = require('mongoose');

const settingsSchema = new Schema(
  {
    isSilentMode: {
      type: Boolean,
      required: true,
      default: false,
    }
  },
  {

  }
);

module.exports = settingsSchema;

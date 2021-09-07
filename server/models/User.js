const { Schema, model } = require('mongoose');

const User = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  lastName: {
    type: String,
  },
  avatar: {
    type: String,
  },
});

module.exports = model('User', User);

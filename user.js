const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: String,
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: String,
  created_at: Date,
  updated_at: Date,
})

module.exports = mongoose.model('users', userSchema)

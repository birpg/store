const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 用户信息模型
const UserSchema = new Schema({
  coding: {
    type: Number,
    default: 1001,
  },
  name: String,
  gender: String,
  password: String,
  identity: String,
  department: String,
  position: String,
  tel: Number,
  phone: Number,
  email: String,
  idCard: String,
  address: String,
  remarks: String,
  status: {
    type: String,
    default: 'enable',
  },
  logins: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

module.exports = User = mongoose.model('users', UserSchema)

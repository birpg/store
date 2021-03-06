const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 商品入库信息模型
const StorageSchema = new Schema({
  numbering: String,
  audit: String,
  store: String,
  type: String,
  personnel: String,
  remarks: String,
  table: [
    {
      coding: Number,
      name: String,
      unit: String,
      number: Number,
      remarks: String,
    },
  ],
  total: String,
  ordrMakingStf: String,
  auditors: String,
  date: {
    type: Date,
    default: Date.now,
  },
})

module.exports = Storage = mongoose.model('storage', StorageSchema)

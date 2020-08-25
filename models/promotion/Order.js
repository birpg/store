const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrderSchema = new Schema({
  coding: String,
  store: String,
  promDt: [],
  promTm: [],
  cycle: [],
  full: [],
  discount: [],
  handsel: [],
  personnel: String,
  remarks: String,
  audit: String,
  table: [
    {
      coding: String,
      name: String,
      unit: String,
    },
  ],
  ordrMakingStf: String,
  auditors: String,
  auditDate: Date,
  date: {
    type: Date,
    default: Date.now,
  },
})

module.exports = Order = mongoose.model('order', OrderSchema)

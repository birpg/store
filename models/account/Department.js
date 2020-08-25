const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 部门模型
const DepartmentSchema = new Schema({
  coding: String,
  name: String,
  date: {
    type: Date,
    default: Date.now,
  },
})

module.exports = Department = mongoose.model('departments', DepartmentSchema)

const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 供应商模型
const SupplierSchema = new Schema({
    supplierName: String,
    coding: Number,
    address: String,
    account: String,
    bank: String,
    bankAccount: Number,
    name: String,
    gender: String,
    position: String,
    tel: Number,
    email: String,
    remarks: String,
    status: String,
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Supplier = mongoose.model('supplier', SupplierSchema)
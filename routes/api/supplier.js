const express = require('express')
const router = express.Router()
const passport = require('passport')

const Supplier = require('../../models/purchase/Supplier')

/**
 * $route POST api/supplier/add
 * @desc 新增供应商信息接口
 * @access private
 */
router.post('/add', passport.authenticate('jwt', { session: false }), (req, res) => {
    const supplierFields = {}

    if (req.body.supplierName) supplierFields.supplierName = req.body.supplierName
    if (req.body.coding) supplierFields.coding = req.body.coding
    if (req.body.address) supplierFields.address = req.body.address
    if (req.body.account) supplierFields.account = req.body.account
    if (req.body.bank) supplierFields.bank = req.body.bank
    if (req.body.bankAccount) supplierFields.bankAccount = req.body.bankAccount
    if (req.body.name) supplierFields.name = req.body.name
    if (req.body.gender) supplierFields.gender = req.body.gender
    if (req.body.position) supplierFields.position = req.body.position
    if (req.body.tel) supplierFields.tel = req.body.tel
    if (req.body.email) supplierFields.email = req.body.email
    if (req.body.remarks) supplierFields.remarks = req.body.remarks
    if (req.body.status) supplierFields.status = req.body.status

    new Supplier(supplierFields).save().then(supplier => {
        res.json(supplier)
    })
})

/**
 * $route GET api/supplier
 * @desc 获取所有供应商信息
 * @access private
 */
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    Supplier.find()
        .then(supplier => {
            if (!supplier) {
                return res.status(404).json('没有任何内容')
            }
            res.json(supplier)
        })
        .catch(err => res.status(404).json(err))
})

/**
 * $route GET api/supplier/:id
 * @desc 获取单个供应商信息
 * @access private
 */
router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Supplier.findOne({ _id: req.params.id })
        .then(supplier => {
            if (!supplier) {
                return res.status(404).json('没有任何内容')
            }
            res.json(supplier)
        })
        .catch(err => res.status(404).json(err))
})

/**
 * $route POST api/supplier/edit/:id
 * @desc 编辑供应商信息接口
 * @access private
 */
router.post('/edit/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const supplierFields = {}

    if (req.body.supplierName) supplierFields.supplierName = req.body.supplierName
    if (req.body.coding) supplierFields.coding = req.body.coding
    if (req.body.address) supplierFields.address = req.body.address
    if (req.body.account) supplierFields.account = req.body.account
    if (req.body.bank) supplierFields.bank = req.body.bank
    if (req.body.bankAccount) supplierFields.bankAccount = req.body.bankAccount
    if (req.body.name) supplierFields.name = req.body.name
    if (req.body.gender) supplierFields.gender = req.body.gender
    if (req.body.position) supplierFields.position = req.body.position
    if (req.body.tel) supplierFields.tel = req.body.tel
    if (req.body.email) supplierFields.email = req.body.email
    if (req.body.remarks) supplierFields.remarks = req.body.remarks
    if (req.body.status) supplierFields.status = req.body.status

    Supplier.findOneAndUpdate(
        { _id: req.params.id },
        { $set: supplierFields },
        { new: true }
    ).then(supplier => res.json(supplier))
})

/**
 * $route DELETE api/supplier/delete/:id
 * @desc 删除供应商信息接口
 * @access private
 */
router.delete('/delete/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Supplier.findOneAndRemove({ _id: req.params.id })
        .then(supplier => res.json(supplier))
        .catch(err => res.status(404).json('删除失败!'))
})


module.exports = router
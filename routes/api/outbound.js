const express = require('express')
const router = express.Router()
const passport = require('passport')

const OutBound = require('../../models/inventory/OutBound')

/**
 * $route POST api/outbound/add
 * @desc 新增出库信息接口
 * @access private
 */
router.post('/add', passport.authenticate('jwt', { session: false }), (req, res) => {
    const outboundFields = {}

    if (req.body.numbering) outboundFields.numbering = req.body.numbering
    if (req.body.audit) outboundFields.audit = req.body.audit
    if (req.body.store) outboundFields.store = req.body.store
    if (req.body.type) outboundFields.type = req.body.type
    if (req.body.personnel) outboundFields.personnel = req.body.personnel
    if (req.body.remarks) outboundFields.remarks = req.body.remarks
    if (req.body.table) outboundFields.table = req.body.table
    if (req.body.total) outboundFields.total = req.body.total
    if (req.body.ordrMakingStf) outboundFields.ordrMakingStf = req.body.ordrMakingStf
    if (req.body.auditors) outboundFields.auditors = req.body.auditors
    if (req.body.date) outboundFields.date = req.body.date


    new OutBound(outboundFields).save().then(outbound => {
        res.json(outbound)
    })
})

/**
 * $route GET api/outbound
 * @desc 获取所有出库信息
 * @access private
 */
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    OutBound.find()
        .then(outbound => {
            if (!outbound) {
                return res.status(404).json('没有任何内容')
            }
            res.json(outbound)
        })
        .catch(err => res.status(404).json(err))
})

/**
 * $route GET api/outbound/:id
 * @desc 获取单个出库信息
 * @access private
 */
router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    OutBound.findOne({ _id: req.params.id })
        .then(outbound => {
            if (!outbound) {
                return res.status(404).json('没有任何内容')
            }
            res.json(outbound)
        })
        .catch(err => res.status(404).json(err))
})

/**
 * $route POST api/outbound/edit/:id
 * @desc 编辑出库信息接口
 * @access private
 */
router.post('/edit/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const outboundFields = {}

    if (req.body.numbering) outboundFields.numbering = req.body.numbering
    if (req.body.audit) outboundFields.audit = req.body.audit
    if (req.body.store) outboundFields.store = req.body.store
    if (req.body.type) outboundFields.type = req.body.type
    if (req.body.personnel) outboundFields.personnel = req.body.personnel
    if (req.body.remarks) outboundFields.remarks = req.body.remarks
    if (req.body.table) outboundFields.table = req.body.table
    if (req.body.total) outboundFields.total = req.body.total
    if (req.body.ordrMakingStf) outboundFields.ordrMakingStf = req.body.ordrMakingStf
    if (req.body.auditors) outboundFields.auditors = req.body.auditors
    if (req.body.date) outboundFields.date = req.body.date

    OutBound.findOneAndUpdate(
        { _id: req.params.id },
        { $set: outboundFields },
        { new: true }
    ).then(outbound => res.json(outbound))
})

/**
 * $route DELETE api/outbound/delete/:id
 * @desc 删除出库信息接口
 * @access private
 */
router.delete('/delete/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    OutBound.findOneAndRemove({ _id: req.params.id })
        .then(outbound => res.json(outbound))
        .catch(err => res.status(404).json('删除失败!'))
})

module.exports = router
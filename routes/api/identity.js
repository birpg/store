const express = require('express')
const router = express.Router()
const passport = require('passport')

const Identity = require('../../models/account/Identity')

/**
 * $route POST api/identity/add
 * @desc 新增身份信息接口
 * @access private
 */
router.post('/add', passport.authenticate('jwt', { session: false }), (req, res) => {
    const role = req.user.identity
    if (role == '老板' || role == '系统管理员' || role == '店长') {
        const identityFields = {}

        if (req.body.coding) identityFields.coding = req.body.coding
        if (req.body.name) identityFields.name = req.body.name

        new Identity(identityFields).save().then(identity => {
            res.json(identity)
        })
    } else {
        res.status(404).json('没有权限!')
    }
})

/**
 * $route GET api/identity
 * @desc 获取所有身份信息
 * @access private
 */
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    Identity.find()
        .then(identity => {
            if (!identity) {
                return res.status(404).json('没有任何内容')
            }
            res.json(identity)
        })
        .catch(err => res.status(404).json(err))
})

/**
 * $route POST api/identity/edit/:id
 * @desc 编辑身份信息接口
 * @access private
 */
router.post('/edit/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const role = req.user.identity
    if (role == '老板' || role == '系统管理员' || role == '店长') {
        const identityFields = {}

        if (req.body.coding) identityFields.coding = req.body.coding
        if (req.body.name) identityFields.name = req.body.name

        Identity.findOneAndUpdate(
            { _id: req.params.id },
            { $set: identityFields },
            { new: true }
        ).then(identity => res.json(identity))
    } else {
        res.status(404).json('没有权限!')
    }
})

/**
 * $route DELETE api/identity/delete/:id
 * @desc 删除身份信息接口
 * @access private
 */
router.delete('/delete/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const role = req.user.identity
    if (role == '老板' || role == '系统管理员' || role == '店长') {
        Identity.findOneAndRemove({ _id: req.params.id })
            .then(identity => res.json(identity))
            .catch(err => res.status(404).json('删除失败!'))
    } else {
        res.status(404).json('没有权限!')
    }
})

module.exports = router
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const passport = require('passport')

const User = require('../../models/Users')
const keys = require('../../config/keys')

/**
 * $route POST api/users/register
 * @desc 返回的请求的json数据 注册
 * @access private
 */
router.post('/register', (req, res) => {
    User.findOne({ name: req.body.name })
        .then((user) => {
            if (user) {
                return res.status(400).json('用户名已存在!')
            } else {
                const newUser = new User({
                    name: req.body.name,
                    password: req.body.password,
                    identity: req.body.identity
                })
                bcrypt.genSalt(10, (err, salt) => {
                    if (err) throw err
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err
                        newUser.password = hash
                        newUser
                            .save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err))
                    })
                })
            }
        })
})

/**
 * $route POST api/users/login
 * @desc 返回token jwt-password 登录
 * @access private
 */
router.post('/login', (req, res) => {
    const name = req.body.name
    const password = req.body.password

    // 查询数据库
    User.findOne({ name })
        .then(user => {
            if (!user) {
                return res.status(404).json('用户不存在!')
            } else if (user.status == 'disable') {
                return res.status(404).json('该账号已被禁用!')
            }
            // 密码匹配
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        // 自定义规则
                        const rule = {
                            id: user.id,
                            name: user.name,
                            identity: user.identity
                        }
                        // jwt实现token
                        jwt.sign(rule, keys.secretOrKey, { expiresIn: 36000 }, (err, token) => {
                            if (err) throw err
                            res.json({
                                success: true,
                                token: 'Bearer ' + token
                            })
                        })
                        user.logins++
                        user.save()
                            .catch(err => console.log(err))
                    } else {
                        return res.status(400).json('密码错误!')
                    }
                })
        })
})

/**
 * $route GET api/users/current
 * @desc 获取当前用户信息
 * @access public
 */
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
        id: req.user.id,
        coding: req.user.coding,
        name: req.user.name,
        gender: req.user.gender,
        password: req.user.password,
        identity: req.user.identity,
        department: req.user.department,
        position: req.user.position,
        tel: req.user.tel,
        phone: req.user.phone,
        email: req.user.email,
        idCard: req.user.idCard,
        address: req.user.address,
        remarks: req.user.remarks,
        status: req.user.status,
    })
})

/**
 * $route POST api/users/current/edit/:id
 * @desc 编辑当前用户信息
 * @access private
 */
router.post('/current/edit/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const userFields = {}

    if (req.body.coding) userFields.coding = req.body.coding
    if (req.body.name) userFields.name = req.body.name
    if (req.body.gender) userFields.gender = req.body.gender
    if (req.body.identity) userFields.identity = req.body.identity
    if (req.body.department) userFields.department = req.body.department
    if (req.body.position) userFields.position = req.body.position
    if (req.body.tel) userFields.tel = req.body.tel
    if (req.body.phone) userFields.phone = req.body.phone
    if (req.body.email) userFields.email = req.body.email
    if (req.body.idCard) userFields.idCard = req.body.idCard
    if (req.body.address) userFields.address = req.body.address
    if (req.body.remarks) userFields.remarks = req.body.remarks
    if (req.body.status) userFields.status = req.body.status

    User.findOneAndUpdate(
        { _id: req.params.id },
        { $set: userFields },
        { new: true }
    ).then(user => res.json(user))
})

/**
 * $route GET api/users/updatePwd
 * @desc 修改密码
 * @access public
 */
router.post('/updatePwd', passport.authenticate('jwt', { session: false }), (req, res) => {
    const password = req.body.password
    const newPassword = req.body.pass

    // 密码匹配
    bcrypt.compare(password, req.user.password)
        .then(isMatch => {
            if (isMatch) {
                bcrypt.genSalt(10, (err, salt) => {
                    if (err) throw err
                    bcrypt.hash(newPassword, salt, (err, hash) => {
                        if (err) throw err
                        req.user.password = hash
                        req.user.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err))
                    })
                })

            } else {
                return res.status(400).json('密码错误!')
            }
        })
})

/**
 * $route POST api/user/employee/add
 * @desc 新增用户信息
 * @access private
 */
router.post('/employee/add', passport.authenticate('jwt', { session: false }), (req, res) => {
    const role = req.user.identity
    if (role == '老板' || role == '系统管理员' || role == '店长') {

        User.findOne({ name: req.body.name })
            .then((user) => {
                if (user) {
                    return res.status(400).json('用户名已存在!')
                } else {
                    const newUser = new User({
                        coding: req.body.coding,
                        name: req.body.name,
                        password: req.body.password,
                        identity: req.body.identity,
                        department: req.body.department,
                        position: req.body.position,
                        tel: req.body.tel,
                        phone: req.body.phone,
                        email: req.body.email,
                        gender: req.body.gender,
                        idCard: req.body.idCard,
                        address: req.body.address,
                        remarks: req.body.remarks,
                        status: req.body.status
                    })
                    bcrypt.genSalt(10, (err, salt) => {
                        if (err) throw err
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err
                            newUser.password = hash
                            newUser
                                .save()
                                .then(user => res.json(user))
                                .catch(err => console.log(err))
                        })
                    })
                }
            })
    } else {
        res.status(404).json('没有权限!')
    }
})

/**
 * $route GET api/users/employees
 * @desc 获取所有用户信息
 * @access public
 */
router.get('/employees', passport.authenticate('jwt', { session: false }), (req, res) => {
    User.find().then(user => {
        if (!user) {
            return res.status(404).json('未查到用户列表')
        }
        res.json(user)
    })
        .catch(err => res.status(404).json(err))
})

/**
 * $route POST api/users/employee/edit/:id
 * @desc 编辑单个用户信息
 * @access private
 */
router.post('/employee/edit/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const role = req.user.identity

    if (role == '老板' || role == '系统管理员' || role == '店长') {
        const userFields = {}

        if (req.body.coding) userFields.coding = req.body.coding
        if (req.body.name) userFields.name = req.body.name
        if (req.body.gender) userFields.gender = req.body.gender
        if (req.body.identity) userFields.identity = req.body.identity
        if (req.body.department) userFields.department = req.body.department
        if (req.body.position) userFields.position = req.body.position
        if (req.body.tel) userFields.tel = req.body.tel
        if (req.body.phone) userFields.phone = req.body.phone
        if (req.body.email) userFields.email = req.body.email
        if (req.body.idCard) userFields.idCard = req.body.idCard
        if (req.body.address) userFields.address = req.body.address
        if (req.body.remarks) userFields.remarks = req.body.remarks
        if (req.body.status) userFields.status = req.body.status

        User.findOneAndUpdate(
            { _id: req.params.id },
            { $set: userFields },
            { new: true }
        ).then(user => res.json(user))
    } else {
        res.status(404).json('没有权限!')
    }
})


/**
 * $route DELETE api/users/employee/delete/:id
 * @desc 删除单个用户
 * @access private
 */
router.delete('/employee/delete/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const role = req.user.identity

    if (role == '老板' || role == '系统管理员' || role == '店长') {
        User.findOneAndDelete({ _id: req.params.id })
            .then(user => res.json(user))
            .catch(err => res.status(404).json('删除失败!'))
    } else {
        res.status(404).json('没有权限!')
    }
})

module.exports = router
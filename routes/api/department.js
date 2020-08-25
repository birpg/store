const express = require('express')
const router = express.Router()
const passport = require('passport')

const Department = require('../../models/account/Department')

/**
 * $route POST api/department/add
 * @desc 新增部门信息接口
 * @access private
 */

router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const role = req.user.identity
    if (role == '老板' || role == '系统管理员' || role == '店长') {
      const departmentFields = {}

      if (req.body.coding) departmentFields.coding = req.body.coding
      if (req.body.name) departmentFields.name = req.body.name

      new Department(departmentFields).save().then(department => {
        res.json(department)
      })
    } else {
      res.status(404).json('没有权限!')
    }
  }
)

/**
 * $route GET api/department
 * @desc 获取所有部门信息
 * @access private
 */
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Department.find()
      .then(department => {
        if (!department) {
          return res.status(404).json('没有任何内容')
        }
        res.json(department)
      })
      .catch(err => res.status(404).json(err))
  }
)

/**
 * $route POST api/department/edit/:id
 * @desc 编辑部门信息接口
 * @access private
 */
router.post(
  '/edit/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const role = req.user.identity
    if (role == '老板' || role == '系统管理员' || role == '店长') {
      const departmentFields = {}

      if (req.body.coding) departmentFields.coding = req.body.coding
      if (req.body.name) departmentFields.name = req.body.name

      Department.findOneAndUpdate(
        { _id: req.params.id },
        { $set: departmentFields },
        { new: true }
      ).then(department => res.json(department))
    } else {
      res.status(404).json('没有权限!')
    }
  }
)

/**
 * $route DELETE api/department/delete/:id
 * @desc 删除部门信息接口
 * @access private
 */
router.delete(
  '/delete/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const role = req.user.identity
    if (role == '老板' || role == '系统管理员' || role == '店长') {
      Department.findOneAndRemove({ _id: req.params.id })
        .then(department => res.json(department))
        .catch(err => res.status(404).json('删除失败!'))
    } else {
      res.status(404).json('没有权限!')
    }
  }
)

module.exports = router

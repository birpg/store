const express = require('express')
const router = express.Router()
const passport = require('passport')

const Unit = require('../../models/commodity/Unit')

/**
 * $route POST api/unit/add
 * @desc 新增单位信息接口
 * @access private
 */
router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const unitFields = {}

    if (req.body.coding) unitFields.coding = req.body.coding
    if (req.body.name) unitFields.name = req.body.name

    new Unit(unitFields).save().then((unit) => {
      res.json(unit)
    })
  }
)

/**
 * $route GET api/unit
 * @desc 获取所有单位信息
 * @access private
 */
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Unit.find()
      .then((unit) => {
        if (!unit) {
          return res.status(404).json('没有任何内容')
        }
        res.json(unit)
      })
      .catch((err) => res.status(404).json(err))
  }
)

/**
 * $route GET api/unit/:id
 * @desc 获取单个单位信息
 * @access private
 */
router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Unit.find({ _id: req.params.id })
      .then((unit) => {
        if (!unit) {
          return res.status(404).json('没有任何内容')
        }
        res.json(unit)
      })
      .catch((err) => res.status(404).json(err))
  }
)

/**
 * $route POST api/unit/edit/:id
 * @desc 编辑单位信息接口
 * @access private
 */
router.post(
  '/edit/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const unitFields = {}

    if (req.body.coding) unitFields.coding = req.body.coding
    if (req.body.name) unitFields.name = req.body.name

    Unit.findOneAndUpdate(
      { _id: req.params.id },
      { $set: unitFields },
      { new: true }
    ).then((unit) => res.json(unit))
  }
)

/**
 * $route DELETE api/unit/delete/:id
 * @desc 删除单位信息接口
 * @access private
 */
router.delete(
  '/delete/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Unit.findOneAndRemove({ _id: req.params.id })
      .then((unit) => res.json(unit))
      .catch((err) => res.status(404).json('删除失败!'))
  }
)

module.exports = router

# 前言

本项目是基于 element-ui 构建的超市管理系统,涉及注册、登录、用户信息、权限管理等等页面, 前端项目在`client`文件夹里, 其余文件皆为后端

## 技术栈

node.js + express + mongoose + vue 全家桶 + ES6 + sass + axios + element-ui

## 项目运行

> 下载项目到本地: `git clone git@github.com:birpg/store.git`
>
> 下载依赖项: store 目录下运行 `npm install`, 安装完成后再次运行 `cd client` 和 `npm install`安装依赖
>
> 运行: 在 store 目录下 `npm run dev` 即可启动前后端
> 访问: http://localhost:8080/

## 效果演示

[点击预览](https://store-vue.herokuapp.com/login)

## 项目布局

```
store
├── client                                前端文件
│   ├── public                              静态资源目录
│   │   ├── css
│   │   │   └── reset.css                       初始化css
│   │   ├── favicon.ico                         标签图标
│   │   └── index.html                          首页入口文件
│   ├── src                                 开发目录
│   │   ├── assets                            图片和公共scss文件
│   │   │   ├── 404.gif                             404动图
│   │   │   ├── bg.png                              注册登录背景图片
│   │   │   ├── global.scss                         公用颜色
│   │   │   ├── login.scss                          登录注册公共css
│   │   │   └── resetMessage.js                     封装Message
│   │   ├── components                        公共组件目录
│   │   │   ├── account                         账号
│   │   │   │   ├── AddAccount.vue                新增员工账号
│   │   │   │   ├── DialogDepartment.vue          新增部门
│   │   │   │   └── DialogIdentity.vue            新增身份
│   │   │   ├── commodity                       商品
│   │   │   │   ├── AddFile.vue                   新增商品档案
│   │   │   │   ├── DialogBrand.vue               新增商品品牌
│   │   │   │   ├── DialogCate.vue                新增商品类别
│   │   │   │   └── DialogUnit.vue                新增商品单位
│   │   │   ├── inventory                       库存
│   │   │   │   ├── AddOutBound.vue               新增出库单
│   │   │   │   └── AddStorage.vue                新增入库单
│   │   │   ├── promotion                       促销
│   │   │   │   └── AddOrder.vue                  新增促销
│   │   │   ├── purchase                        采购
│   │   │   │   ├── AddPurchase.vue               新增采购单
│   │   │   │   └── AddSupplier.vue               新增供货商
│   │   │   ├── DialogTable.vue                 公共对话框表格
│   │   │   ├── HeadNav.vue                     头部组件
│   │   │   ├── LeftMenu.vue                    左侧菜单组件
│   │   │   ├── Pagination.vue                  公共分页组件
│   │   │   └── Search.vue                      公共搜索组件
│   │   ├── plugins                           插件目录
│   │   │   └── element.js                      element按需引入模块
│   │   ├── router                            前端路由
│   │   │   └── index.js
│   │   ├── store                             Vuex
│   │   │   └── index.js
│   │   ├── views                             页面组件目录
│   │   │   ├── account                           账号
│   │   │   │   ├── Account.vue                     员工账号
│   │   │   │   ├── ChangePwd.vue                   修改密码
│   │   │   │   ├── Department.vue                  部门设置
│   │   │   │   ├── Identity.vue                    身份管理
│   │   │   │   └── Personal.vue                    个人信息
│   │   │   ├── commodity                         商品
│   │   │   │   ├── Brand.vue                       商品品牌
│   │   │   │   ├── Category.vue                    商品类别
│   │   │   │   ├── File.vue                        商品档案
│   │   │   │   └── Unit.vue                        商品单位
│   │   │   ├── inventory                         库存
│   │   │   │   ├── OutBound.vue                    商品出库
│   │   │   │   └── Storage.vue                     商品入库
│   │   │   ├── promotion                         促销
│   │   │   │   └── Order.vue                       订单促销
│   │   │   ├── purchase                          采购
│   │   │   │   ├── Purchase.vue                    采购单
│   │   │   │   └── Supplier.vue                    供货商信息
│   │   │   ├── 404.vue                         404页面
│   │   │   ├── Home.vue                        首页
│   │   │   ├── Index.vue                       main容器
│   │   │   ├── Login.vue                       登录页面
│   │   │   └── Register.vue                    注册页面
│   │   ├── App.vue                           根组件
│   │   ├── axios.js                          封装axios
│   │   └── main.js                           入口文件
│   ├── .babelrc
│   ├── .gitignore
│   ├── babel.config.js
│   ├── package-lock.json
│   ├── package.json                        项目配置文件
│   └── vue.config.js                       vue配置文件
|
|-------------------------以下为后端部分-------------------------|
|
├── config                                  项目配置
│   ├── keys.js                               连接数据库
│   └── passport.js                           验证 token
├── models                                  模型(数据库)
│   ├── account                               账号
│   │   ├── Department.js                       部门模型
│   │   └── Identity.js                         身份模型
│   ├── commodity                             商品
│   │   ├── Brand.js                            商品品牌模型
│   │   ├── Category.js                         商品类别模型
│   │   ├── File.js                             商品档案模型
│   │   └── Unit.js                             商品单位模型
│   ├── inventory                             库存
│   │   ├── OutBound.js                         商品出库信息模型
│   │   └── Storage.js                          商品入库信息模型
│   ├── promotion                             促销
│   │   └── Order.js                            订单促销信息模型
│   ├── purchase                              采购
│   │   ├── Purchase.js                         采购单信息模型
│   │   └── Supplier.js                         供应商信息模型
│   └── Users.js                                用户信息模型
├── routes                                  路由配置
│   └── api
│       ├── brand.js                            品牌
│       ├── category.js                         类别
│       ├── department.js                       部门
│       ├── file.js                             档案
│       ├── identity.js                         身份
│       ├── order.js                            促销
│       ├── outbound.js                         出库
│       ├── purchase.js                         采购
│       ├── storage.js                          入库
│       ├── supplier.js                         供应商
│       ├── unit.js                             单位
│       └── users.js                            用户
├── .gitignore
├── package-lock.json
├── package.json                            项目配置文件
├── README.md                               项目的说明文档
└── server.js                               基础配置
```

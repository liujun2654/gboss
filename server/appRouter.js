/*
后台应用的路由器模块
1. 引入express
2. 得到路由器
3. 注册n个路由
4. 向外暴露路由器
5. 通过 app使用上路由器
 */

// 1. 引入express
const express = require('express');
const md5 = require('blueimp-md5');
const models = require('./models');
const UserModel = models.getModel('user');

// 2. 得到路由器
const router = express.Router();

// 3. 注册n个路由
//注册路由
/*
路由回调函数的3步
1. 获取请求参数
2. 处理(操作数据库数据)
3. 返回响应
 */
router.post('/register',function (req,res) {
  // 1. 获取请求参数
  const {name,pwd,type} = req.body;
  // 2. 处理(操作数据库数据)
  // 3. 返回响应
  //查询数据库是否存在该用户
  UserModel.findOne({name},function (err,user) {
    //存在
    // code: 数据的标识 1: 错误 0: 正确
    if(user){
      //已存在
      return res.send({code:1,msg:'用户名已存在！'})
    }else {
      //不存在
      new UserModel({name,pwd:md5(pwd),type}).save(function (err,user) {
        res.cookie('userid',user._id);
        return res.send({code:0,date:{_id:user._id,name,type}})
      })
    }
  })
});

// 4. 向外暴露路由器
module.exports = router;
// 5. 通过 app使用上路由器

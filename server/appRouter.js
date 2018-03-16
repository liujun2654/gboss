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

const filter = {pwd:0}

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
        // 生成一个cookie(userid: user._id), 并交给浏览器保存
        res.cookie('userid',user._id);
        // 保存成功, 返回成功的响应数据: user
        return res.send({code:0,data:{_id:user._id,name,type}})
      })
    }
  })
});
//登陆路由
router.post('/login',function (req,res) {
  // 1. 获取请求参数
  const {name,pwd} = req.body;
  // 2. 处理(操作数据库数据)
  UserModel.findOne({name,pwd:md5(pwd)},filter,function (err,user) {
    // 3. 返回响应
    // 3.1. 如果user没有值, 返回一个错误的提示: 用户名或密码错误
    if(!user){
      return res.send({code:1,msg:'用户名或密码错误'})
    }else {
      // 生成一个cookie(userid: user._id), 并交给浏览器保存
      res.cookie('userid',user._id);
      return res.send({code:0,data:user})
    }
  })

});
//更新资料路由
router.post('/update',function (req,res) {
  //拿到请求cookie的userid
  const userid = req.cookies.userid;
  //判断是否存在，如果没存在，表示没登陆
  if(!userid){
    return res.send({code:1,msg:'请先登陆'});
  }
  //更新数据库中对应的数据
  UserModel.findByIdAndUpdate({_id:userid},req.body,function (err,user) {
    if(!user){
      //更新失败，删除cookie中userid
      res.clearCookie('userid');
      return res.send({code:1,msg:'请先登陆'});
    }else {
      //更新成功，返回新数据
      const {_id,name,type} = user;
      //合并用户数据
      const data = Object.assign(req.body,{_id,name,type});
      res.send({code:0,data});
    }
  })
});

// 4. 向外暴露路由器
module.exports = router;
// 5. 通过 app使用上路由器

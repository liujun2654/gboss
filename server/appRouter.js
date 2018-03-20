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
const ChatModel = models.getModel('chat')

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
//获取用户user路由
router.get('/user',function (req,res) {
  //拿到cookie中的userid
  const userid = req.cookies.userid;
  //判读是否存在
  if(!userid){//不存在
    return res.send({code:1,msg:'请先登陆'});
  }
  //通过userid从数据库中获取相应的user
  UserModel.findOne({_id:userid},filter,function (err,user) {
    if(!user){
      //获取失败，删除cookie中userid
      res.clearCookie('userid');
      return res.send({code:1,msg:'请先登陆'});
    }else {
      //获取成功，返回新数据
      res.send({code:0,data:user});
    }
  })
});

//根据type属性获取用户列表
router.get('/userlist',function (req,res) {
  const type = req.query.type;
  UserModel.find({type},filter,function (err,users) {
    res.send({code:0,data:users});
  })
})

/*
获取当前用户所有相关聊天信息列表
 */
router.get('/msglist', function (req, res) {
  // 获取cookie中的userid
  const userid = req.cookies.userid
  // 查询得到所有user文档数组
  UserModel.find(function (err, userDocs) {
    // 用对象存储所有user信息: key为user的_id, val为name和avatar组件的user对象
    const users = {} // 对象容器
    userDocs.forEach(doc => {
      users[doc._id] = {name: doc.name, avatar: doc.avatar}
    })
    /*
    查询userid相关的所有聊天信息
     参数1: 查询条件
     参数2: 过滤条件
     参数3: 回调函数
    */
    ChatModel.find({'$or': [{from: userid}, {to: userid}]}, filter, function (err, chatMsgs) {
      // 返回包含所有用户和当前用户相关的所有聊天消息的数据
      res.send({code: 0, data: {users, chatMsgs}})
    })
  })
})

/*
修改指定消息为已读
 */
router.post('/readmsg', function (req, res) {
  // 得到请求中的from和to
  const from = req.body.from
  const to = req.cookies.userid
  /*
  更新数据库中的chat数据
  参数1: 查询条件
  参数2: 更新为指定的数据对象
  参数3: 是否1次更新多条, 默认只更新一条
  参数4: 更新完成的回调函数
   */
  ChatModel.update({from, to, read: false}, {read: true}, {multi: true}, function (err, doc) {
    console.log('/readmsg', doc)
    res.send({code: 0, data: doc.nModified})
  })
})


// 4. 向外暴露路由器
module.exports = router;
// 5. 通过 app使用上路由器

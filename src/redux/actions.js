/*
包含所有action creator函数的模块
 */
import io from 'socket.io-client';

import {
  reqRegister,
  reqLogin,
  reqUpdateUser,
  reqUser,
  reqUserList,
  reqMsgList,
  reqReadMsg
} from '../api';
import {
  ERROR_MSG,
  AUTH_SUCCESS,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_USER_LIST,
  RECEIVE_MSG,
  RECEIVE_MSG_LIST
} from './action-types';

//错误信息同步action
export const errorMsg = msg => ({type:ERROR_MSG,data:msg});
//正确信息同步action
export const authSuccess = user => ({type:AUTH_SUCCESS,data:user});
//接受用户同步的action
export const receiveUser = user => ({type:RECEIVE_USER,data:user});
//重置用户同步的action
export const resetUser = msg => ({type:RESET_USER,data:msg});
//接收用户列表同步的action
export const receiveuserlist = userlist => ({type:RECEIVE_USER_LIST,data:userlist})
// 接收一个聊天消息的同步action
const receiveMsg = (chatMsg) => ({type: RECEIVE_MSG, data: chatMsg})

// 接收消息列表的同步action
const receiveMsgList = ({users, chatMsgs}) => ({type: RECEIVE_MSG_LIST, data: {users, chatMsgs}})


/*
初始化与服务器的io连接
绑定接收消息的监听
 */
function initIO(userid, dispatch) {
  // 连接IO服务, 得到连接对象socket
  io.socket = io(`ws://localhost:8080?userid=${userid}`)
  // 绑定接收服务发送消息的监听
  io.socket.on('receiveMsg', function (chatMsg) {
    console.log('浏览器接收到消息', chatMsg)
    dispatch(receiveMsg(chatMsg))
  })
}

//异步获取当前用户所有聊天列表
async function getMsgList(dispatch) {
  const response = await reqMsgList();
  const result = response.data;
  if(result.code===0){
    const {users, chatMsgs} = result.data;
    dispatch(receiveMsgList({users, chatMsgs}))
  }
}

//发送消息
export const sendMsg = ({from,to,content}) => {
  return dispatch=>{
    io.socket.emit('sendMsg',{from,to,content})
    console.log('浏览器向服务器发送消息',{from,to,content});
  }
}

//异步注册action
export const register = ({name,pwd,pwd2,type}) => {
  //前台判断
  if(!name || !pwd){
    return errorMsg('用户名或密码不能为空！');
  }else if(pwd !== pwd2){
    return errorMsg('两次输入的密码不一致！');
  }
  //前台验证通过，发送异步请求
  return async dispatch => {
    const response = await reqRegister({name,pwd,type});
    const result = response.data;
    //判断是否成功
    if(result.code === 0){//成功
      initIO(result.data._id, dispatch)
      getMsgList(dispatch)
      dispatch(authSuccess(result.data))
    }else {//失败
      dispatch(errorMsg(result.msg));
    }
  }
};

//异步登陆action
export const login = ({name,pwd}) => {
  //前台判断
  if(!name || !pwd){
    return errorMsg('用户名或密码不能为空！')
  }
  //前台验证通过，发送异步请求
  return async dispatch => {
    const response = await reqLogin({name,pwd});
    const result = response.data;
    //判断是否成功
    if(result.code === 0){//成功
      initIO(result.data._id, dispatch)
      getMsgList(dispatch)
      dispatch(authSuccess(result.data));
    }else {
      dispatch(errorMsg(result.msg));
    }
  }
};

/*
更新用户资料，发送异步请求
 */
export const updateUser = (user) => {
  return async dispatch=>{
    const response = await reqUpdateUser(user)
    const result = response.data;
    //判断是否成功
    if(result.code === 0){//成功
      dispatch(receiveUser(result.data));
    }else {
      dispatch(resetUser(result.msg));
    }
  }
};

//发送异步action，获取user
export const getUser = () => {
  return async dispatch=>{
    const response = await reqUser();
    const result = response.data;
    //判断是否成功
    if(result.code === 0){//成功
      initIO(result.data._id, dispatch)
      getMsgList(dispatch)
      dispatch(receiveUser(result.data));
    }else {
      dispatch(resetUser(result.msg));
    }
  }
};

//异步获取用户列表
export const getUserList = type => {
  return async dispatch=>{
    const response = await reqUserList(type);
    const result = response.data;
    //判断是否成功
    if(result.code===0){
      dispatch(receiveuserlist(result.data))
    }
  }
}
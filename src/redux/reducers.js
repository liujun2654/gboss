/*
* 用旧的state生成新的state
* */

import {combineReducers} from 'redux'
import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_USER_LIST,
  RECEIVE_MSG,
  RECEIVE_MSG_LIST,
  MSG_READ
} from './action-types';
import {getRedirectPath} from '../utils';

const initUser = {
  name: '', // 用户名
  type: '', //用户类型
  msg: '', //错误提示信息
  redirectTo: '' // 需要自动转向的路径
};
//管理用户的reducer
function user(state=initUser,action) {

  switch (action.type){
    case AUTH_SUCCESS:
      const user = action.data;
      return {...user,redirectTo:getRedirectPath(user.type,user.avatar)};
    case ERROR_MSG:
      return {...state,msg:action.data};
    case RECEIVE_USER:
      return action.data;
    case RESET_USER:
      return {...initUser, msg: action.data};
    default:
      return state;
  }
}

//管理用户列表的reducer
const initUserList = [];

function userList(state=initUserList,action) {
  switch (action.type){
    case RECEIVE_USER_LIST:
      return action.data;
    default:
      return state;
  }
}


const initChat = {
  chatMsgs: [], // 包含所有当前用户相关的聊天列表
  users: {}, // 包含所有用户信息{name, avatar}的对象容器
  unReadCount: 0 // 未读消息的数量
}

function chat(state=initChat,action) {
  switch (action.type){
    case RECEIVE_MSG:
      var {chatMsg,userid} = action.data
      return {
        chatMsgs: [...state.chatMsgs,chatMsg],
        users: state.users,
        unReadCount: state.unReadCount + (!chatMsg.read&&chatMsg.to===userid?1:0)
      };
    case RECEIVE_MSG_LIST:
      var {chatMsgs,users,userid} = action.data;
      return {
        chatMsgs,
        users,
        unReadCount: chatMsgs.reduce((preTotal,msg)=>{
          return preTotal+(!msg.read&&msg.to===userid?1:0)
        },0)
      };
    case MSG_READ:
      const {count,from,to} = action.data
      return {
        chatMsgs:state.chatMsgs.map(msg=>{
          if(msg.from===from && msg.to===to && !msg.read){
            return {...msg,read:true}
          }else {
            return msg
          }
        }),
        users:state.users,
        unReadCount: state.unReadCount - count
      }
    default:
      return state;
  }
}


export default combineReducers({
  user,
  userList,
  chat
})

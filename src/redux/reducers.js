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
  RECEIVE_MSG_LIST
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
      return {
        chatMsgs: [...state.chatMsgs,action.data],
        users: state.users,
        unReadCount: 0
      };
    case RECEIVE_MSG_LIST:
      return {
        chatMsgs: action.data.chatMsgs,
        users: action.data.users,
        unReadCount: 0
      };
    default:
      return state;
  }
}


export default combineReducers({
  user,
  userList,
  chat
})

/*
* 用旧的state生成新的state
* */

import {combineReducers} from 'redux'
import {AUTH_SUCCESS,ERROR_MSG,RECEIVE_USER,RESET_USER} from './action-types';
import {getRedirectPath} from '../utils';

const initUser = {
  name: '', // 用户名
  type: '', //用户类型
  msg: '', //错误提示信息
  redirectTo: '' // 需要自动转向的路径
};

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



export default combineReducers({
  user
})

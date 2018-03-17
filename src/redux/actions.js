/*
包含所有action creator函数的模块
 */

import {reqRegister,reqLogin,reqUpdateUser,reqUser} from '../api';
import {ERROR_MSG,AUTH_SUCCESS,RECEIVE_USER,RESET_USER} from './action-types';

//错误信息同步action
export const errorMsg = msg => ({type:ERROR_MSG,data:msg});
//正确信息同步action
export const authSuccess = user => ({type:AUTH_SUCCESS,data:user});
//接受用户同步的action
export const receiveUser = user => ({type:RECEIVE_USER,data:user});
//重置用户同步的action
export const resetUser = msg => ({type:RESET_USER,data:msg});

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
      dispatch(receiveUser(result.data));
    }else {
      dispatch(resetUser(result.msg));
    }
  }
};
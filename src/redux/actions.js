/*
包含所有action creator函数的模块
 */

import {reqRegister,reqLogin} from '../api';
import {ERROR_MSG,AUTH_SUCCESS} from './action-types';

//错误信息同步action
export const errorMsg = msg => ({type:ERROR_MSG,data:msg});
//正确信息同步action
export const authSuccess = user => ({type:AUTH_SUCCESS,data:user});

//异步注册action
export const register = ({name,pwd,pwd2,type}) => {
  //前台判断
  if(!name || !pwd){
    return errorMsg('用户名或密码不能为空！');
  }else if(pwd !== pwd2){
    return errorMsg('两次输入的密码不一致！');
  }
  //前台验证通过，发送异步请求
  return dispatch => {
    reqRegister({name,pwd,type}).then(response=>{
      const result = response.data;
        //判断是否成功
      if(result.code === 0){//成功
        dispatch(authSuccess(result.data))
      }else {//失败
        dispatch(errorMsg(result.msg));
      }
      })
  }
};

//异步登陆action
export const login = ({name,pwd}) => {
  //前台判断
  if(!name || !pwd){
    return errorMsg('用户名或密码不能为空！')
  }
  //前台验证通过，发送异步请求
  return dispatch => {
    reqLogin({name,pwd}).then(response=>{
      const result = response.data;
      //判断是否成功
      if(result.code === 0){//成功
        dispatch(authSuccess(result.data));
      }else {
        dispatch(errorMsg(result.msg));
      }
    })
  }
}
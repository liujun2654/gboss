/*
包含n个与后台接口对应的请求函数的模块
函数返回值为promise对象
*/

import ajax from './ajax';

//请求注册
export const reqRegister = user => ajax('/api/register',user,'POST');
//请求登陆
export const reqLogin = user => ajax('/api/login',user,'POST');
//更新用户资料
export const reqUpdateUser = user => ajax('/api/update',user,'POST');
//获取用户
export const reqUser = () => ajax('/api/user');
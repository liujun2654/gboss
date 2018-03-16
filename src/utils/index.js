/*
包含n个工具函数的模块
 */
/*
注册boss--> /bossinfo
注册牛人--> /geniusinfo
登陆boss --> /bossinfo 或者 /boss
登陆牛人 --> /geniusinfo 或者 /genius
 */

export function getRedirectPath(type,avatar) {
  let path = '';
  path += type==='boss'?'/boss':'/genius';
  if(!avatar){
    path += 'info';
  }
  return path
}

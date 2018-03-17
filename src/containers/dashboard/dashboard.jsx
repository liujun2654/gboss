/*
* 主面板路由组件
* */

import React from 'react';
import {Route, Switch,Redirect} from 'react-router-dom'
import cookies from 'browser-cookies';//get()获取cookies  set()设置cookies
import {connect} from 'react-redux'

import {getUser} from '../../redux/actions'

import BossInfo from '../boss-info/boss-info';
import GeniusInfo from '../genius-info/genius-info';
import Boss from '../boss/boss';
import Genius from '../genius/genius';
import Msg from '../msg/msg';
import User from '../user/user';
import NotFound from '../not-found/not-found';
import {getRedirectPath} from '../../utils'

class Dashboard extends React.Component{

  componentDidMount(){
    const userid = cookies.get('userid');
    const {user} = this.props;
    if(userid && !user._id){
      this.props.getUser()
    }
  }

  render(){
    // 判断用户是否已登陆(过)(cookie中userid是否有值)
    const userid = cookies.get('userid');
    if(!userid){
      return <Redirect to='/login'/>
    }
    //cookie中有userid
    //判断redux是否有user
    const {user} = this.props;
    if(!user._id){
      return null;
    }else {
      // 请求根路径时, 自动 跳转到对应的用户主界面
      const pathname = this.props.location.pathname
      if(pathname==='/') {
        const path = getRedirectPath(user.type, user.avatar)
        return <Redirect to={path}/>
      }
    }
    return (
      <div>
        <Switch>
          <Route path='/bossinfo' component={BossInfo}/>
          <Route path='/geniusinfo' component={GeniusInfo}/>
          <Route path='/boss' component={Boss}/>
          <Route path='/genius' component={Genius}/>
          <Route path='/msg' component={Msg}/>
          <Route path='/user' component={User}/>
          <Route component={NotFound}/>
        </Switch>
      </div>
    )
  }
}

export default connect(
  state=>({user:state.user}),
  {getUser}
)(Dashboard)
/*
* 主面板路由组件
* */

import React from 'react';
import {Route, Switch,Redirect} from 'react-router-dom'
import {NavBar} from 'antd-mobile'
import cookies from 'browser-cookies';//get()获取cookies  set()设置cookies
import {connect} from 'react-redux'

import {getUser} from '../../redux/actions'

import BossInfo from '../boss-info/boss-info';
import GeniusInfo from '../genius-info/genius-info';
import Boss from '../boss/boss';
import Genius from '../genius/genius';
import Msg from '../msg/msg';
import User from '../user/user';
import Chat from '../chat/chat';
import NotFound from '../../components/not-found/not-found';
import {getRedirectPath} from '../../utils'
import NavFooter from '../../components/nav-footer/nav-footer'

class Dashboard extends React.Component{

  navList = [
    {
      path: '/boss', // 路由路径
      component: Boss,
      title: '牛人列表',
      icon: 'boss',
      text: '牛人',
    },
    {
      path: '/genius', // 路由路径
      component: Genius,
      title: 'BOSS列表',
      icon: 'job',
      text: 'BOSS',
    },
    {
      path: '/msg', // 路由路径
      component: Msg,
      title: '消息列表',
      icon: 'msg',
      text: '消息',
    },
    {
      path: '/user', // 路由路径
      component: User,
      title: '个人中心',
      icon: 'user',
      text: '我',
    }
  ];

  componentDidMount(){
    const userid = cookies.get('userid');
    const {user} = this.props;
    if(userid && !user._id){
      this.props.getUser()
    }
  }

  render(){
    // 请求根路径时, 自动 跳转到对应的用户主界面
    const pathname = this.props.location.pathname;
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
      if(pathname==='/') {
        const path = getRedirectPath(user.type, user.avatar)
        return <Redirect to={path}/>
      }
      //判断那个nav需要被隐藏
      if(user.type==='boss'){
        this.navList[1].hide = true;
      }else {
        this.navList[0].hide = true;
      }
    }
    //获取当前的需要显示的nav
    const currentNav = this.navList.find(nav=>nav.path===pathname);
    return (
      <div>
        {currentNav?<NavBar className='stick-top'>{currentNav.title}</NavBar>:null}
        <Switch>
          <Route path='/bossinfo' component={BossInfo}/>
          <Route path='/geniusinfo' component={GeniusInfo}/>
          <Route path='/boss' component={Boss}/>
          <Route path='/genius' component={Genius}/>
          <Route path='/msg' component={Msg}/>
          <Route path='/user' component={User}/>
          <Route path='/chat/:userid' component={Chat}/>
          <Route component={NotFound}/>
        </Switch>
        {currentNav?<NavFooter navList={this.navList}/>:null}
      </div>
    )
  }
}

export default connect(
  state=>({user:state.user}),
  {getUser}
)(Dashboard)
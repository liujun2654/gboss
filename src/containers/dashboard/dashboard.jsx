/*
* 主面板路由组件
* */

import React from 'react';
import {Route, Switch} from 'react-router-dom'

import BossInfo from '../boss-info/boss-info';
import GeniusInfo from '../genius-info/genius-info';

export default class Dashboard extends React.Component{

  render(){
    return (
      <div>
        <Switch>
          <Route path='/bossinfo' component={BossInfo}/>
          <Route path='/geniusinfo' component={GeniusInfo}/>
        </Switch>
      </div>
    )
  }
}
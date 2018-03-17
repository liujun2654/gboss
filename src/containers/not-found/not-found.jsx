/*
错误路径，返回首页
 */

import React from 'react';

import {Button} from 'antd-mobile'

export default class NotFound extends React.Component{

  render(){

    return (
      <div>
        <Button type='primary' onClick={()=>this.props.history.replace('/')}>返回首页</Button>
      </div>
    )
  }
}
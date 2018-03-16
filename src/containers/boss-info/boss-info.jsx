/*
BOSS完善资料组件
 */
import React from 'react';
import {NavBar,InputItem,TextareaItem,Button} from 'antd-mobile';

import AvatarSelector from '../../components/avatar-selector/avatar-selector';

export default class BossInfo extends React.Component{
  state = {
    // 头像
    avatar: '',
    // 职位简介
    desc: '',
    // 职位名
    title: '',
    // 公司名称
    company: '',
    // 工资
    money: ''
  };

  handleChange = (name,val) => {
    this.setState({[name]: val})
  };
  setAvatar = (text) => {
    this.setState({avatar:text})
  }

  render(){
    return (
      <div>
        <NavBar>BOSS信息完善</NavBar>
        <AvatarSelector setAvatar={this.setAvatar}/>
        <InputItem onChange={val => this.handleChange('title', val)}>招聘职位:</InputItem>
        <InputItem onChange={val=>this.handleChange('company',val)}>公司名称:</InputItem>
        <InputItem onChange={val=>this.handleChange('money',val)}>职位薪资:</InputItem>
        <TextareaItem title='职位要求' rows={3} onChange={val=>this.handleChange('desc',val)}/>
        <Button type='primary'>保存</Button>
      </div>
    )
  }
}
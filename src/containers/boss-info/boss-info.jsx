/*
BOSS完善资料组件
 */
import React from 'react';
import {NavBar,InputItem,TextareaItem,Button} from 'antd-mobile';
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import AvatarSelector from '../../components/avatar-selector/avatar-selector';
import {updateUser} from '../../redux/actions';

class BossInfo extends React.Component{
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
    //如果用户已完善，跳转到boss路由
    const {user} = this.props;
    if(user.avatar){
      return <Redirect to='/boss'/>
    }
    return (
      <div>
        <NavBar>BOSS信息完善</NavBar>
        <AvatarSelector setAvatar={this.setAvatar}/>
        <InputItem onChange={val => this.handleChange('title', val)}>招聘职位:</InputItem>
        <InputItem onChange={val=>this.handleChange('company',val)}>公司名称:</InputItem>
        <InputItem onChange={val=>this.handleChange('money',val)}>职位薪资:</InputItem>
        <TextareaItem title='职位要求' rows={3} onChange={val=>this.handleChange('desc',val)}/>
        <Button type='primary' onClick={()=>this.props.updateUser(this.state)}>保存</Button>
      </div>
    )
  }
}

export default connect(
  state=>({user:state.user}),
  {updateUser}
)(BossInfo)
/*
牛人完善资料组件
 */
import React from 'react';
import {NavBar,InputItem,TextareaItem,Button} from 'antd-mobile';
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import AvatarSelector from '../../components/avatar-selector/avatar-selector';
import {updateUser} from '../../redux/actions';

class GeniusInfo extends React.Component{
  state = {
    // 头像
    avatar: '',
    // 个人简历
    desc: '',
    // 求职岗位
    title: ''
  };

  handleChange = (name,val) => {
    this.setState({[name]: val})
  };
  setAvatar = (text) => {
    this.setState({avatar:text})
  };

  render(){
    //如果用户已完善，跳转到genius路由
    const {user} = this.props;
    if(user.avatar){
      return <Redirect to='/genius'/>
    }
    return (
      <div>
        <NavBar>牛人信息完善</NavBar>
        <AvatarSelector setAvatar={this.setAvatar}/>
        <InputItem onChange={val => this.handleChange('title', val)}>求职岗位:</InputItem>
        <TextareaItem title='个人简历' rows={3} onChange={val=>this.handleChange('desc',val)}/>
        <Button type='primary' onClick={()=>this.props.updateUser(this.state)}>保存</Button>
      </div>
    )
  }
}

export default connect(
  state=>({user:state.user}),
  {updateUser}
)(GeniusInfo);
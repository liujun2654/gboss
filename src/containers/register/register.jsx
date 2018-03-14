/*
* 注册路由组件
* */

import React from 'react';
import {WingBlank,WhiteSpace,NavBar,Radio,Button,List,InputItem} from 'antd-mobile';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import Logo from '../../components/logo/logo'
import {register} from '../../redux/actions'

let RadioItem = Radio.RadioItem;

class Register extends React.Component{

  state = {
    name: '',
    pwd: '',
    pwd2: '',
    type:  'boss'
  };

  handleChange=(name,val)=>{
    this.setState({
      [name]:val
    })
  };

  register=()=>{
    this.props.register(this.state);
  };
  toLogin=() =>{
    this.props.history.replace('./login');
  };

  render(){
    const {user} = this.props;
    if(user.redirectTo){
      return <Redirect to={user.redirectTo}/>
    }
    return (
      <div>
        <NavBar>硅 谷 直 聘</NavBar>
        <Logo/>
        <WingBlank>
          <List>
            <WhiteSpace/>
            {user.msg?<p className='error-msg'>{user.msg}</p>:''}
            <InputItem onChange={val=>{this.handleChange('name',val)}}>用户名：</InputItem>
            <WhiteSpace/>
            <InputItem type='password' onChange={val=>{this.handleChange('pwd',val)}}>密码：</InputItem>
            <WhiteSpace/>
            <InputItem type='password' onChange={val=>{this.handleChange('pwd2',val)}}>确认密码：</InputItem>
            <RadioItem checked={this.state.type==='genius'}
                       onClick={val=>{this.handleChange('type','genius')}}>牛人</RadioItem>
            <RadioItem checked={this.state.type==='boss'}
                       onClick={val=>{this.handleChange('type','boss')}}>boss</RadioItem>
            <Button type='primary' onClick={this.register}>注册</Button>
            <Button onClick={this.toLogin}>已有账号</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}

export default connect(
  state => ({user:state.user}),
  {register}
)(Register)
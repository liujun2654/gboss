/*
* 登录路由组件
* */

import React from 'react';
import {WingBlank,WhiteSpace,NavBar,Button,List,InputItem} from 'antd-mobile';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import Logo from '../../components/logo/logo'
import {login} from '../../redux/actions'


class Login extends React.Component{

  state = {
    name: '',//用户名
    pwd: '' //密码
  };

  handleChange=(name,val)=>{
    this.setState({
      [name]:val
    })
  }

  login=()=>{
    this.props.login(this.state);
  };
  toRegister=() =>{
    this.props.history.replace('./register');
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
            <Button type='primary' onClick={this.login}>登陆</Button>
            <Button onClick={this.toRegister}>还没有账号</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}

export default connect(
  state=>({user:state.user}),
  {login}
)(Login)
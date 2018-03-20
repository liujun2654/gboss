/*
对话聊天的路由组件
 */

import React, {Component} from 'react'
import {NavBar, List, InputItem,Icon} from 'antd-mobile'
import {connect} from 'react-redux'
import {sendMsg} from '../../redux/actions'

const Item = List.Item

class Chat extends Component {

  state = {
    content:''
  }
  handleChange = (content) => {
    this.setState({content})
  }
  send = () => {
    const {content} = this.state;
    if(content){
      const from = this.props.user._id;
      const to = this.props.match.params.userid;
      this.props.sendMsg({from,to,content});
      this.setState({content:''});
    }
  }
  componentDidMount() {
    // 初始显示列表
    window.scrollTo(0, document.body.scrollHeight)
  }

  componentDidUpdate () {
    // 更新显示列表
    window.scrollTo(0, document.body.scrollHeight)
  }


  render() {
    //获取当前用户与目标用户的聊天列表
    const {user} = this.props;
    const {users, chatMsgs} = this.props.chat;
    if(!users[user._id]){
      return null
    }
    const targetId = this.props.match.params.userid;
    const meId = user._id;
    const chat_id = [targetId,meId].sort().join('_');
    const msgs = chatMsgs.filter(msg=>msg.chat_id===chat_id);

    //确定双方的头像
    const targetAvatar = users[targetId].avatar;
    const targetIcon = targetAvatar ? require(`../../assets/imgs/${targetAvatar}.png`) : null;
    const meIcon = require(`../../assets/imgs/${users[meId].avatar}.png`)
    return (
      <div id='chat-page'>
        <NavBar className='stick-top' icon={<Icon type='left'/>}
                onLeftClick={() => {
                  this.props.history.goBack()
                }}>{users[targetId].name}</NavBar>
        <List className='msg-top-bottom'>
          {
            msgs.map(msg=>{
              if(msg.to===meId){
                return (
                  <Item
                    key={msg._id}
                    thumb={targetIcon}
                  >
                    {msg.content}
                  </Item>
                )
              }else {
                return(
                  <Item
                    key={msg._id}
                    className='chat-me'
                    extra={<img src={meIcon}/>}
                  >
                    {msg.content}
                  </Item>
                )
              }
            })
          }

        </List>

        <div className='am-tab-bar'>
          <InputItem
            placeholder="请输入"
            extra={
              <span onClick={this.send}>发送</span>
            }
            value={this.state.content}
            onChange={val=>{this.handleChange(val)}}
          />
        </div>
      </div>
    )
  }
}

export default connect(
  state=>({user:state.user,chat:state.chat}),
  {sendMsg}
)(Chat)

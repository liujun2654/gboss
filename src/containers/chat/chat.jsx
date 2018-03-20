/*
对话聊天的路由组件
 */


import React, {Component} from 'react'
import {NavBar, List, InputItem,Icon,Grid} from 'antd-mobile'
import {connect} from 'react-redux'
import {sendMsg,readMsg} from '../../redux/actions'

const Item = List.Item

class Chat extends Component {

  state = {
    content:'',
    isShow:false
  }
  componentWillMount () { // 在第一次调用render()之前调用
    const emojis = ['🤷🏻','😀', '😄', '😅', '😉','😀', '😄', '😅', '😉',
      '😀', '😄', '😅', '😉','😀', '😄', '😅', '😉',
      '😀', '😄', '😅', '😉','😀', '😄', '😅', '😉',
      '😀', '😄', '😅', '😉','😀', '😄', '😅', '😉',
      '😀', '😄', '😅', '😉','😀', '😄', '😅', '😉',
      '😀', '😄', '😅', '😉','😀', '😄', '😅', '😉',
      '😀', '😄', '😅', '😉','😀', '😄', '😅', '😉']
    this.emojis = emojis.map(text => ({text}))
  }
  toggleShow = () => {
    const isShow = !this.state.isShow
    this.setState({isShow})

    if(isShow) {
      // 异步手动派发resize事件,解决表情列表显示的bug
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'))
      }, 0)
    }
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
      this.setState({content:'',isShow:false});
    }
  }
  componentDidMount() {
    // 初始显示列表
    window.scrollTo(0, document.body.scrollHeight)



  }
  componentWillUnmount(){
    //请求标识当前消息已读
    const from = this.props.match.params.userid;
    this.props.readMsg(from)
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
              <div>
                <span onClick={this.toggleShow}>😀</span>
                <span onClick={this.send}>发送</span>
              </div>
            }
            value={this.state.content}
            onChange={val=>{this.handleChange(val)}}
            onFocus={() => this.setState({isShow: false})}
          />
          {this.state.isShow ? (
            <Grid data={this.emojis}
                  columnNum={8}
                  carouselMaxRow={4}
                  isCarousel={true}
                  onClick={item => this.setState({content: this.state.content + item.text})}/>
          ) : null}
        </div>
      </div>
    )
  }
}

export default connect(
  state=>({user:state.user,chat:state.chat}),
  {sendMsg,readMsg}
)(Chat)

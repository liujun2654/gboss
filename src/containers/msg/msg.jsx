/*
消息列表
 */

import React from 'react';
import {List,Badge} from 'antd-mobile'
import {connect} from 'react-redux'

import QueueAnim from 'rc-queue-anim'

const Item = List.Item
const Brief = Item.Brief


function getLastMsgs(chatMsgs,userid) {
  //创建存储lastMsg的对象容器
  const lastMsgObjs = {};
  //遍历chatMsgs
  chatMsgs.forEach(msg=>{
    msg.unReadCount = 0
    //统计msg
    if(!msg.read && msg.to===userid){
      msg.unReadCount = 1
    }
    //取出msg最后lastMsg
    const savedLastMsg = lastMsgObjs[msg.chat_id];
    if(!savedLastMsg){
      lastMsgObjs[msg.chat_id] = msg;
    }else {
      //比较，如果msg中create_time大，就替换
      if(msg.create_time>savedLastMsg.create_time){
        lastMsgObjs[msg.chat_id] = msg;
        msg.unReadCount += savedLastMsg.unReadCount;
      }else {
        savedLastMsg.unReadCount += msg.unReadCount
      }
    }
  })

  //得到lastMsg组成的数组
  const lastMsgs = Object.values(lastMsgObjs);
  //按照create_time进行降序
  lastMsgs.sort(function (msg1,msg2) {// 如果返回负数, msg1在前面, 如果是正数, msg2在前面, 否则不变位置
    return msg2.create_time-msg1.create_time
  })
  return lastMsgs
}

class Msg extends React.Component{

  render(){

    const {user} = this.props;
    const {users,chatMsgs} = this.props.chat;
    const meId = user._id;
    //获得跟所有人聊天最后一条的数组
    const lastMsgs = getLastMsgs(chatMsgs,meId);
    return (
        <List className='msg-top-bottom'>
          <QueueAnim type='scale'>
          {
            lastMsgs.map(lastMsg=>{
              const targetId = lastMsg.to===meId?lastMsg.from:lastMsg.to;
              const targetUser = users[targetId];
              const targerAvatarIcon = targetUser.avatar?require(`../../assets/imgs/${targetUser.avatar}.png`) : null
              return (
                <Item
                  key={lastMsg._id}
                  extra={<Badge text={lastMsg.unReadCount}/>}
                  thumb={targerAvatarIcon}
                  arrow='horizontal'
                  onClick={()=>this.props.history.push(`/chat/${targetId}`)}
                >
                  {lastMsg.content}
                  <Brief>{targetUser.name}</Brief>
                </Item>
              )
            })
          }
          </QueueAnim>
        </List>
    )
  }
}

export default connect(
  state=>({user:state.user,chat:state.chat})
)(Msg)
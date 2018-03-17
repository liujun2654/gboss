/*
详细信息头像选择组件
 */
import React from 'react';
import {List,Grid} from 'antd-mobile';
import {PropTypes} from 'prop-types'

export default class AvatarSelector extends React.Component{

  static propTypes = {
    setAvatar:PropTypes.func.isRequired
  };
  constructor(props){
    super(props);
    this.avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
      .split(',')
      .map(text=>({text,icon:require(`../../assets/imgs/${text}.png`)}))
  }
  state = {
    icon:null
  };
  selectorAvatar = ({text,icon}) => {
    this.setState({icon});
    this.props.setAvatar(text)
  };
  render(){
    const {icon} = this.state;
    const GridHeader = icon?<p>已选择头像：<img src={icon} alt='avatar'/></p>:'请选择头像';
    return (
      <List renderHeader={GridHeader}>
        <Grid data={this.avatarList}
              columnNum={5}
              onClick={this.selectorAvatar}/>
      </List>
    )
  }
}
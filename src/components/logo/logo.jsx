import React from 'react';

import jobLogo from './job.png'
import './logo.less'

export default class Logo extends React.Component{

  render(){
    return (
      <div className='logo'>
        <img src={jobLogo} alt=""/>
      </div>
    )
  }
}
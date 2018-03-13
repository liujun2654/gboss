/*
* 用旧的state生成新的state
* */

import {combineReducers} from 'redux'

function xxx(state=0,action) {

  return state;
}

function yyy(state={},action) {

  return state;
}

export default combineReducers({
  xxx,
  yyy
})

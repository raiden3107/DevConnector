import { combineReducers } from 'redux'
import alert from './alert'
import register from './register'
import profile from './profile'

export default combineReducers({ alert, register, profile })
import { combineReducers } from 'redux'
import alert from './alert'
import register from './register'
import profile from './profile'
import post from './post'

export default combineReducers({ alert, register, profile, post })
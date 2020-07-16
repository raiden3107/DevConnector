import { GET_PROFILE, PROFILE_ERROR } from './types'
import axios from 'axios'
import { setAlert } from '../actions/alert'

export const getCurrentUserProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me')
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}

export const createProfile = (formBody, history, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.post('/api/profile', formBody, config)
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
        dispatch(setAlert(edit ? 'Profile has been updated' : 'Profile has been created', 'success'))
        if (!edit) {
            history.push('/dashboard')
        }

    } catch (err) {
        const errors = err.response.data.error
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

export const addExperience = (formBody, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.put('/api/profile/experience', formBody, config)
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
        dispatch(setAlert('Experience Added', 'success'))
        history.push('/dashboard')

    } catch (err) {
        const errors = err.response.data.error
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

export const addEducation = (formBody, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.put('/api/profile/education', formBody, config)
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
        dispatch(setAlert('Education Added', 'success'))
        history.push('/dashboard')

    } catch (err) {
        const errors = err.response.data.error
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}
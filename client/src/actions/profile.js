import { GET_PROFILE, PROFILE_ERROR, EXPERIENCE_REMOVED, EDUCATION_REMOVED, ACCOUNT_REMOVED, CLEAR_PROFILE, GET_PROFILES, GET_GITHUB, GITHUB_ERROR } from './types'
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

export const deleteExperience = id => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.delete(`/api/profile/experience/${id}`, config)
        dispatch({
            type: EXPERIENCE_REMOVED,
            payload: res.data
        })
        dispatch(setAlert('Experience Deleted', 'success'))
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

export const deleteEducation = id => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.delete(`/api/profile/education/${id}`, config)
        dispatch({
            type: EDUCATION_REMOVED,
            payload: res.data
        })
        dispatch(setAlert('Education Deleted', 'success'))
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

export const deleteAccount = () => async dispatch => {
    if (window.confirm('Are you sure? This CANNOT be undone')) {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const res = await axios.delete(`/api/profile`, config)
            dispatch({
                type: CLEAR_PROFILE,
            })
            dispatch({
                type: ACCOUNT_REMOVED,
            })
            dispatch(setAlert('Account Deleted', 'success'))
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
}

export const getUserProfiles = () => async dispatch => {
    dispatch({ type: CLEAR_PROFILE })
    try {
        const res = await axios.get('/api/profile')
        dispatch({
            type: GET_PROFILES,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}

export const getUserProfileById = userId => async dispatch => {
    try {
        const res = await axios.get(`/api/profile/user/${userId}`)
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

export const getGithub = username => async dispatch => {
    try {
        const res = await axios.get(`/api/profile/github/${username}`)
        dispatch({
            type: GET_GITHUB,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: GITHUB_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}
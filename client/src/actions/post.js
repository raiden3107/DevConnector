import { GET_POSTS, POST_ERROR, UPDATE_POSTS, DELETE_POST, ADD_POST, GET_POST, ADD_COMMENT, REMOVE_COMMENT, COMMENT_ERROR } from './types'
import { setAlert } from './alert'
import axios from 'axios'

export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get('/api/posts')
        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

export const addLike = id => async dispatch => {
    try {
        const res = await axios.post(`/api/posts/like/${id}`)
        dispatch({
            type: UPDATE_POSTS,
            payload: { id, likes: res.data }
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

export const removeLike = id => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/unlike/${id}`)
        dispatch({
            type: UPDATE_POSTS,
            payload: { id, likes: res.data }
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

export const deletePost = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/posts/${id}`)
        dispatch({
            type: DELETE_POST,
            payload: id
        })
        dispatch(setAlert('Post removed', 'success'))
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

export const addPost = formData => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.post('/api/posts', formData, config)
        dispatch({
            type: ADD_POST,
            payload: res.data
        })
        dispatch(setAlert('Post Added', 'success'))
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

export const getPost = id => async dispatch => {
    try {
        const res = await axios.get(`/api/posts/${id}`)
        dispatch({
            type: GET_POST,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

export const addComment = (id, formData) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.post(`/api/posts/comment/${id}`, formData, config)
        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        })
        dispatch(setAlert('Comment Added', 'success'))
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

export const removeComment = (postid, _id) => async dispatch => {
    try {
        await axios.delete(`/api/posts/comment/${postid}/${_id}`)
        dispatch({
            type: REMOVE_COMMENT,
            payload: _id
        })
        dispatch(setAlert('Comment Removed', 'success'))
    } catch (err) {
        dispatch({
            type: COMMENT_ERROR,
        })
    }
}
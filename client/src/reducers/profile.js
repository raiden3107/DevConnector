import { GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE } from '../actions/types'

const initialState = {
    profile: null,
    profiles: [],
    loading: true,
    error: null,
    repos: []
}

export default function (state = initialState, action) {
    const { type, payload } = action
    switch (type) {
        case GET_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false,
                error: null
            }
        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                loading: false,
                repos: [],
                error: null
            }
        default:
            return state
    }
}
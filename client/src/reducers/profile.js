import { GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE, EXPERIENCE_REMOVED, EDUCATION_REMOVED, GET_PROFILES, GET_GITHUB, GITHUB_ERROR } from '../actions/types'

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
        case EDUCATION_REMOVED:
        case EXPERIENCE_REMOVED:
            return {
                ...state,
                profile: payload,
                loading: false,
                error: null
            }
        case GET_PROFILES:
            return {
                ...state,
                profiles: payload,
                loading: false,
                error: null
            }
        case GET_GITHUB:
            return {
                ...state,
                repos: payload,
                loading: false,
                error: null
            }
        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
                profile: null
            }
        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                loading: false,
                repos: [],
                error: null
            }
        case GITHUB_ERROR:
            return {
                ...state,
                repos: [],
                error: payload,
                loading: false
            }
        default:
            return state
    }
}
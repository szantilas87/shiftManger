import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS,
    GET_ORGANIZATION_TOKEN,
    GET_TOKEN_FAIL,
    ORGANIZATION_LOADED,
    ORGANIZATION_ERROR
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                    loading: false,
                    user: action.payload
            };
        case ORGANIZATION_LOADED:
            return {
                ...state,
                organization: action.payload
            };
        case ORGANIZATION_ERROR:
            localStorage.removeItem('organizationToken');
            return {
                ...state,
                organizationToken: null,
                    error: action.payload
            };
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('userToken', action.payload.token);
            return {
                ...state,
                ...action.payload,
                    isAuthenticated: true,
                    loading: false,
                    userToken: action.payload.token
            };
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
            localStorage.removeItem('userToken');
            return {
                ...state,
                userToken: null,
                    isAuthenticated: false,
                    loading: false,
                    user: null,
                    error: action.payload
            };
        case GET_ORGANIZATION_TOKEN:
            localStorage.setItem('organizationToken', action.payload.token);
            return {
                ...state,
                ...action.payload,
                    organizationToken: action.payload.token
            };
        case GET_TOKEN_FAIL:
            localStorage.removeItem('organizationToken');
            return {
                ...state,
                error: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                errors: null
            };
        default:
            return state;
    }
};
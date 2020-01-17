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
    ORGANIZATION_ERROR,
    LEAVE_ORGANIZATION,
    EDIT_USER,
    LEAVE_EDIT_USER,
    UPDATE_USER,
    GET_USERS,
    CLEAR_ORGANIZATION_ID,
    JOIN_ORGANIZATION
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
                users: action.payload,
                    loading: false
            };
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                    loading: false,
                    user: action.payload,
                    organizationId: action.payload.organizationId,
                    userId: action.payload._id
            };
        case ORGANIZATION_LOADED:
            return {
                ...state,
                organization: action.payload
            };
        case ORGANIZATION_ERROR:
        case LEAVE_ORGANIZATION:
            localStorage.removeItem('organizationToken');
            return {
                ...state,
                organizationToken: null,
                    organization: null,
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
        case UPDATE_USER:
            return {
                ...state,
                users: state.users.map(user =>
                        user._id === action.payload._id ? action.payload : user
                    ),
                    loading: false
            };
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
            localStorage.removeItem('userToken');
            localStorage.removeItem('organizationToken');
            return {
                ...state,
                userToken: null,
                    organizationToken: null,
                    isAuthenticated: false,
                    loading: false,
                    user: null,
                    users: null,
                    organization: null,
                    organizationId: null,
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

        case CLEAR_ORGANIZATION_ID:
            return {
                ...state,
                organizationId: 'none',
            };
        case EDIT_USER:
            return {
                ...state,
                edit: true
            };
        case LEAVE_EDIT_USER:
            return {
                ...state,
                edit: false
            };
        default:
            return state;
    }
};
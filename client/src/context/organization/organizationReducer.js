import {
    GET_ORGANIZATIONS,
    ADD_ORGANIZATION,
    DELETE_ORGANIZATION,
    SET_CURRENT_ORGANIZATION,
    CLEAR_CURRENT_ORGANIZATION,
    UPDATE_ORGANIZATION,
    FILTER_ORGANIZATIONS,
    CLEAR_FILTER,
    CLEAR_ORGANIZATIONS,
    ORGANIZATION_ERROR
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case GET_ORGANIZATIONS:
            return {
                ...state,
                organizations: action.payload,
                    loading: false
            };
        case ADD_ORGANIZATION:
            return {
                ...state,
                organizations: [action.payload, ...state.organizations],
                    loading: false
            };
        case UPDATE_ORGANIZATION:
            return {
                ...state,
                organizations: state.organizations.map(organization => organization.id === action.payload.id ? action.payload : organization),
                    loading: false
            };
        case DELETE_ORGANIZATION:
            return {
                ...state,
                organizations: state.organizations.filter(organization => organization._id !== action.payload),
                    loading: false
            };
        case CLEAR_ORGANIZATIONS:
            return {
                ...state,
                organizations: null,
                    filtered: null,
                    error: null,
                    current: null
            };
        case SET_CURRENT_ORGANIZATION:
            return {
                ...state,
                current: action.payload
            };
        case CLEAR_CURRENT_ORGANIZATION:
            return {
                ...state,
                current: null
            };
        case FILTER_ORGANIZATIONS:
            return {
                ...state,
                filtered: state.organizations.filter(organization => {
                    const regex = new RegExp(`${action.payload}`, 'gi');
                    return organization.name.match(regex) || organization.rate.match(regex);
                })
            };
        case CLEAR_FILTER:
            return {
                ...state,
                filtered: null
            };
        case ORGANIZATION_ERROR:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
}
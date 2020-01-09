import {
    ADD_ORGANIZATION,
    DELETE_ORGANIZATION,
    SET_CURRENT_ORGANIZATION,
    CLEAR_CURRENT_ORGANIZATION,
    UPDATE_ORGANIZATION,
    FILTER_ORGANIZATIONS,
    CLEAR_FILTER
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case ADD_ORGANIZATION:
            return {
                ...state,
                organizations: [...state.organizations, action.payload]
            };
        case UPDATE_ORGANIZATION:
            return {
                ...state,
                organizations: state.organizations.map(organization => organization.id === action.payload.id ? action.payload : organization)
            };
        case DELETE_ORGANIZATION:
            return {
                ...state,
                organizations: state.organizations.filter(organization => organization.id !== action.payload)
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
        default:
            return state;
    }
}
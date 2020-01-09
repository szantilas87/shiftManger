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
        default:
            return state;
    }
}
import {
    ADD_SHIFT,
    DELETE_SHIFT,
    SET_CURRENT_SHIFT,
    CLEAR_CURRENT_SHIFT,
    UPDATE_ORGANIZATION,
    FILTER_ORGANIZATIONS,
    CLEAR_FILTER
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case ADD_SHIFT:
            return {
                ...state,
                shifts: [...state.shifts, action.payload]
            };
        case DELETE_SHIFT:
            return {
                ...state,
                shifts: state.shifts.filter(shift => shift.id !== action.payload)
            };
        case SET_CURRENT_SHIFT:
            return {
                ...state,
                current: action.payload
            };
        case CLEAR_CURRENT_SHIFT:
            return {
                ...state,
                current: null
            };
        default:
            return state;
    }
}
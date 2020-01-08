import {
    ADD_SHIFT,
    DELETE_SHIFT,
    SET_CURRENT,
    CLEAR_CURRENT,
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
            }
            default:
                return state;
    }
}
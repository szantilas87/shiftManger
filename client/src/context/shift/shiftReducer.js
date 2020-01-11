import {
    GET_SHIFTS,
    ADD_SHIFT,
    DELETE_SHIFT,
    CLEAR_SHIFTS,
    SET_CURRENT_SHIFT,
    CLEAR_CURRENT_SHIFT,
    UPDATE_SHIFT,
    FILTER_SHIFTS,
    CLEAR_FILTER
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case GET_SHIFTS:
            return {
                ...state,
                shifts: action.payload,
                    loading: false
            };
        case ADD_SHIFT:
            return {
                ...state,
                shifts: [...state.shifts, action.payload],
                    loading: false
            };
        case UPDATE_SHIFT:
            return {
                ...state,
                shifts: state.shifts.map(shift => shift.id === action.payload.id ? action.payload : shift),
                    loading: false
            };
        case DELETE_SHIFT:
            return {
                ...state,
                shifts: state.shifts.filter(shift => shift._id !== action.payload),
                    loading: false
            };
        case CLEAR_SHIFTS:
            return {
                ...state,
                shifts: null,
                    filtered: null,
                    error: null,
                    current: null
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
        case FILTER_SHIFTS:
            return {
                ...state,
                filtered: state.shifts.filter(shift => {
                    const regex = new RegExp(`${action.payload}`, 'gi');
                    return shift.user.match(regex);
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
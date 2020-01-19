import {
    GET_SHIFTS,
    GET_SHIFTS_JOINED,
    ADD_SHIFT,
    ADD_SHIFT_JOINED,
    DELETE_SHIFT,
    DELETE_SHIFT_JOINED,
    DELETE_SHIFT_LEAVE,
    CLEAR_SHIFTS,
    SET_CURRENT_SHIFT,
    CLEAR_CURRENT_SHIFT,
    UPDATE_SHIFT,
    UPDATE_SHIFT_JOINED,
    FILTER_SHIFTS,
    CLEAR_FILTER,
    FILTER_SHIFTS_JOINED
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case GET_SHIFTS:
            return {
                ...state,
                shifts: action.payload,
                    loading: false
            };
        case GET_SHIFTS_JOINED:
            return {
                ...state,
                shiftsJoined: action.payload,
                    loading: false,
            };
        case ADD_SHIFT:
            return {
                ...state,
                shifts: [action.payload, ...state.shifts],
                    loading: false
            };
        case ADD_SHIFT_JOINED:
            return {
                ...state,
                shiftsJoined: [action.payload, ...state.shiftsJoined],
                    loading: false
            };
        case UPDATE_SHIFT:
            return {
                ...state,
                shifts: state.shifts.map(shift => shift._id === action.payload._id ? action.payload : shift),
                    loading: false
            };
        case UPDATE_SHIFT_JOINED:
            return {
                ...state,
                shiftsJoined: state.shiftsJoined.map(shift => shift._id === action.payload._id ? action.payload : shift),
                    loading: false
            };
        case DELETE_SHIFT:
            return {
                ...state,
                shifts: state.shifts.filter(shift => shift._id !== action.payload),
                    loading: false
            };
        case DELETE_SHIFT_LEAVE:
            return {
                ...state,
                shiftsJoined: null,
                    shift: null
            };
        case DELETE_SHIFT_JOINED:
            return {
                ...state,
                shiftsJoined: state.shiftsJoined.filter(shift => shift._id !== action.payload),
                    loading: false
            };
        case CLEAR_SHIFTS:
            return {
                ...state,
                shiftsJoined: null,
                    filtered: null,
                    error: null,
                    shifts: null,
                    current: null
            };
        case SET_CURRENT_SHIFT:
            return {
                ...state,
                current: action.payload,

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
        case FILTER_SHIFTS_JOINED:
            return {
                ...state,
                filteredJoined: state.shiftsJoined.filter(shift => {
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
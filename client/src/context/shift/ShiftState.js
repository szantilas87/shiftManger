import React, { useReducer } from 'react';
import axios from 'axios';
import shiftReducer from './shiftReducer';
import ShiftContext from './shiftContext';
import setAuthUserToken from '../../utils/setAuthUserToken';
import setAuthOrgToken from '../../utils/setAuthOrgToken';
import {
  GET_SHIFTS,
  GET_SHIFTS_JOINED,
  ADD_SHIFT,
  ADD_SHIFT_JOINED,
  DELETE_SHIFT,
  DELETE_SHIFT_JOINED,
  DELETE_SHIFT_LEAVE,
  SET_CURRENT_SHIFT,
  CLEAR_CURRENT_SHIFT,
  UPDATE_SHIFT,
  UPDATE_SHIFT_JOINED,
  FILTER_SHIFTS,
  FILTER_SHIFTS_JOINED,
  CLEAR_FILTER,
  CLEAR_SHIFTS,
  ERROR
} from '../types';

const ShiftState = props => {
  const initialState = {
    shifts: null,
    shiftsJoined: null,
    current: null,
    filtered: null,
    filteredJoined: null,
    error: null
  };

  const [state, dispatch] = useReducer(shiftReducer, initialState);
  // Get Shifts
  const getShifts = async () => {
    try {
      const res = await axios.get('/api/shifts');

      dispatch({
        type: GET_SHIFTS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: ERROR,
        payload: err.response.msg
      });
    }
  };

  // Get Shifts After Joined Organization
  const getShiftsJoined = async organizationId => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/shift', organizationId, config);
      dispatch({
        type: GET_SHIFTS_JOINED,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: ERROR,
        payload: err.response.msg
      });
    }
  };

  // Add Shift
  const addShift = async shift => {
    if (localStorage.userToken) {
      setAuthUserToken(localStorage.userToken);
    }

    if (localStorage.organizationToken) {
      setAuthOrgToken(localStorage.organizationToken);
    }
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/shifts', shift, config);
      dispatch({
        type: ADD_SHIFT,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: ERROR,
        payload: err.response.msg
      });
    }
  };

  // Add Shift Joined
  const addShiftJoined = async shift => {
    if (localStorage.userToken) {
      setAuthUserToken(localStorage.userToken);
    }

    if (localStorage.organizationToken) {
      setAuthOrgToken(localStorage.organizationToken);
    }
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/shifts', shift, config);
      dispatch({
        type: ADD_SHIFT_JOINED,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: ERROR,
        payload: err.response.msg
      });
    }
  };

  // Delete Shift

  const deleteShift = async id => {
    try {
      await axios.delete(`/api/shifts/${id}`);

      dispatch({
        type: DELETE_SHIFT,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: ERROR,
        payload: err.response.msg
      });
    }
  };

  // Delete Shift After Leave Organization

  const deleteShiftLeave = async userId => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      await axios.post(`/api/shift/delete`, userId, config);

      dispatch({
        type: DELETE_SHIFT_LEAVE
      });
    } catch (err) {
      dispatch({
        type: ERROR,
        payload: err.response.msg
      });
    }
  };

  // Delete Shift Joined

  const deleteShiftJoined = async id => {
    try {
      await axios.delete(`/api/shifts/${id}`);

      dispatch({
        type: DELETE_SHIFT_JOINED,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: ERROR,
        payload: err.response.msg
      });
    }
  };

  // Update Shift
  const updateShift = async shift => {
    if (localStorage.userToken) {
      setAuthUserToken(localStorage.userToken);
    }

    if (localStorage.organizationToken) {
      setAuthOrgToken(localStorage.organizationToken);
    }
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.put(`/api/shifts/${shift._id}`, shift, config);

      dispatch({
        type: UPDATE_SHIFT,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: ERROR,
        payload: err.response.msg
      });
    }
  };

  // Update Shift Joined
  const updateShiftJoined = async shift => {
    if (localStorage.userToken) {
      setAuthUserToken(localStorage.userToken);
    }

    if (localStorage.organizationToken) {
      setAuthOrgToken(localStorage.organizationToken);
    }
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.put(`/api/shifts/${shift._id}`, shift, config);

      dispatch({
        type: UPDATE_SHIFT_JOINED,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: ERROR,
        payload: err.response.msg
      });
    }
  };
  // Clear Shifts
  const clearShifts = () => {
    dispatch({
      type: CLEAR_SHIFTS
    });
  };

  // Set Current Shift
  const setCurrentShift = Shift => {
    dispatch({
      type: SET_CURRENT_SHIFT,
      payload: Shift
    });
  };

  // Clear Current Shift
  const clearCurrentShift = () => {
    dispatch({
      type: CLEAR_CURRENT_SHIFT
    });
  };

  // Filter Shifts
  const filterShifts = text => {
    dispatch({
      type: FILTER_SHIFTS,
      payload: text
    });
  };

  // Filter Shifts joined
  const filterShiftsJoined = text => {
    dispatch({
      type: FILTER_SHIFTS_JOINED,
      payload: text
    });
  };

  // Clear Filter
  const clearFilter = () => {
    dispatch({
      type: CLEAR_FILTER
    });
  };

  return (
    <ShiftContext.Provider
      value={{
        shifts: state.shifts,
        current: state.current,
        filtered: state.filtered,
        filteredJoined: state.filteredJoined,
        error: state.error,
        shiftsJoined: state.shiftsJoined,
        addShift,
        addShiftJoined,
        deleteShift,
        deleteShiftJoined,
        deleteShiftLeave,
        setCurrentShift,
        clearCurrentShift,
        updateShift,
        updateShiftJoined,
        filterShifts,
        filterShiftsJoined,
        clearFilter,
        getShifts,
        clearShifts,
        getShiftsJoined
      }}
    >
      {' '}
      {props.children}{' '}
    </ShiftContext.Provider>
  );
};

export default ShiftState;

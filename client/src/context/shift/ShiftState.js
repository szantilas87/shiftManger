import React, { useReducer } from 'react';
import uuid from 'uuid';
import shiftReducer from './shiftReducer';
import ShiftContext from './shiftContext';
import {
  ADD_SHIFT,
  DELETE_SHIFT,
  SET_CURRENT_SHIFT,
  CLEAR_CURRENT_SHIFT,
  UPDATE_ORGANIZATION,
  FILTER_ORGANIZATIONS,
  CLEAR_FILTER
} from '../types';

const ShiftState = props => {
  const initialState = {
    shifts: [
      {
        id: 1,
        user: 'aa bb',
        name: 'shift1',
        startTime: '11:00',
        endTime: '13:00',
        rest: '00:30'
      },
      {
        id: 2,
        user: 'cc dd',
        name: 'shift3',
        startTime: '10:34',
        endTime: '12:45',
        rest: '00:30'
      },
      {
        id: 3,
        user: 'ee ff',
        name: 'shift4',
        startTime: '01:54',
        endTime: '12:45',
        rest: '00:20'
      }
    ],
    current: null
  };

  const [state, dispatch] = useReducer(shiftReducer, initialState);

  // Add Shift
  const addShift = shift => {
    shift.id = uuid.v4();
    dispatch({
      type: ADD_SHIFT,
      payload: shift
    });
  };

  // Delete Shift
  const deleteShift = id => {
    dispatch({
      type: DELETE_SHIFT,
      payload: id
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

  // Update Shift

  // Filter Shifts

  // Clear Filter

  return (
    <ShiftContext.Provider
      value={{
        shifts: state.shifts,
        current: state.current,
        addShift,
        deleteShift,
        setCurrentShift,
        clearCurrentShift
      }}
    >
      {' '}
      {props.children}{' '}
    </ShiftContext.Provider>
  );
};

export default ShiftState;

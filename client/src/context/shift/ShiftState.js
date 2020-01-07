import React, { useReducer } from 'react';
import uuid from 'uuid';
import shiftReducer from './shiftReducer';
import ShiftContext from './shiftContext';
import {
  ADD_SHIFT,
  DELETE_ORGANIZATION,
  SET_CURRENT,
  CLEAR_CURRENT,
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
        start: '2020-01-09',
        end: '2020-01-10',
        rest: 40
      },
      {
        id: 2,
        user: 'cc dd',
        name: 'shift3',
        start: '2020-01-09',
        end: '2020-01-10',
        rest: 30
      },
      {
        id: 3,
        user: 'ee ff',
        name: 'shift4',
        start: '2020-01-09',
        end: '2020-01-10',
        rest: 20
      }
    ]
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

  // Delete Organization

  // Set Current Organization

  // Clear Current Organization

  // Update Organization

  // Filter Organizations

  // Clear Filter

  return (
    <ShiftContext.Provider
      value={{
        shifts: state.shifts,
        addShift
      }}
    >
      {' '}
      {props.children}{' '}
    </ShiftContext.Provider>
  );
};

export default ShiftState;

import React, { useReducer } from 'react';
import uuid from 'uuid';
import shiftReducer from './shiftReducer';
import ShiftContext from './shiftContext';
import {
  ADD_ORGANIZATION,
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

  // Delete Organization

  // Set Current Organization

  // Clear Current Organization

  // Update Organization

  // Filter Organizations

  // Clear Filter

  return (
    <ShiftContext.Provider
      value={{
        shifts: state.shifts
      }}
    >
      {' '}
      {props.children}{' '}
    </ShiftContext.Provider>
  );
};

export default ShiftState;

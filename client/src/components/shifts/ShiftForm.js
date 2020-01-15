import React, { useState, useContext, useEffect, Fragment } from 'react';
import ShiftContext from '../../context/shift/shiftContext';
import AuthContext from '../../context/auth/authContext';
import OrganizationContext from '../../context/organization/organizationContext';

import { Link } from 'react-router-dom';

const ShiftForm = () => {
  const shiftContext = useContext(ShiftContext);
  const authContext = useContext(AuthContext);

  const { user, leaveOrg, updateUser, loadUser } = authContext;
  const {
    addShift,
    clearCurrentShift,
    updateShift,
    current,
    clearShifts
  } = shiftContext;

  // const userChange = {
  //   _id: user._id,
  //   organizationId: 'none'
  // };

  useEffect(() => {
    if (current !== null) {
      setShift(current);
    } else {
      setShift({
        startDate: '',
        startTime: '',
        endTime: '',
        rest: ''
      });
    }
  }, [shiftContext, current]);

  const [shift, setShift] = useState({
    startDate: '',
    startTime: '',
    endTime: '',
    rest: ''
  });

  const { startDate, startTime, endTime, rest } = shift;

  const onChange = e =>
    setShift({
      ...shift,
      [e.target.name]: e.target.value
    });

  const onSubmit = e => {
    e.preventDefault();
    if (current === null) {
      addShift(shift);
    } else {
      updateShift(shift);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrentShift();
  };

  const onLeave = () => {
    loadUser();
    leaveOrg();
    clearShifts();
    localStorage.removeItem('currentOrg');
    // updateUser(userChange);
  };

  return (
    <Fragment>
      <Link to='/'>
        <button className='btn btn-danger btn-block' onClick={onLeave}>
          Leave Organization{' '}
        </button>{' '}
      </Link>{' '}
      <br />
      <br />
      <form onSubmit={onSubmit}>
        <h2 className='text-primary'>
          {' '}
          {current ? 'Edit Shift' : 'Add Shift'}{' '}
        </h2>{' '}
        Date:{' '}
        <input
          type='date'
          name='startDate'
          value={startDate}
          onChange={onChange}
        />{' '}
        Start time:{' '}
        <input
          type='time'
          name='startTime'
          value={startTime}
          onChange={onChange}
        />{' '}
        <br />
        Finish time:{' '}
        <input
          type='time'
          name='endTime'
          value={endTime}
          onChange={onChange}
        />{' '}
        <br />
        Break:{' '}
        <input
          type='time'
          name='rest'
          placeholder='Break'
          value={rest}
          onChange={onChange}
        />{' '}
        <div>
          <input
            type='submit'
            value={current ? 'Update Shift' : 'Add Shift'}
            className='btn btn-primary btn-block'
          />{' '}
        </div>{' '}
        {current && (
          <div>
            <button className='btn btn-light btn-block' onClick={clearAll}>
              Clear{' '}
            </button>{' '}
          </div>
        )}{' '}
      </form>{' '}
    </Fragment>
  );
};

export default ShiftForm;
